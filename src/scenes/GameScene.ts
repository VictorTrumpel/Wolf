import { Scene } from "phaser";
import { RusHero } from "../entities/RusHero/RusHero";
import { KeyBoardEvents } from "../entities/KeyBoardEvents/KeyBoardEvents";
import { IHeroState } from "../features/IHeroState";
import { RusHeroMover } from "../features/HeroMovingState/HeroMovingState";

// Нужно использовать шаблон проектирования Состояние. Загуглить, изучить, прочитать.

export class GameScene extends Scene {
  private rusHero: RusHero | null = null;
  private rusHeroState: IHeroState | null = null;
  private keyboard: KeyBoardEvents | null = null;

  constructor() {
    super("GameScene");
  }

  create() {
    this.createCastle();

    this.rusHero = new RusHero(this, 700, 200);
    this.keyboard = new KeyBoardEvents(this.input);
  }

  createCastle() {
    const staticBody = this.physics.add.staticImage(200, 190, "castle");
    staticBody.flipX = true;
    staticBody.setCircle(225);
    staticBody.setPushable(false);
    staticBody.setDepth(-1);
  }
}
