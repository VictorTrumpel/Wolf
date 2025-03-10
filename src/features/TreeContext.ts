import { ITreeSprite, ITreeState, TreeStats } from '@entities'

export class TreeContext implements ITreeState {
  private treeStats = new TreeStats(100)

  constructor(private treeSprite: ITreeSprite) {
    treeSprite.setContext(this)
  }

  hurt(hp: number) {
    const currentHp = this.treeStats.getHp()
    this.treeStats.setHp(currentHp - hp)
    this.treeSprite.scene.sound.play('woodHitSound', { volume: 0.5 })

    if (this.treeStats.getHp() <= 0) {
      this.treeSprite.emit('becomeDead', this.treeSprite)
    }
  }
}
