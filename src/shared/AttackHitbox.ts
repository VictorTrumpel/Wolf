import { GameObjects, Physics, Scene, Types } from 'phaser'

export class AttackHitbox {
  private rectanle: GameObjects.Rectangle | null = null
  private rectangleBody: Physics.Arcade.Body | null = null

  private overlapMap = new Map<Types.Physics.Arcade.ArcadeColliderType, () => void>()

  constructor(private scene: Scene) {}

  addOverlapWith(obj: Types.Physics.Arcade.ArcadeColliderType, cb: () => void) {
    this.overlapMap.set(obj, cb)
  }

  enable(x: number, y: number, width: number, height?: number) {
    this.rectanle = this.scene.add.rectangle(x, y, width, height || width)
    this.scene.physics.add.existing(this.rectanle)
    this.rectangleBody = this.rectanle.body as Physics.Arcade.Body

    for (const [overlapObj, cb] of this.overlapMap) {
      const isOverlap = this.scene.physics.overlap(this.rectangleBody, overlapObj)
      if (!isOverlap) return
      cb()
    }
  }

  disable() {
    if (this.rectanle) {
      this.rectanle?.destroy()
    }
  }
}
