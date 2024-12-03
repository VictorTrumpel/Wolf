import { GameObjects } from 'phaser'
import { ITreeState } from './ITreeState'

export interface ITreeSprite extends GameObjects.Sprite {
  playHurt(): void

  setContext(context: ITreeState): void
  getContext(): ITreeState | null

  emit(eventName: 'becomeDead', treeSprite: GameObjects.Sprite): boolean
}
