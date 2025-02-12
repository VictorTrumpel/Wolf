import { Scene } from 'phaser'
import { EnemySprite } from '@entities'
import { ISceneConnector } from '../ISceneConnector'
import { EnemiesSceneMounter } from '../mounters/EnemiesSceneMounter'
import { HeroSceneMounter } from '../mounters/HeroSceneMounter'

export class EnemiesMovingToHeroEngine {
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

  private get heroSprite() {
    return this.heroEngine.getHeroContext().getSprite()
  }

  private handleMoveEnemiesToHero = () => {
    this.forEachEnemy((enemy) => {
      enemy.setDepth(enemy.y)
      const enemyContext = enemy.getContext()
      enemyContext?.moveToObject(this.heroSprite)
    })
  }

  private create() {
    this.scene.time.addEvent({
      delay: 300,
      callback: this.handleMoveEnemiesToHero,
      loop: true,
    })
  }

  private forEachEnemy(cb: (enemy: EnemySprite) => void) {
    this.enemyGroup.children.each((enemy) => {
      cb(enemy as EnemySprite)
      return true
    })
  }
}
