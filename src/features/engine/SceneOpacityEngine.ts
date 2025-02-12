import { Scene } from 'phaser'
import { FirTree } from '@entities'
import { ISceneConnector } from '../ISceneConnector'
import { ForestSceneEngine } from './ForestSceneEngine'
import { HeroSceneEngine } from './HeroSceneEngine'

export class SceneOpacityEngine {
  private heroEngine: HeroSceneEngine
  private forestEngine: ForestSceneEngine
  private scene: Scene

  constructor(sceneConnector: ISceneConnector) {
    this.heroEngine = sceneConnector.getHeroEngine()
    this.forestEngine = sceneConnector.getForestEngine()
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
    const forestGroup = this.forestEngine.getForestGroup()

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
