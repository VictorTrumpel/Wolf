import { Scene } from 'phaser'
import { DeadTreeGood } from '@entities'
import { ISceneConnector } from '../ISceneConnector'
import { ForestSceneMounter } from '../mounters/ForestSceneMounter'
import { HeroSceneMounter } from '../mounters/HeroSceneMounter'

type GameObject =
  | Phaser.Types.Physics.Arcade.GameObjectWithBody
  | Phaser.Physics.Arcade.Body
  | Phaser.Tilemaps.Tile

export class HeroPickWoodEngine {
  private heroEngine: HeroSceneMounter
  private forestEngine: ForestSceneMounter
  private scene: Scene

  constructor(sceneConnector: ISceneConnector) {
    this.heroEngine = sceneConnector.getHeroMounter()
    this.forestEngine = sceneConnector.getForestMounter()
    this.scene = sceneConnector.getScene()

    this.create()
  }

  private handleHeroPickTreeGood = (_: unknown, treeGood: GameObject) => {
    const isTreeGood = treeGood instanceof DeadTreeGood
    if (!isTreeGood) return
    this.forestGroup.removeTreeFromDeadGroup(treeGood)
    this.heroContext.addWoodGoodCount(1)
    treeGood.destroy()
  }

  private get heroContext() {
    return this.heroEngine.getHeroContext()
  }

  private get forestGroup() {
    return this.forestEngine.getForestGroup()
  }

  private create() {
    const heroSprite = this.heroContext.getSprite()
    const deadForestGroup = this.forestGroup.deadTreeGroup

    this.scene.physics.add.overlap(heroSprite, deadForestGroup, this.handleHeroPickTreeGood)
  }
}
