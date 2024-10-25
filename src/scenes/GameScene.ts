import { Scene } from "phaser";
import { RusHeroSprite } from "../entities/RusHeroSprite/RusHeroSprite";
import { RusHeroContext } from "@features";

export class GameScene extends Scene {
  private rusHeroContext: RusHeroContext | null = null;

  constructor() {
    super("GameScene");
  }

  create() {
    this.createCastle();

    const rusHeroSprite = new RusHeroSprite(this, 700, 200);
    this.rusHeroContext = new RusHeroContext(rusHeroSprite);

    console.log("this.rusHeroContext :>> ", this.rusHeroContext);
  }

  createCastle() {
    const staticBody = this.physics.add.staticImage(200, 190, "castle");
    staticBody.flipX = true;
    staticBody.setCircle(225);
    staticBody.setPushable(false);
    staticBody.setDepth(-1);
  }

  update(): void {}
}
