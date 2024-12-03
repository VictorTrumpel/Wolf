import { GameObjects } from 'phaser'

export interface ITreeState {
  hurt(hp: number): void
  moveToHero(sprite: GameObjects.Sprite): void
}
