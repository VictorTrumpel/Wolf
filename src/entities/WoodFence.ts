import { GameObjects } from 'phaser'
import { StaticSprite } from '@shared'

type FenceOptions =
  | {
      type: 'vertical'
      collumns: 8 | 4 | 2 | 1
    }
  | {
      type: 'horizontal'
      collumns: 3 | 1
    }

const textureMapperVertical = {
  8: 'woodenFence8CollumnsVertical',
  4: 'woodenFence4CollumnsVertical',
  2: 'woodenFence2CollumnsVertical',
  1: 'woodenFence1CollumnsVertical',
}

const textureMapperHorizontal = {
  3: 'woodenFence3CollumnsHorizontal',
  1: 'woodenFence1CollumnsHorizontal',
}

export class WoodFence extends StaticSprite {
  constructor(buildings: GameObjects.Group, x: number, y: number, options: FenceOptions) {
    const texture =
      options.type === 'vertical'
        ? textureMapperVertical[options.collumns]
        : textureMapperHorizontal[options.collumns]

    super(buildings.scene, x, y, texture, '')
    this.scale = 2
    buildings.add(this)
  }
}
