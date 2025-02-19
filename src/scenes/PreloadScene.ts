import { Scene } from 'phaser'
import automTree from '../assets/AnimatedAutumHight.png'
import banyaLocation from '../assets/Banyalocation.png'
import bathHouse from '../assets/bathHouse.png'
import bathHouseJson from '../assets/bathHouseAtlas/bathHouseAtlas.json'
import bathHouseAtlas from '../assets/bathHouseAtlas/bathHouseAtlas.png'
import bonfire from '../assets/bonfire-Photoroom.png'
import castle from '../assets/castle.png'
import deadTreeAtlas from '../assets/deadTreeAtlas/deadTreeAtlas.png'
import deadTreeJson from '../assets/deadTreeAtlas/deadTreeJson.json'
import door from '../assets/door.png'
import firTreeJson from '../assets/firTreeAtlas/firTreeAtlas.json'
import firTreeAtlas from '../assets/firTreeAtlas/firTreeAtlas.png'
import ground from '../assets/ground.png'
import heroRunJson from '../assets/heroAtlas/heroAtlas.json'
import heroRunAtlas from '../assets/heroAtlas/heroAtlas.png'
import ladder from '../assets/ladder.png'
import largeFireJson from '../assets/largeFireAtlas/largeFire.json'
import largeFireAtlas from '../assets/largeFireAtlas/largeFire.png'
import mediumFireJson from '../assets/mediumFireAtlas/mediumFire.json'
import mediumFireAtlas from '../assets/mediumFireAtlas/mediumFire.png'
import ork from '../assets/ork.png'
import smallFireJson from '../assets/smallFireAtlas/smallFire.json'
import smallFireAtlas from '../assets/smallFireAtlas/smallFire.png'
import snowParticle from '../assets/snowParticle.png'
import splash from '../assets/splash.png'
import stone1 from '../assets/stone1.png'
import swordSplashJson from '../assets/sword-splash/splash.json'
import swordSplash from '../assets/sword-splash/splash.png'
import tothemStoun from '../assets/tothemStoun.png'
import window from '../assets/window.png'
import wolf from '../assets/wolf.png'
import woodChipsJson from '../assets/woodChipsAtlas/woodCipsAtlas.json'
import woodChips from '../assets/woodChipsAtlas/woodCipsAtlas.png'
import woodenFence1CollumnsHorizontal from '../assets/woodenFence1CollumnsHorizontal.png'
import woodenFence1CollumnsVertical from '../assets/woodenFence1CollumnsVertical.png'
import woodenFence2CollumnsVertical from '../assets/woodenFence2CollumnsVertical.png'
import woodenFence3CollumnsHorizontal from '../assets/woodenFence3CollumnsHorizontal.png'
import woodenFence4CollumnsVertical from '../assets/woodenFence4CollumnsVertical.png'
import woodenFence8CollumnsVertical from '../assets/woodenFence8CollumnsVertical.png'
import woodIcon from '../assets/woodIcon.png'
import woodStones from '../assets/woodStones.png'

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
    this.load.image('automTree', automTree)
    this.load.image('woodIcon', woodIcon)
    this.load.image('banyaInside', banyaLocation)
    this.load.image('door', door)
    this.load.image('ladder', ladder)
    this.load.image('window', window)

    this.load.image('woodenFence8CollumnsVertical', woodenFence8CollumnsVertical)
    this.load.image('woodenFence4CollumnsVertical', woodenFence4CollumnsVertical)
    this.load.image('woodenFence2CollumnsVertical', woodenFence2CollumnsVertical)
    this.load.image('woodenFence1CollumnsVertical', woodenFence1CollumnsVertical)
    this.load.image('woodenFence3CollumnsHorizontal', woodenFence3CollumnsHorizontal)
    this.load.image('woodenFence1CollumnsHorizontal', woodenFence1CollumnsHorizontal)
    this.load.image('bonfire', bonfire)
    this.load.image('snowParticle', snowParticle)
    this.load.image('bathHouse', bathHouse)
    this.load.image('woodStones', woodStones)
    this.load.image('stone1', stone1)
    this.load.image('tothemStoun', tothemStoun)

    this.load.atlas('swordSplash', swordSplash, swordSplashJson)
    this.load.atlas('heroAtlas', heroRunAtlas, heroRunJson)
    this.load.atlas('firTreeAtlas', firTreeAtlas, firTreeJson)
    this.load.atlas('deadTreeAtlas', deadTreeAtlas, deadTreeJson)
    this.load.atlas('bathHouseAtlas', bathHouseAtlas, bathHouseJson)
    this.load.atlas('woodChips', woodChips, woodChipsJson)
    this.load.atlas('largeFire', largeFireAtlas, largeFireJson)
    this.load.atlas('mediumFire', mediumFireAtlas, mediumFireJson)
    this.load.atlas('smallFire', smallFireAtlas, smallFireJson)
  }

  create() {
    this.scene.start('GameScene')
  }
}
