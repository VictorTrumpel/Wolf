import { GameObjects } from 'phaser'
import { ITreeState } from './ITreeState'

export interface ITreeSprite {
  playHurt(): void
  playDead(): void
  moveTo(sprite: GameObjects.Sprite): void

  setContext(context: ITreeState): void
  getContext(): ITreeState | null
}
