import { GameObjects } from 'phaser'
import { ITreeSprite, ITreeState, TreeStats } from '@entities'
import { DeadTreeState } from './DeadTreeState'
import { IdleTreeState } from './IdleTreeState'

export class TreeContext implements ITreeState {
  private treeState: ITreeState

  private treeStats = new TreeStats(100)

  constructor(private treeSprite: ITreeSprite) {
    this.treeState = new IdleTreeState(this)

    treeSprite.setContext(this)
  }

  hurt(hp: number) {
    this.treeState.hurt(hp)
  }

  setState(state: ITreeState) {
    this.treeState = state
  }

  getState() {
    return this.treeState
  }

  moveToHero(sprite: GameObjects.Sprite) {
    this.treeState.moveToHero(sprite)
  }

  getSprite() {
    return this.treeSprite
  }

  getTreeStats() {
    return this.treeStats
  }

  getIdleState() {
    return new IdleTreeState(this)
  }

  getDeadState() {
    return new DeadTreeState(this)
  }
}
