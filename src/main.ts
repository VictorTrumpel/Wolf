import * as Phaser from "phaser";
import { PreloadScene } from "./scenes/PreloadScene";
import { GameScene } from "./scenes/GameScene";
import "./style.css";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  roundPixels: false,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: { debug: true, debugShowVelocity: true, gravity: { x: 0, y: 0 } },
  },
  scene: [PreloadScene, GameScene],
};

new Phaser.Game(config);
