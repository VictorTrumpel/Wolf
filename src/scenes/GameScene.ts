import { Scene } from "phaser";
import { Ork } from "./../entities/Ork";
import { Wolf } from "../entities/Wolf";
import type { Types as PhaserTypes, Physics } from "phaser";

export class GameScene extends Scene {
  private _cursors: PhaserTypes.Input.Keyboard.CursorKeys | null = null;

  private wolf: Wolf;
  private ork: Ork;

  private WKey: Phaser.Input.Keyboard.Key | null = null;
  private AKey: Phaser.Input.Keyboard.Key | null = null;
  private SKey: Phaser.Input.Keyboard.Key | null = null;
  private DKey: Phaser.Input.Keyboard.Key | null = null;
  private EnterKey: Phaser.Input.Keyboard.Key | null = null;

  handleAttackEnemy = (enemy: Physics.Arcade.Sprite) => {
    const classCreator = enemy.userInfo?.get("creator");
    if (classCreator instanceof Ork) {
      classCreator.hurt();
    }
  };

  constructor() {
    super("GameScene");
    this.wolf = new Wolf(this);
    this.ork = new Ork(this);
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

    const enemiesGroup = this.physics.add.group({
      collideWorldBounds: true,
    });

    this.ork.create(250, 350);

    this.wolf.create(350, 350);

    this.wolf.sprite.sprite.setCollideWorldBounds(true);

    this.physics.add.collider(this.wolf.sprite.sprite, enemiesGroup, () => {});

    this.physics.add.overlap(this.wolf.redSword.sprite.sprite, enemiesGroup);

    this.physics.add.overlap(
      this.wolf.redSword.sprite.sprite,
      enemiesGroup,
      (_, obj2) => {
        this.handleAttackEnemy(obj2 as Physics.Arcade.Sprite);
      }
    );

    enemiesGroup.add(this.ork.sprite.sprite);

    this._cursors = this.input.keyboard!.createCursorKeys();

    this.WKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.AKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.SKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.DKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.EnterKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    this.EnterKey.onDown = () => {
      if (!this.wolf.isReadyToAttack()) return;
      this.wolf.attack();
    };
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
  }
}
