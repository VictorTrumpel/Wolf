import { Scene } from "phaser";
import wolf from "../assets/wolf.png";
import ork from "../assets/ork.png";
import ground from "../assets/ground.png";
import splash from "../assets/splash.png";
import swordSplashJson from "../assets/sword-splash/splash.json";
import swordSplash from "../assets/sword-splash/splash.png";
import castle from "../assets/castle.png";

export class PreloadScene extends Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("wolf", wolf);
    this.load.image("ork", ork);
    this.load.image("ground", ground);
    this.load.image("splash", splash);
    this.load.image("castle", castle);
    this.load.atlas("swordSplash", swordSplash, swordSplashJson);
  }

  create() {
    this.scene.start("GameScene");
  }
}
