import { Scene } from 'phaser'
import { ISceneConnector } from '../ISceneConnector'
import { EnemiesSceneMounter, HeroSceneMounter } from '../mounters'

export class EnemyAttackHeroEngine {
  private heroEngine: HeroSceneMounter
  private enemyEngine: EnemiesSceneMounter
  private scene: Scene

  constructor(sceneConnector: ISceneConnector) {
    this.heroEngine = sceneConnector.getHeroMounter()
    this.enemyEngine = sceneConnector.getEnemiesMounter()
    this.scene = sceneConnector.getScene()

    this.create()
  }

  private get enemyGroup() {
    return this.enemyEngine.getEnemyGroup()
  }

  private get heroContext() {
    return this.heroEngine.getHeroContext()
  }

  private handleHurtHero = async () => {
    this.heroContext.hurt(1)
  }

  create() {
    const heroSprite = this.heroContext.getSprite()

    this.scene.physics.add.overlap(this.enemyGroup, heroSprite, this.handleHurtHero)
  }
}
