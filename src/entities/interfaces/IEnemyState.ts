import { GameObjects } from 'phaser'

export interface IEnemyState {
  hurt(damage: number): void
  moveToObject(gameObject: GameObjects.GameObject): void
}
