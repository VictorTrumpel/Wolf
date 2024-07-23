import { Sprite } from "./../shared/Sprite";
import { Scene } from "phaser";
import { Ork } from "./../entities/Ork";
import { Wolf } from "../entities/Wolf";
import type { Types as PhaserTypes, Physics } from "phaser";

export class GameScene extends Scene {
  private _cursors: PhaserTypes.Input.Keyboard.CursorKeys | null = null;

  private wolf: Wolf;
  private ork: Ork;
  private ork2: Ork;

  private enemiesGroup: Physics.Arcade.Group;

  private WKey: Phaser.Input.Keyboard.Key | null = null;
  private AKey: Phaser.Input.Keyboard.Key | null = null;
  private SKey: Phaser.Input.Keyboard.Key | null = null;
  private DKey: Phaser.Input.Keyboard.Key | null = null;
  private EnterKey: Phaser.Input.Keyboard.Key | null = null;

  constructor() {
    super("GameScene");
    this.wolf = new Wolf(this);
    this.ork = new Ork(this);
    this.ork2 = new Ork(this);
  }

  get cursors() {
    if (this._cursors == null) {
      this._cursors = this.input.keyboard!.createCursorKeys();
      return this._cursors;
    }
    return this._cursors;
  }

  create() {
    const ground = this.add
      .tileSprite(256, 256, 512, 512, "ground")
      .setScrollFactor(0, 0);

    ground.setScale(5);
    ground.setX(700);

    const enemiesGroup = this.physics.add.group({
      collideWorldBounds: true,
    });
    this.enemiesGroup = enemiesGroup;

    this.ork.create(250, 350);
    this.ork2.create(200, 350);

    this.wolf.create(350, 350);

    this.wolf.sprite.sprite.setCollideWorldBounds(true);

    this.physics.add.collider(this.wolf.sprite.sprite, enemiesGroup);

    enemiesGroup.add(this.ork.sprite.sprite);
    enemiesGroup.add(this.ork2.sprite.sprite);

    this._cursors = this.input.keyboard!.createCursorKeys();

    this.WKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.AKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.SKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.DKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.EnterKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    const hurtSet = new Set<Physics.Arcade.Sprite>();

    this.EnterKey.onDown = () => {
      if (!this.wolf.isReadyToAttack()) return;
      hurtSet.clear();
      this.wolf.attack();
    };

    const attackEnemy = function (
      this: { hurtSet: Set<Physics.Arcade.Sprite> },
      _: any,
      enemy: Physics.Arcade.Sprite
    ) {
      if (this.hurtSet.has(enemy)) return;
      const creator = enemy.userInfo?.get("creator");
      if (creator instanceof Ork) {
        creator.hurt(50);
        this.hurtSet.add(enemy);
      }
    };

    this.physics.add.overlap(
      this.wolf.redSword.sprite.sprite,
      enemiesGroup,
      attackEnemy as any,
      undefined,
      { hurtSet }
    );

    setInterval(() => {
      const ork = new Ork(this);
      ork.create(100, 200);
      enemiesGroup.add(ork.sprite.sprite);
    }, 1000);
  }

  update(): void {
    this.wolf.update();

    this.wolf.sprite.sprite.setVelocity(0);
    if (this.cursors.left.isDown || this.AKey?.isDown) {
      this.wolf.sprite.setVelocityX(-this.wolf.characteristics.speed);
      this.wolf.sprite.sprite.flipX = false;
    } else if (this.cursors.right.isDown || this.DKey?.isDown) {
      this.wolf.sprite.setVelocityX(this.wolf.characteristics.speed);
      this.wolf.sprite.sprite.flipX = true;
    }
    if (this.cursors.up.isDown || this.WKey?.isDown) {
      this.wolf.sprite.setVelocityY(-this.wolf.characteristics.speed);
    } else if (this.cursors.down.isDown || this.SKey?.isDown) {
      this.wolf.sprite.setVelocityY(this.wolf.characteristics.speed);
    }

    this.enemiesGroup.children.each((ch) => {
      this.physics.moveToObject(ch, this.wolf.sprite.sprite, 50);
      return true;
    });
  }
}
