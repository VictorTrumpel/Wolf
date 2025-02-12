import { Scene } from 'phaser'
import { EnemySprite } from '@entities'
import { ISceneConnector } from '../ISceneConnector'
import { EnemiesSceneEngine } from './EnemiesSceneEngine'
import { HeroSceneEngine } from './HeroSceneEngine'

export class EnemiesMovingToHeroEngine {
  private heroEngine: HeroSceneEngine
  private enemyEngine: EnemiesSceneEngine
  private scene: Scene

  constructor(sceneConnector: ISceneConnector) {
    this.heroEngine = sceneConnector.getHeroEngine()
    this.enemyEngine = sceneConnector.getEnemiesEngine()
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
