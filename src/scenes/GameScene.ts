import { Scene, GameObjects, Math as PhaserMath } from "phaser";
import type * as PhaserTypes from "phaser";

export class GameScene extends Scene {
  private mainHero: Hero | null = null;
  private enemy: Hero | null = null;

  private cursors: PhaserTypes.Types.Input.Keyboard.CursorKeys | null = null;

  private WKey: Phaser.Input.Keyboard.Key | null = null;
  private AKey: Phaser.Input.Keyboard.Key | null = null;
  private SKey: Phaser.Input.Keyboard.Key | null = null;
  private DKey: Phaser.Input.Keyboard.Key | null = null;

  constructor() {
    super("GameScene");
  }

  create() {
    this.mainHero = new Hero(this, "wolf");

    this.enemy = new Hero(this, "ork");
    this.enemy.speed = 0.5;

    const image = this.add.image(-1600, -1500, "ground").setOrigin(0);

    image.scale = 8;

    this.add.existing(this.mainHero);
    this.add.existing(this.enemy);

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
    if (!this.enemy) return;

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
    this.enemy?.moveToPoint(this.mainHero.x, this.mainHero.y);
    this.cameras.main.centerOn(this.mainHero.x, this.mainHero.y);
  }
}

class Hero extends GameObjects.Sprite {
  speed = 6;
  radius = 20;

  constructor(scene: Scene, assetName: string) {
    super(scene, 350, 300, assetName);
    this.setDisplayOrigin(this.originX, this.originY);
    this;
  }

  moveToPoint(x: number, y: number) {
    const distance = PhaserMath.Distance.Between(this.x, this.y, x, y);

    if (distance <= this.radius) return;

    const point = new PhaserMath.Vector2();

    const angle = PhaserMath.Angle.Between(this.x, this.y, x, y);

    const pointTo = PhaserMath.RotateTo(
      point,
      this.x,
      this.y,
      angle,
      this.speed
    );

    this.x = pointTo.x;
    this.y = pointTo.y;
  }
}
