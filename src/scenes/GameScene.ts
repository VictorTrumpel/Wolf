import { Scene } from 'phaser'
import {
  ColdHurtBathEngine,
  EnemiesMovingToHeroEngine,
  EnemiesSceneMounter,
  EnemyAttackHeroEngine,
  FireSceneMounter,
  ForestOpacityEngine,
  ForestSceneMounter,
  HeroAttackEnemyEngine,
  HeroAttackTreeEngine,
  HeroPickWoodEngine,
  HeroSceneMounter,
  ISceneConnector,
  MainFireHurtEngine,
  MainFireOpacityEngine,
  PutWoodIntoFireEngine,
  SceneColliderEngine,
  SceneKeyboardEngine,
  ShowHelperTextWhenHeroNearEngine,
  ShowLooseMenuEngine,
  SnowParticleMounter,
} from '@features'

export class GameScene extends Scene {
  private sceneConnector: ISceneConnector | null = null

  constructor() {
    super('GameScene')
  }

  create() {
    this.cameras.main.setBounds(0, 0, 2000, 2000)

    this.events.on('shutdown', () => {
      this.events.removeListener('update')
    })

    const heroSceneMounter = new HeroSceneMounter(this)
    const forestSceneMounter = new ForestSceneMounter(this)
    const enemiesSceneMounter = new EnemiesSceneMounter(this)
    const fireSceneMounter = new FireSceneMounter(this)
    new SnowParticleMounter(this)

    this.sceneConnector = {
      getForestMounter: () => forestSceneMounter,
      getHeroMounter: () => heroSceneMounter,
      getEnemiesMounter: () => enemiesSceneMounter,
      getMainFireMounter: () => fireSceneMounter,
      getScene: () => this,
    }

    new MainFireHurtEngine(this.sceneConnector)
    new ForestOpacityEngine(this.sceneConnector)
    new MainFireOpacityEngine(this.sceneConnector)
    new SceneColliderEngine(this.sceneConnector)
    new HeroAttackTreeEngine(this.sceneConnector)
    new HeroPickWoodEngine(this.sceneConnector)
    new SceneKeyboardEngine(this.sceneConnector)
    new HeroAttackEnemyEngine(this.sceneConnector)
    new EnemiesMovingToHeroEngine(this.sceneConnector)
    new PutWoodIntoFireEngine(this.sceneConnector)
    new EnemyAttackHeroEngine(this.sceneConnector)
    new ShowLooseMenuEngine(this.sceneConnector)
    new ShowHelperTextWhenHeroNearEngine(this.sceneConnector)
    new ColdHurtBathEngine(this.sceneConnector)
  }
}
