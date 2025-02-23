import { Scene } from 'phaser'
import { ISceneConnector } from '../ISceneConnector'
import { FireSceneMounter, HeroSceneMounter } from '../mounters'

type ISceneConnectorForOpacityEngine = Pick<
  ISceneConnector,
  'getHeroMounter' | 'getMainFireMounter' | 'getScene'
>

export class MainFireOpacityEngine {
  private heroEngine: HeroSceneMounter
  private mainFireMounter: FireSceneMounter
  private scene: Scene

  constructor(sceneConnector: ISceneConnectorForOpacityEngine) {
    this.heroEngine = sceneConnector.getHeroMounter()
    this.mainFireMounter = sceneConnector.getMainFireMounter()
    this.scene = sceneConnector.getScene()

    this.create()
  }

  private get mainFireSprite() {
    return this.mainFireMounter.getFireContext().getSprite()
  }

  private get heroSprite() {
    return this.heroEngine.getHeroContext().getSprite()
  }

  private create() {
    this.scene.time.addEvent({
      delay: 300,
      callback: this.update,
      callbackScope: this,
      loop: true,
    })
  }

  private update() {
    this.updateMainFireOpacity()
  }

  private updateMainFireOpacity() {
    const fireArea = this.mainFireSprite.getFireArea()

    const isOverlap = this.scene.physics.overlap(fireArea, this.heroSprite)

    this.mainFireSprite.setOpacityForBackground(isOverlap ? 0.2 : 1)
  }
}
