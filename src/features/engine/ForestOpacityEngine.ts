import { Scene } from 'phaser'
import { FirTree } from '@entities'
import { ISceneConnector } from '../ISceneConnector'
import { ForestSceneMounter } from '../mounters/ForestSceneMounter'
import { HeroSceneMounter } from '../mounters/HeroSceneMounter'

type ISceneConnectorForOpacityEngine = Pick<
  ISceneConnector,
  'getHeroMounter' | 'getForestMounter' | 'getScene'
>

export class ForestOpacityEngine {
  private heroEngine: HeroSceneMounter
  private forestMounter: ForestSceneMounter
  private scene: Scene

  constructor(sceneConnector: ISceneConnectorForOpacityEngine) {
    this.heroEngine = sceneConnector.getHeroMounter()
    this.forestMounter = sceneConnector.getForestMounter()
    this.scene = sceneConnector.getScene()

    this.create()
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
