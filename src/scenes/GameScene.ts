import { Scene, Physics } from "phaser";
import { Hero } from "../entities/Hero";
import { Enemy } from "../entities/Enemy";
import type { Types as PhaserTypes } from "phaser";

export class GameScene extends Scene {
  private cursors: PhaserTypes.Input.Keyboard.CursorKeys | null = null;

  private hero: Hero | null = null;
  private heroInstance: Physics.Arcade.Image | null = null;
  private enemy: Physics.Arcade.Image | null = null;

  private ground: any = null;

  private WKey: Phaser.Input.Keyboard.Key | null = null;
  private AKey: Phaser.Input.Keyboard.Key | null = null;
  private SKey: Phaser.Input.Keyboard.Key | null = null;
  private DKey: Phaser.Input.Keyboard.Key | null = null;
  private EnterKey: Phaser.Input.Keyboard.Key | null = null;

  constructor() {
    super("GameScene");
  }

  create() {
    this.ground = this.add
      .tileSprite(256, 256, 512, 512, "ground")
      .setScrollFactor(0, 0);

    const hero = new Hero(this);
    this.hero = hero;
    const enemy = new Enemy(this);

    this.heroInstance = hero.create();
    this.enemy = enemy.create();

    this.physics.add.collider(this.heroInstance, this.enemy, () => {
      hero.hurt(10);
    });

    this.heroInstance.setBounce(1);

    this.cursors = this.input.keyboard!.createCursorKeys();

    this.WKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.AKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.SKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.DKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.EnterKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    this.EnterKey.onDown = () => {
      const splash = hero.attack();

      if (!splash) return;
      if (!this.enemy) return;

      let isHurted = false;

      this.physics.add.overlap(splash, this.enemy, () => {
        if (isHurted) return;
        enemy.hurt(50);
        isHurted = true;
      });
    };
  }

  update(): void {
    if (!this.heroInstance?.active) return;
    if (!this.enemy) return;
    if (!this.cursors) return;

    this.heroInstance.setVelocity(0);
    this.hero?.update();

    if (this.cursors.left.isDown || this.AKey?.isDown) {
      this.heroInstance.setVelocityX(-200);
      this.heroInstance.flipX = false;
    } else if (this.cursors.right.isDown || this.DKey?.isDown) {
      this.heroInstance.setVelocityX(200);
      this.heroInstance.flipX = true;
    }
    if (this.cursors.up.isDown || this.WKey?.isDown) {
      this.heroInstance.setVelocityY(-200);
    } else if (this.cursors.down.isDown || this.SKey?.isDown) {
      this.heroInstance.setVelocityY(200);
    }

    if (this.enemy.active) {
      this.physics.moveTo(this.enemy, this.heroInstance.x, this.heroInstance.y);
    }
  }
}
