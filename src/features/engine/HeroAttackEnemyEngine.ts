import { EnemySprite } from '@entities'
import { ISceneConnector } from '../ISceneConnector'
import { EnemiesSceneEngine } from './EnemiesSceneEngine'
import { HeroSceneEngine } from './HeroSceneEngine'

export class HeroAttackEnemyEngine {
  private heroEngine: HeroSceneEngine
  private enemyEngine: EnemiesSceneEngine

  constructor(sceneConnector: ISceneConnector) {
    this.heroEngine = sceneConnector.getHeroEngine()
    this.enemyEngine = sceneConnector.getEnemiesEngine()

    this.create()
  }

  private handleHurtEnemy = (enemy: EnemySprite) => {
    const inpulseSpeed = this.heroSprite.flipX ? -10 : 10
    const enemyContext = enemy.getContext()
    enemy.getBody().setVelocityX(inpulseSpeed)
    enemyContext?.hurt(25)
  }

  private get heroSprite() {
    return this.heroEngine.getHeroContext().getSprite()
  }

  private get heroContext() {
    return this.heroEngine.getHeroContext()
  }

  private get enemiesGroup() {
    return this.enemyEngine.getEnemyGroup()
  }

  private create() {
    this.heroContext.attackHitbox.addOverlapWith(this.enemiesGroup, (enemy) => {
      this.handleHurtEnemy(enemy as EnemySprite)
    })
  }
}
