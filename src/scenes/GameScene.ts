import { Scene, Math as PhaserMath, GameObjects, Physics } from "phaser";
import type { Types as PhaserTypes } from "phaser";

const HERO_SPEED = 5;
const ENEMY_SPEED = 2;

export class GameScene extends Scene {
  private mainHero: PhaserTypes.Physics.Arcade.ImageWithDynamicBody | null =
    null;
  private enemy: PhaserTypes.Physics.Arcade.ImageWithDynamicBody | null = null;

  private cursors: PhaserTypes.Input.Keyboard.CursorKeys | null = null;

  private WKey: Phaser.Input.Keyboard.Key | null = null;
  private AKey: Phaser.Input.Keyboard.Key | null = null;
  private SKey: Phaser.Input.Keyboard.Key | null = null;
  private DKey: Phaser.Input.Keyboard.Key | null = null;

  constructor() {
    super("GameScene");
  }

  create() {
    const image = this.add.image(-1600, -1500, "ground").setOrigin(0);
    image.x = -100;

    image.scale = 2;

    this.mainHero = this.physics.add.image(400, 300, "wolf");
    this.enemy = this.physics.add.image(500, 200, "ork");

    this.mainHero.setCollideWorldBounds(true);
    this.enemy.setCollideWorldBounds(true);

    this.physics.add.collider(this.mainHero, this.enemy);

    this.mainHero.setPushable(false);

    this.cursors = this.input.keyboard!.createCursorKeys();

    this.WKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.AKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.SKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.DKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.input.setDefaultCursor;
  }

  update(): void {
    if (!this.cursors) return;
    if (!this.mainHero) return;

    this.mainHero.setVelocity(0);

    if (this.cursors.left.isDown || this.AKey?.isDown) {
      this.mainHero.setVelocityX(-200);
    } else if (this.cursors.right.isDown || this.DKey?.isDown) {
      this.mainHero.setVelocityX(200);
    }

    if (this.cursors.up.isDown || this.WKey?.isDown) {
      this.mainHero.setVelocityY(-200);
    } else if (this.cursors.down.isDown || this.SKey?.isDown) {
      this.mainHero.setVelocityY(200);
    }

    if (this.enemy) {
      this.physics.moveToObject(this.enemy, this.mainHero, 100);
    }
  }
}

class Hero extends Physics.Arcade.Sprite {
  speed = 6;
  radius = 20;

  prevMoveAngle: number | null = null;

  constructor(scene: Scene, assetName: string) {
    super(scene, 350, 300, assetName);
    console.log("this.body :>> ", this.body);

    // this.body?.enable = true;
  }
}
