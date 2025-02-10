import * as Phaser from 'phaser'
import { BanyaScene } from './scenes/BanyaScene'
import { GameScene } from './scenes/GameScene'
import { PreloadScene } from './scenes/PreloadScene'
import './style.css'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  roundPixels: false,
  pixelArt: true,
  backgroundColor: 0x9da19e,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },
  scene: [PreloadScene, GameScene, BanyaScene],
}

new Phaser.Game(config)
