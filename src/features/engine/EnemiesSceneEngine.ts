import { GameObjects, Scene } from 'phaser'
import { EnemySprite } from '@entities'
import { EnemyContext } from '../EnemyContext'

const MAX_ENEMY_COUNT = 10

export class EnemiesSceneEngine {
  private enemiesGroup: GameObjects.Group

  constructor(private scene: Scene) {
    this.enemiesGroup = this.scene.physics.add.group()

    this.create()
  }

  getEnemyGroup() {
    return this.enemiesGroup
  }

  private handleCreateEnemy = () => {
    if (this.enemiesCount >= MAX_ENEMY_COUNT) return
    this.enemiesGroup.add(this.createEnemySprite(1400, 1300))
  }

  private get enemiesCount() {
    return this.enemiesGroup.children.size
  }

  private createEnemySprite(x: number, y: number) {
    const sprite = new EnemySprite(this.scene, x, y, 'ork')
    new EnemyContext(sprite)
    return sprite
  }

  private create() {
    this.scene.time.addEvent({
      delay: 3000,
      callback: this.handleCreateEnemy,
      loop: true,
    })
  }
}
