import { GameObjects } from 'phaser'
import { FirTree } from '@entities'
import { ISceneConnector } from '../ISceneConnector'
import { ForestSceneEngine } from './ForestSceneEngine'
import { HeroSceneEngine } from './HeroSceneEngine'

export class HeroAttackTreeEngine {
  private heroEngine: HeroSceneEngine
  private forestEngine: ForestSceneEngine

  constructor(sceneConnector: ISceneConnector) {
    this.heroEngine = sceneConnector.getHeroEngine()
    this.forestEngine = sceneConnector.getForestEngine()

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
