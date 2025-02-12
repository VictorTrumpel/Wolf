import { Scene } from 'phaser'
import { ISceneConnector } from '../ISceneConnector'
import { EnemiesSceneEngine } from './EnemiesSceneEngine'
import { ForestSceneEngine } from './ForestSceneEngine'
import { HeroSceneEngine } from './HeroSceneEngine'

export class SceneColliderEngine {
  private heroEngine: HeroSceneEngine
  private forestEngine: ForestSceneEngine
  private enemyEngine: EnemiesSceneEngine
  private scene: Scene

  constructor(sceneConnector: ISceneConnector) {
    this.heroEngine = sceneConnector.getHeroEngine()
    this.forestEngine = sceneConnector.getForestEngine()
    this.enemyEngine = sceneConnector.getEnemiesEngine()
    this.scene = sceneConnector.getScene()

    this.create()
  }

  private get heroSprite() {
    return this.heroEngine.getHeroContext().getSprite()
  }

  private get forestGroup() {
    return this.forestEngine.getForestGroup()
  }

  private get enemyGroup() {
    return this.enemyEngine.getEnemyGroup()
  }

  private create() {
    // this.scene.physics.add.collider(this.heroSprite, this.forestGroup)
    this.scene.physics.add.collider(this.enemyGroup, this.enemyGroup)
  }
}
