import { Scene, GameObjects, Input } from "phaser";
import type * as PhaserTypes from "phaser";

export class GameScene extends Scene {
  private mainHero: Hero | null = null;
  private cursors: PhaserTypes.Types.Input.Keyboard.CursorKeys | null = null;

  private WKey: Phaser.Input.Keyboard.Key | null = null;
  private AKey: Phaser.Input.Keyboard.Key | null = null;
  private SKey: Phaser.Input.Keyboard.Key | null = null;
  private DKey: Phaser.Input.Keyboard.Key | null = null;

  constructor() {
    super("GameScene");
  }

  create() {
    this.mainHero = new Hero(this);

    const image = this.add.image(-1600, -1500, "ground").setOrigin(0);

    image.scale = 8;

    this.add.existing(this.mainHero);

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

    if (this.cursors.left.isDown || this.AKey?.isDown) {
      this.mainHero.x = this.mainHero.x - this.mainHero.speed;
      this.mainHero.rotation = 0;
      this.mainHero.flipX = false;
    }
    if (this.cursors.right.isDown || this.DKey?.isDown) {
      this.mainHero.x = this.mainHero.x + this.mainHero.speed;
      this.mainHero.flipX = true;
    }
    if (this.cursors.up.isDown || this.WKey?.isDown) {
      this.mainHero.y = this.mainHero.y - this.mainHero.speed;
    }
    if (this.cursors.down.isDown || this.SKey?.isDown) {
      this.mainHero.y = this.mainHero.y + this.mainHero.speed;
    }
    this.cameras.main.centerOn(this.mainHero.x, this.mainHero.y);
  }
}

class Hero extends GameObjects.Sprite {
  speed = 6;

  constructor(scene: Scene) {
    super(scene, 350, 300, "wolf");
  }
}
