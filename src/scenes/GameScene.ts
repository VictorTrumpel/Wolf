import { Scene } from "phaser";
import { RusHeroSprite } from "../entities/RusHeroSprite/RusHeroSprite";
import {
  RusHeroKeyboardBinder,
  RusHeroContext,
  RusHeroKeyboardHandler,
} from "@features";

type Keyboard = ReturnType<RusHeroKeyboardBinder["getKeyboard"]>;

export class GameScene extends Scene {
  private keyboard: Keyboard | null = null;
  private rusHeroContext: RusHeroContext | null = null;

  constructor() {
    super("GameScene");
  }

  create() {
    this.createCastle();

    const rusHeroSprite = new RusHeroSprite(this, 700, 200);
    this.rusHeroContext = new RusHeroContext(rusHeroSprite);

    this.initKeyboard();
  }

  createCastle() {
    const staticBody = this.physics.add.staticImage(200, 190, "castle");
    staticBody.flipX = true;
    staticBody.setCircle(225);
    staticBody.setPushable(false);
    staticBody.setDepth(-1);
  }

  initKeyboard() {
    const keyboardPlugin = this.input.keyboard;
    const hero = this.rusHeroContext;

    if (!keyboardPlugin || !hero) return;

    const keyboardHandler = new RusHeroKeyboardHandler(keyboardPlugin);

    const keyboardBinder = new RusHeroKeyboardBinder(hero, keyboardHandler);

    this.keyboard = keyboardBinder.getKeyboard();
  }

  update(): void {
    this.keyboard?.executeKeyCommands();
  }
}
