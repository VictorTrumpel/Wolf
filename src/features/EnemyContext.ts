import { GameObjects } from 'phaser'
import { IEnemySprite, IEnemyState } from '@entities'

export class EnemyContext implements IEnemyState {
  private hp = 100

  private isHurting = false

  constructor(private enemySprite: IEnemySprite) {
    enemySprite.setContext(this)
  }

  moveToObject(heroSprite: GameObjects.GameObject) {
    if (this.isHurting) return
    heroSprite.scene.physics.moveToObject(this.enemySprite, heroSprite, 50)
  }

  async hurt(damage: number) {
    this.isHurting = true
    this.hp -= damage
    this.enemySprite.scene.sound.play('axeHitSound', { volume: 0.5 })
    await this.enemySprite.playHurt()
    this.isHurting = false
    if (this.hp <= 0) {
      this.enemySprite.destroy()
    }
  }
}
