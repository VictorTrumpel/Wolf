import { GameObjects } from 'phaser'
import { StaticSprite } from '@shared'
import { TREE_SCALE } from './constants'

export class AutomTree extends StaticSprite {
  constructor(forest: GameObjects.Group, x: number, y: number) {
    super(forest.scene, x, y, 'automTree', 'automTree')

    forest.add(this)

    this.setScale(TREE_SCALE)
    this.setOrigin(0.5, 1)

    // this.body.setSize(TREE_WIDTH, TREE_HEIGHT)
    // this.body.setOffset(TREE_BODY_OFFSET_X, TREE_BODY_OFFSET_Y)
  }

  setPosition(x: number, y: number, z?: number, w?: number): this {
    super.setPosition(x, y, z, w)
    const body = this.getBody()

    if (body) {
      body.x = x
      body.y = y
    }

    return this
  }
}
