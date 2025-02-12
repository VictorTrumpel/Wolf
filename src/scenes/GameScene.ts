import { Scene } from 'phaser'
import {
  EnemiesMovingToHeroEngine,
  EnemiesSceneMounter,
  ForestSceneMounter,
  HeroAttackEnemyEngine,
  HeroAttackTreeEngine,
  HeroPickWoodEngine,
  HeroSceneMounter,
  ISceneConnector,
  SceneColliderEngine,
  SceneKeyboardEngine,
  SceneOpacityEngine,
} from '@features'

export class GameScene extends Scene {
  private sceneConnector: ISceneConnector | null = null

  constructor() {
    super('GameScene')
  }

  create() {
    this.cameras.main.setBounds(0, 0, 2000, 2000)

    this.add.image(1000, 1000, 'bonfire').setScale(0.2)

    const heroSceneMounter = new HeroSceneMounter(this)
    const forestSceneMounter = new ForestSceneMounter(this)
    const enemiesSceneEngine = new EnemiesSceneMounter(this)

    this.sceneConnector = {
      getForestMounter: () => forestSceneMounter,
      getHeroMounter: () => heroSceneMounter,
      getEnemiesMounter: () => enemiesSceneEngine,
      getScene: () => this,
    }

    new SceneOpacityEngine(this.sceneConnector)
    new SceneColliderEngine(this.sceneConnector)
    new HeroAttackTreeEngine(this.sceneConnector)
    new HeroPickWoodEngine(this.sceneConnector)
    new SceneKeyboardEngine(this.sceneConnector)
    new HeroAttackEnemyEngine(this.sceneConnector)
    new EnemiesMovingToHeroEngine(this.sceneConnector)
  }
}
