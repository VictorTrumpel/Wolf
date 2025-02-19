import { Scene } from 'phaser'
import { ISceneConnector } from '../ISceneConnector'
import { FireSceneMounter, HeroSceneMounter } from '../mounters'
import { EnemiesSceneMounter } from '../mounters/EnemiesSceneMounter'

export class SceneColliderEngine {
  private enemyEngine: EnemiesSceneMounter
  private heroMounter: HeroSceneMounter
  private mainFireMounter: FireSceneMounter
  private scene: Scene

  constructor(sceneConnector: ISceneConnector) {
    this.enemyEngine = sceneConnector.getEnemiesMounter()
    this.mainFireMounter = sceneConnector.getMainFireMounter()
    this.heroMounter = sceneConnector.getHeroMounter()
    this.scene = sceneConnector.getScene()

    this.create()
  }

  private get enemyGroup() {
    return this.enemyEngine.getEnemyGroup()
  }

  private create() {
    this.scene.physics.add.collider(this.enemyGroup, this.enemyGroup)
  }
}
