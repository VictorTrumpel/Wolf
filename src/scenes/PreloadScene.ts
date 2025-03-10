import { Scene } from 'phaser'
import {
  FireSceneMounter,
  ForestOpacityEngine,
  ForestSceneMounter,
  GroundSceneMounter,
  HeroSceneMounter,
  SnowParticleMounter,
} from '@features'
import { StartMenu } from '@entities/ui'
import axeHitSound from '../assets/axeHitsound.mp3'
import bathHouse from '../assets/bathHouse.png'
import bonfire from '../assets/bonfire-Photoroom.png'
import deadTreeAtlas from '../assets/deadTreeAtlas/deadTreeAtlas.png'
import deadTreeJson from '../assets/deadTreeAtlas/deadTreeJson.json'
import firTreeJson from '../assets/firTreeAtlas/firTreeAtlas.json'
import firTreeAtlas from '../assets/firTreeAtlas/firTreeAtlas.png'
import heroRunJson from '../assets/heroAtlas/heroAtlas.json'
import heroRunAtlas from '../assets/heroAtlas/heroAtlas.png'
import iceGroundAsset from '../assets/iceGroundAsset.png'
import largeFireJson from '../assets/largeFireAtlas/largeFire.json'
import largeFireAtlas from '../assets/largeFireAtlas/largeFire.png'
import mediumFireJson from '../assets/mediumFireAtlas/mediumFire.json'
import mediumFireAtlas from '../assets/mediumFireAtlas/mediumFire.png'
import ork from '../assets/ork.png'
import smallFireJson from '../assets/smallFireAtlas/smallFire.json'
import smallFireAtlas from '../assets/smallFireAtlas/smallFire.png'
import snowFlake from '../assets/snowflake_small.png'
import snowParticle from '../assets/snowParticle.png'
import splash from '../assets/splash.png'
import stone1 from '../assets/stone1.png'
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
import woodHitSound from '../assets/woodHitSound.mp3'
import woodIcon from '../assets/woodIcon.png'
import woodStones from '../assets/woodStones.png'

export class PreloadScene extends Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    this.load.image('wolf', wolf)
    this.load.image('ork', ork)
    this.load.image('splash', splash)
    this.load.image('woodIcon', woodIcon)
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
    this.load.image('snowFlake', snowFlake)
    this.load.image('iceGroundAsset', iceGroundAsset)

    this.load.audio('woodHitSound', woodHitSound)
    this.load.audio('axeHitSound', axeHitSound)

    this.load.atlas('heroAtlas', heroRunAtlas, heroRunJson)
    this.load.atlas('firTreeAtlas', firTreeAtlas, firTreeJson)
    this.load.atlas('deadTreeAtlas', deadTreeAtlas, deadTreeJson)
    this.load.atlas('woodChips', woodChips, woodChipsJson)
    this.load.atlas('largeFire', largeFireAtlas, largeFireJson)
    this.load.atlas('mediumFire', mediumFireAtlas, mediumFireJson)
    this.load.atlas('smallFire', smallFireAtlas, smallFireJson)
  }

  create() {
    new GroundSceneMounter(this)
    const fireMounter = new FireSceneMounter(this)
    const heroSceneMounter = new HeroSceneMounter(this)
    const forestMounter = new ForestSceneMounter(this)
    new SnowParticleMounter(this)

    const sceneConnector = {
      getHeroMounter: () => heroSceneMounter,
      getForestMounter: () => forestMounter,
      getMainFireMounter: () => fireMounter,
      getScene: () => this,
    }

    new ForestOpacityEngine(sceneConnector)

    const startMenu = new StartMenu()

    startMenu.eventEmitter.on('on-start-button-click', () => {
      startMenu.dispose()
      this.scene.start('GameScene')
    })

    this.events.on('shutdown', () => {
      this.events.removeListener('update')
    })
  }
}
