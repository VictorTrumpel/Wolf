import { GameObjects } from 'phaser'
import { FirTree } from '@entities'
import { ISceneConnector } from '../ISceneConnector'
import { ForestSceneMounter } from '../mounters/ForestSceneMounter'
import { HeroSceneMounter } from '../mounters/HeroSceneMounter'

export class HeroAttackTreeEngine {
  private heroEngine: HeroSceneMounter
  private forestEngine: ForestSceneMounter

  constructor(sceneConnector: ISceneConnector) {
    this.heroEngine = sceneConnector.getHeroMounter()
    this.forestEngine = sceneConnector.getForestMounter()

    this.create()
  }

  private handleTreeAttack = (object: GameObjects.GameObject) => {
    this.heroContext.attackHitbox.playWoodChips()
    const tree = object as FirTree
    const treeContext = tree.getContext()
    treeContext?.hurt(20)
  }

  private get heroContext() {
    return this.heroEngine.getHeroContext()
  }

  private get forestGroup() {
    return this.forestEngine.getForestGroup()
  }

  private create() {
    this.heroContext.attackHitbox.addOverlapWith(this.forestGroup, this.handleTreeAttack)
  }
}
