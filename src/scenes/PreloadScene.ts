import { Scene } from 'phaser'
import castle from '../assets/castle.png'
import ground from '../assets/ground.png'
import heroRunJson from '../assets/heroAtlas/heroAtlas.json'
import heroRunAtlas from '../assets/heroAtlas/heroAtlas.png'
import ork from '../assets/ork.png'
import splash from '../assets/splash.png'
import swordSplashJson from '../assets/sword-splash/splash.json'
import swordSplash from '../assets/sword-splash/splash.png'
import wolf from '../assets/wolf.png'

export class PreloadScene extends Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    this.load.image('wolf', wolf)
    this.load.image('ork', ork)
    this.load.image('ground', ground)
    this.load.image('splash', splash)
    this.load.image('castle', castle)
    this.load.atlas('swordSplash', swordSplash, swordSplashJson)
    this.load.atlas('heroAtlas', heroRunAtlas, heroRunJson)
  }

  create() {
    this.scene.start('GameScene')
  }
}
