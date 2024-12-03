import { ITreeState } from '@entities'
import { TreeContext } from './TreeContext'

export class IdleTreeState implements ITreeState {
  constructor(private treeContext: TreeContext) {}

  hurt(hp: number): void {
    const treeSprite = this.treeContext.getSprite()
    const treeStats = this.treeContext.getTreeStats()

    treeSprite.playHurt()
    treeStats.setHp(treeStats.getHp() - hp)

    if (treeStats.getHp() <= 0) {
      const deadState = this.treeContext.getDeadState()
      this.treeContext.setState(deadState)
    }
  }

  moveToHero() {}
}
