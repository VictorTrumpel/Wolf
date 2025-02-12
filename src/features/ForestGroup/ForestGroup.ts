import { GameObjects, Physics, Scene } from 'phaser'
import { DeadTreeGood, FirTree, ITreeSprite } from '@entities'
import { TreeContext } from '../TreeContext'

export class ForestGroup extends Physics.Arcade.StaticGroup {
  private forestArea: Physics.Arcade.Body

  private _deadTreeGroup: Physics.Arcade.Group

  constructor(physics: Physics.Arcade.World, scene: Scene) {
    super(physics, scene)

    this.forestArea = this.scene.physics.add.body(100, 100, 200, 200)
    this._deadTreeGroup = this.scene.physics.add.group()
  }

  private handleTreeDead = (deadTree: GameObjects.Sprite) => {
    this.remove(deadTree)
    deadTree.destroy()

    const deadTreeGood = new DeadTreeGood(this.scene, deadTree.x, deadTree.y)
    this.deadTreeGroup.add(deadTreeGood)

    deadTreeGood.playDead()

    this.scene.time.addEvent({
      delay: 100000,
      callback: () => this.addFirTree(deadTree.x, deadTree.y),
    })
  }

  get area() {
    return this.forestArea
  }

  setForestAreaPosition(x: number, y: number) {
    this.forestArea.x = x
    this.forestArea.y = y
  }

  setForestAreaSize(width: number, height: number) {
    this.forestArea.setSize(width, height)
  }

  addFirTree(x: number, y: number) {
    const firTree = new FirTree(this, this.area.x + x, this.area.y + y)
    const treeContext = new TreeContext(firTree)

    const treeDepth = this.area.y + y - firTree.getBodyHeight()
    firTree.setDepth(treeDepth)

    firTree.on('becomeDead', this.handleTreeDead)

    return treeContext
  }

  removeTreeFromAlifeGroup(treeSprite: ITreeSprite) {
    this.remove(treeSprite)
  }

  addTreeToDeadGroup(treeSprite: GameObjects.Sprite) {
    this.deadTreeGroup.add(treeSprite)
  }

  removeTreeFromDeadGroup(treeSprite: GameObjects.Sprite) {
    this.deadTreeGroup.remove(treeSprite)
  }

  get deadTreeGroup() {
    return this._deadTreeGroup
  }

  getDeadTreeGroup() {
    return this._deadTreeGroup
  }

  forEachDeadTree(cb: (tree: GameObjects.Sprite) => void) {
    this.deadTreeGroup.children.each((good) => {
      const goodSprite = good as GameObjects.Sprite
      cb(goodSprite)
      return true
    })
  }

  forEachTree(cb: (tree: FirTree) => void) {
    this.children.each((tree) => {
      const treeSprite = tree as FirTree
      cb(treeSprite)
      return true
    })
  }
}
