import { GameObjects, Scene } from 'phaser'
import { EnemySprite } from '@entities'
import { EnemyContext } from '../EnemyContext'

const MAX_ENEMY_COUNT = 50

export class EnemiesSceneMounter {
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
    const spawnSide = {
      0: { x: this.getRandomEnemyPosition(0, 2000), y: this.getRandomEnemyPosition(-20, 0) },
      1: { x: this.getRandomEnemyPosition(2000, 2050), y: this.getRandomEnemyPosition(0, 2000) },
      2: { x: this.getRandomEnemyPosition(0, 2000), y: this.getRandomEnemyPosition(2000, 2050) },
      3: { x: this.getRandomEnemyPosition(-20, 0), y: this.getRandomEnemyPosition(0, 2000) },
    }

    const randomSide = this.getRandomInt(0, 3)

    const { x, y } = spawnSide[randomSide as 0 | 1 | 2 | 3]

    this.enemiesGroup.add(this.createEnemySprite(x, y))
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
      delay: 8000,
      callback: this.handleCreateEnemy,
      loop: true,
    })
  }

  private getRandomInt(min: number, max: number) {
    const minInt = Math.ceil(min)
    const maxInt = Math.floor(max)
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt
  }

  private getRandomEnemyPosition(min: number, max: number) {
    return Math.random() * (max - min) + min
  }
}
