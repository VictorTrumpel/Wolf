import { Scene } from "phaser";
import { Ork } from "./../entities/Ork";
import { Wolf } from "../entities/Wolf";
import type { Types as PhaserTypes, Physics } from "phaser";

export class GameScene extends Scene {
  private _cursors: PhaserTypes.Input.Keyboard.CursorKeys | null = null;

  private wolf: Wolf;

  private enemiesGroup: Physics.Arcade.Group | null = null;

  private WKey: Phaser.Input.Keyboard.Key | null = null;
  private AKey: Phaser.Input.Keyboard.Key | null = null;
  private SKey: Phaser.Input.Keyboard.Key | null = null;
  private DKey: Phaser.Input.Keyboard.Key | null = null;

  countOfEnemies = 0;
  maxCountOfEnemies = 10;

  constructor() {
    super("GameScene");
    this.wolf = new Wolf(this);
  }

  get cursors() {
    if (this._cursors == null) {
      this._cursors = this.input.keyboard!.createCursorKeys();
      return this._cursors;
    }
    return this._cursors;
  }

  create() {
    this.createGround();
    this.createEnemiesGroup();
    this.createWolf();

    if (!this.enemiesGroup) return;

    this.startWolfAttack();
    this.startOrkAttack();

    this._cursors = this.input.keyboard!.createCursorKeys();

    this.WKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.AKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.SKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.DKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    setInterval(() => {
      if (!this.enemiesGroup) return;
      if (this.countOfEnemies >= this.maxCountOfEnemies) return;
      this.countOfEnemies += 1;
      let ork: Ork | null = new Ork(this);
      ork.create(100, 200);
      this.enemiesGroup.add(ork.sprite.sprite);
      ork.onKill = () => {
        this.countOfEnemies -= 1;
      };
    }, 3000);
  }

  createWolf() {
    this.wolf.create(350, 350);

    this.wolf.sprite.sprite.setCollideWorldBounds(true);
  }

  createGround() {
    const ground = this.add
      .tileSprite(256, 256, 512, 512, "ground")
      .setScrollFactor(0, 0);

    ground.setScale(5);
    ground.setX(700);
  }

  createEnemiesGroup() {
    const enemiesGroup = this.physics.add.group({
      collideWorldBounds: true,
    });
    this.enemiesGroup = enemiesGroup;
  }

  startWolfAttack() {
    if (!this.enemiesGroup) return;

    const hurtSet = new Set<Physics.Arcade.Sprite>();

    setInterval(() => {
      if (!this.wolf.isReadyToAttack()) return;
      this.children.bringToTop(this.wolf.redSword.sprite.sprite);
      hurtSet.clear();
      this.wolf.attack();
    }, 2500);

    const attackEnemy = function (
      this: { hurtSet: Set<Physics.Arcade.Sprite> },
      _: any,
      enemy: Physics.Arcade.Sprite
    ) {
      if (this.hurtSet.has(enemy)) return;
      const creator = enemy.userInfo?.get("creator");
      const isOrk = creator instanceof Ork;
      if (!isOrk) return;
      creator.hurt(25);
      this.hurtSet.add(enemy);
    };

    this.physics.add.overlap(
      this.wolf.redSword.sprite.sprite,
      this.enemiesGroup,
      attackEnemy as any,
      undefined,
      { hurtSet }
    );
  }

  startOrkAttack() {
    if (!this.enemiesGroup) return;

    const attackWolf = () => {
      if (!this.wolf) return;
      this.wolf.hurt(0.1);
    };

    this.physics.add.collider(
      this.wolf.sprite.sprite,
      this.enemiesGroup,
      attackWolf
    );
  }

  update(): void {
    if (this.wolf.sprite.sprite.active) {
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

    this.enemiesGroup?.children.each((ch) => {
      (ch as Physics.Arcade.Sprite).setVelocity(0);
      return true;
    });
    if (this.wolf.sprite.sprite.active) {
      this.enemiesGroup?.children.each((ch) => {
        this.physics.moveToObject(ch, this.wolf.sprite.sprite, 50);
        return true;
      });
    }
  }
}
