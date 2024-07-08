import { Scene } from "phaser";
import wolf from "../assets/wolf.png";
import ork from "../assets/ork.png";
import ground from "../assets/ground.png";

export class PreloadScene extends Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("wolf", wolf);
    this.load.image("ork", ork);
    this.load.image("ground", ground);
  }

  create() {
    this.scene.start("GameScene");
  }
}
