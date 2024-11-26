import { GameObjects, Physics, Scene } from 'phaser'
import {
  TREE_BODY_OFFSET_X,
  TREE_BODY_OFFSET_Y,
  TREE_HEIGHT,
  TREE_SCALE,
  TREE_WIDTH,
} from './constants'

export class ForestGroup {
  private transparentSpritesMap = new Map<GameObjects.Sprite, (treeCord: number) => boolean>()

  private forestArea: Physics.Arcade.Body

  private constructor(
    private scene: Scene,
    private _group: Physics.Arcade.StaticGroup
  ) {
    this.forestArea = this.scene.physics.add.body(100, 100, 200, 200)
  }

  static create(scene: Scene) {
    const staticGroup = scene.physics.add.staticGroup()
    return new this(scene, staticGroup)
  }

  get group() {
    return this._group
  }

  get area() {
    return this.forestArea
  }

  setForestAreaPosition(x: number, y: number) {
    this.forestArea.x = x
    this.forestArea.y = y
  }

  setForesAreaSize(width: number, height: number) {
    this.forestArea.setSize(width, height)
  }

  addTree(x: number, y: number) {
    const sprite = this.group.create(x + this.forestArea.x, y + this.forestArea.y, 'automTree')
    sprite.setScale(TREE_SCALE)
    sprite.setOrigin(0.5, 1)
    sprite.body.setSize(TREE_WIDTH, TREE_HEIGHT)
    sprite.body.setOffset(TREE_BODY_OFFSET_X, TREE_BODY_OFFSET_Y)
    sprite.setDepth(y)
  }

  addTransparentForObject(
    sprite: GameObjects.Sprite,
    needMakeTreeTransparent: (treeYCord: number) => boolean
  ) {
    this.transparentSpritesMap.set(sprite, needMakeTreeTransparent)
  }

  update() {
    const hasObjectsIfForest = this.hasObjectsInForestArea()

    if (!hasObjectsIfForest) {
      this.makeAllTreesNotTransparent()
      return
    }

    for (const [object, needMakeTreeTransparent] of this.transparentSpritesMap) {
      object.setDepth(object.y)

      this.forEachTree((treeSprite) => {
        if (needMakeTreeTransparent(treeSprite.y)) {
          treeSprite.setAlpha(0.2)
          return
        }

        treeSprite.setAlpha(1)
      })
    }
  }

  forEachTree(cb: (tree: GameObjects.Sprite) => void) {
    this.group.children.each((tree) => {
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
