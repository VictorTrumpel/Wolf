import * as Phaser from 'phaser'
import { BanyaScene } from './scenes/BanyaScene'
import { GameScene } from './scenes/GameScene'
import { PreloadScene } from './scenes/PreloadScene'
import './style.css'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  roundPixels: false,
  pixelArt: true,
  backgroundColor: 0xffffff,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: [PreloadScene, GameScene, BanyaScene],
}

new Phaser.Game(config)
