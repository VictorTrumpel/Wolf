import { Scene } from "phaser";
import { RusHeroSprite } from "../entities/RusHeroSprite/RusHeroSprite";
import { RusHeroContext } from "@features";
import type { Types as PhaserTypes } from "phaser";

// Нужно использовать шаблон проектирования Состояние. Загуглить, изучить, прочитать.

export class GameScene extends Scene {
  private rusHeroContext: RusHeroContext | null = null;

  private _cursors: PhaserTypes.Input.Keyboard.CursorKeys | null = null;
  private WKey: Phaser.Input.Keyboard.Key | null = null;
  private AKey: Phaser.Input.Keyboard.Key | null = null;
  private SKey: Phaser.Input.Keyboard.Key | null = null;
  private DKey: Phaser.Input.Keyboard.Key | null = null;

  constructor() {
    super("GameScene");
  }

  get cursors() {
    if (this._cursors == null) {
      this._cursors = this.input.keyboard!.createCursorKeys();
      return this._cursors;
    }
    return this._cursors;
  }

  create() {
    this.createCastle();

    const rusHeroSprite = new RusHeroSprite(this, 700, 200);
    this.rusHeroContext = new RusHeroContext(rusHeroSprite);

    this._cursors = this.input.keyboard!.createCursorKeys();
    this.WKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.AKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.SKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.DKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
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

    if (this.AKey?.isDown) {
      this.rusHeroContext.getState().moveLeft();
      isMoving = true;
    } else if (this.DKey?.isDown) {
      this.rusHeroContext.getState().moveRight();
      isMoving = true;
    }

    if (this.WKey?.isDown) {
      this.rusHeroContext.getState().moveTop();
      isMoving = true;
    } else if (this.SKey?.isDown) {
      this.rusHeroContext.getState().moveBottom();
      isMoving = true;
    }

    if (!isMoving) {
      this.rusHeroContext.getState().stopMoving();
    }
  }
}
