import { GameObjects } from 'phaser'
import { ITreeState } from '@entities'
import { TreeContext } from './TreeContext'

export class DeadTreeState implements ITreeState {
  constructor(private treeContext: TreeContext) {
    const treeSprite = treeContext.getSprite()
    treeSprite.playDead()
  }

  hurt() {}

  moveToHero(sprite: GameObjects.Sprite): void {
    const treeSprite = this.treeContext.getSprite()
    treeSprite.moveTo(sprite)
  }
}
