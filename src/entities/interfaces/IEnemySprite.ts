import { GameObjects } from 'phaser'
import { IEnemyState } from './IEnemyState'

export interface IEnemySprite extends GameObjects.GameObject {
  playHurt(): Promise<void>

  setContext(context: IEnemyState): void
  getContext(): IEnemyState | null

  destroy(): void
}
