import { EnemySprite } from '@entities'
import { ISceneConnector } from '../ISceneConnector'
import { EnemiesSceneMounter } from '../mounters/EnemiesSceneMounter'
import { HeroSceneMounter } from '../mounters/HeroSceneMounter'

export class HeroAttackEnemyEngine {
  private heroEngine: HeroSceneMounter
  private enemyEngine: EnemiesSceneMounter

  constructor(sceneConnector: ISceneConnector) {
    this.heroEngine = sceneConnector.getHeroMounter()
    this.enemyEngine = sceneConnector.getEnemiesMounter()

    this.create()
  }

  private handleHurtEnemy = async (enemy: EnemySprite) => {
    const inpulseSpeed = this.heroSprite.flipX ? -10 : 10
    const enemyContext = enemy.getContext()
    enemy.getBody().setVelocityX(inpulseSpeed)
    await enemyContext?.hurt(25)
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
