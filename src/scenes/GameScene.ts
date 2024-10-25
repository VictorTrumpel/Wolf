import { Scene, Input } from "phaser";
import { RusHeroSprite } from "../entities/RusHeroSprite/RusHeroSprite";
import { RusHeroContext } from "@features";

export class GameScene extends Scene {
  private rusHeroContext: RusHeroContext | null = null;

  private WKey: Phaser.Input.Keyboard.Key | null = null;
  private AKey: Phaser.Input.Keyboard.Key | null = null;
  private SKey: Phaser.Input.Keyboard.Key | null = null;
  private DKey: Phaser.Input.Keyboard.Key | null = null;

  constructor() {
    super("GameScene");
  }

  create() {
    this.createCastle();

    const rusHeroSprite = new RusHeroSprite(this, 700, 200);
    this.rusHeroContext = new RusHeroContext(rusHeroSprite);

    this.WKey = this.input.keyboard!.addKey(Input.Keyboard.KeyCodes.W);
    this.AKey = this.input.keyboard!.addKey(Input.Keyboard.KeyCodes.A);
    this.SKey = this.input.keyboard!.addKey(Input.Keyboard.KeyCodes.S);
    this.DKey = this.input.keyboard!.addKey(Input.Keyboard.KeyCodes.D);
  }

  createCastle() {
    const staticBody = this.physics.add.staticImage(200, 190, "castle");
    staticBody.flipX = true;
    staticBody.setCircle(225);
    staticBody.setPushable(false);
    staticBody.setDepth(-1);
  }

  update(): void {
    if (!this.rusHeroContext) return;

    let isMoving = false;

    if (this.AKey?.isUp || this.DKey?.isUp) {
      this.rusHeroContext.stopMovingX();
    }

    if (this.WKey?.isUp || this.SKey?.isDown) {
      this.rusHeroContext.stopMovingY();
    }

    if (this.AKey?.isDown) {
      this.rusHeroContext.moveLeft();
      isMoving = true;
    } else if (this.DKey?.isDown) {
      this.rusHeroContext.moveRight();
      isMoving = true;
    }

    if (this.WKey?.isDown) {
      this.rusHeroContext.moveTop();
      isMoving = true;
    } else if (this.SKey?.isDown) {
      this.rusHeroContext.moveBottom();
      isMoving = true;
    }

    if (!isMoving) {
      this.rusHeroContext.stopMoving();
    }
  }
}
