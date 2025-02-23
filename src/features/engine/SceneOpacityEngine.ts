import { Scene } from 'phaser'
import { FirTree } from '@entities'
import { ISceneConnector } from '../ISceneConnector'
import { FireSceneMounter } from '../mounters'
import { ForestSceneMounter } from '../mounters/ForestSceneMounter'
import { HeroSceneMounter } from '../mounters/HeroSceneMounter'

type ISceneConnectorForOpacityEngine = Pick<
  ISceneConnector,
  'getHeroMounter' | 'getMainFireMounter' | 'getForestMounter' | 'getScene'
>

export class SceneOpacityEngine {
  private heroEngine: HeroSceneMounter
  private forestMounter: ForestSceneMounter
  private mainFireMounter: FireSceneMounter
  private scene: Scene

  constructor(sceneConnector: ISceneConnectorForOpacityEngine) {
    this.heroEngine = sceneConnector.getHeroMounter()
    this.forestMounter = sceneConnector.getForestMounter()
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
    this.updateForestOpacity()
    this.updateMainFireOpacity()
  }

  private updateMainFireOpacity() {
    const fireArea = this.mainFireSprite.getFireArea()

    const isOverlap = this.scene.physics.overlap(fireArea, this.heroSprite)

    this.mainFireSprite.setOpacityForBackground(isOverlap ? 0.2 : 1)
  }

  private updateForestOpacity() {
    const forestGroup = this.forestMounter.getForestGroup()

    forestGroup.forEachTree((treeSprite) => {
      if (this.needMakeTreeTransparent(treeSprite)) {
        treeSprite.setAlpha(0.2)
        return
      }
      treeSprite.setAlpha(1)
    })
  }

  private needMakeTreeTransparent(treeSprite: FirTree) {
    const heroInfelicityPX = 5
    const heroSpriteY = this.heroSprite.y + heroInfelicityPX
    const treeSpriteY = treeSprite.y
    return heroSpriteY < treeSpriteY
  }
}
