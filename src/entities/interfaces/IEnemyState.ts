import { GameObjects } from 'phaser'

export interface IEnemyState {
  hurt(damage: number): Promise<void>
  moveToObject(gameObject: GameObjects.GameObject): void
}
