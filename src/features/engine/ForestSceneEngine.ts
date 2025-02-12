import { Scene } from 'phaser'
import { ForestGroup } from '../ForestGroup/ForestGroup'

export class ForestSceneEngine {
  private forest: ForestGroup

  constructor(scene: Scene) {
    this.forest = new ForestGroup(scene.physics.world, scene)
    this.create()
  }

  create() {
    this.forest.setForestAreaPosition(0, 0)
    this.forest.setForestAreaSize(2000, 2000)

    this.renderForestTrees()
  }

  getForestGroup() {
    return this.forest
  }

  private renderForestTrees() {
    const SIZE = 2000
    const STEP = 350

    const START_DEAD_ZONE_X = 500
    const END_DEAD_ZONE_X = 1400

    const START_DEAD_ZONE_Y = 650
    const END_DEAD_ZONE_Y = 1350

    for (let x = 0; x <= SIZE; x += STEP) {
      for (let y = 0; y <= SIZE; y += STEP) {
        const minX = x
        const minY = y

        const maxX = x + STEP
        const maxY = y + STEP

        const randomX = this.getRandomTreePosition(minX, maxX)
        const randomY = this.getRandomTreePosition(minY, maxY)

        const isXInDeadZone = randomX >= START_DEAD_ZONE_X && randomX <= END_DEAD_ZONE_X
        const isYInDeadZone = randomY >= START_DEAD_ZONE_Y && randomY <= END_DEAD_ZONE_Y

        if (isXInDeadZone && isYInDeadZone) continue

        this.forest.addFirTree(randomX, randomY)
      }
    }
  }

  private getRandomTreePosition(min: number, max: number) {
    return Math.random() * (max - min) + min
  }
}
