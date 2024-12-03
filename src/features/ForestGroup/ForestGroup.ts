import { GameObjects, Physics, Scene } from 'phaser'
import { FirTree, ITreeSprite } from '@entities'
import { TreeContext } from '../TreeStateMachine/TreeContext'

export class ForestGroup extends Physics.Arcade.StaticGroup {
  private transparentSpritesMap = new Map<
    GameObjects.Sprite,
    (treeSprite: GameObjects.Sprite) => boolean
  >()

  private forestArea: Physics.Arcade.Body

  private _deadTreeGroup: Physics.Arcade.StaticGroup

  constructor(physics: Physics.Arcade.World, scene: Scene) {
    super(physics, scene)

    this.forestArea = this.scene.physics.add.body(100, 100, 200, 200)
    this._deadTreeGroup = this.scene.physics.add.staticGroup()
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

    const treeDepth = this.area.y + y - firTree.BODY_BOTTOM_OFFSET
    firTree.setDepth(treeDepth)

    firTree.on('becomeDead', () => {
      this.remove(firTree)
      this.deadTreeGroup.add(firTree)
    })

    return treeContext
  }

  removeTreeFromAlifeGroup(treeSprite: ITreeSprite) {
    if (treeSprite instanceof GameObjects.Sprite) {
      this.remove(treeSprite)
    }
  }

  addTreeToDeadGroup(treeSprite: ITreeSprite) {
    if (treeSprite instanceof GameObjects.Sprite) {
      this.deadTreeGroup.add(treeSprite)
    }
  }

  removeTreeFromDeadGroup(treeSprite: ITreeSprite) {
    if (treeSprite instanceof GameObjects.Sprite) {
      this.deadTreeGroup.remove(treeSprite)
    }
  }

  addTransparentForObject(
    sprite: GameObjects.Sprite,
    needMakeTreeTransparent: (tree: GameObjects.Sprite) => boolean
  ) {
    this.transparentSpritesMap.set(sprite, needMakeTreeTransparent)
  }

  get deadTreeGroup() {
    return this._deadTreeGroup
  }

  update() {
    const hasObjectsIfForest = this.hasObjectsInForestArea()

    if (!hasObjectsIfForest) {
      this.makeAllTreesNotTransparent()
      return
    }

    for (const [object, needMakeTreeTransparent] of this.transparentSpritesMap) {
      const objectDepthInFores = object.y + this.area.y
      object.setDepth(objectDepthInFores)

      this.forEachTree((treeSprite) => {
        if (needMakeTreeTransparent(treeSprite)) {
          treeSprite.setAlpha(0.2)
          return
        }

        treeSprite.setAlpha(1)
      })
    }
  }

  forEachTree(cb: (tree: GameObjects.Sprite) => void) {
    this.children.each((tree) => {
      const treeSprite = tree as GameObjects.Sprite
      cb(treeSprite)
      return true
    })
  }

  private makeAllTreesNotTransparent() {
    this.forEachTree((tree) => {
      const treeSprite = tree as GameObjects.Sprite
      treeSprite.setAlpha(1)
    })
  }

  private hasObjectsInForestArea() {
    for (const [object] of this.transparentSpritesMap) {
      const isOverlap = this.scene.physics.overlap(this.forestArea, object)
      if (isOverlap) return true
    }
    return false
  }
}
