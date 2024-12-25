import { GameObjects } from 'phaser'
import { StaticSprite } from '@shared'

export class BathHouse extends StaticSprite {
  constructor(buildings: GameObjects.Group, x: number, y: number) {
    super(buildings.scene, x, y, 'bathHouse', 'bathHouse')

    buildings.add(this)

    this.setScale(2)
  }

  playSmolder() {}

  playWeak() {}

  playMedium() {}

  playStrong() {}
}
