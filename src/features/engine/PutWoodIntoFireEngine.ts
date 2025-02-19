import { Scene } from 'phaser'
import { ISceneConnector } from '../ISceneConnector'
import { FireSceneMounter } from '../mounters'
import { HeroSceneMounter } from '../mounters/HeroSceneMounter'

export class PutWoodIntoFireEngine {
  private heroMounter: HeroSceneMounter
  private mainFireMounter: FireSceneMounter
  private scene: Scene

  constructor(sceneConnector: ISceneConnector) {
    this.heroMounter = sceneConnector.getHeroMounter()
    this.scene = sceneConnector.getScene()
    this.mainFireMounter = sceneConnector.getMainFireMounter()

    this.create()
  }

  private get fireContext() {
    return this.mainFireMounter.getFireContext()
  }

  private get heroContext() {
    return this.heroMounter.getHeroContext()
  }

  private handlePutWoodsInTheStove = () => {
    const fireSprite = this.fireContext.getSprite()
    const fireArea = fireSprite.getFireArea()
    const heroSprite = this.heroContext.getSprite()

    const isHeroOverlapFire = this.scene.physics.overlap(fireArea, heroSprite)

    if (!isHeroOverlapFire) return

    const woodCount = this.heroContext.getWoodGoodCount()
    this.mainFireMounter.getFireContext().addPower(woodCount)
    this.heroContext.addWoodGoodCount(-1 * woodCount)
  }

  private create() {
    this.scene.events.on('PushWoodsInStove', this.handlePutWoodsInTheStove)
  }
}
