import * as Phaser from 'phaser'
import { GameScene } from './scenes/GameScene'
import { PreloadScene } from './scenes/PreloadScene'
import './style.css'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  roundPixels: false,
  pixelArt: true,
  backgroundColor: 0x706d6d,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },
  scene: [PreloadScene, GameScene],
}

new Phaser.Game(config)
