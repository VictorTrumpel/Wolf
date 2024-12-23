import { GameObjects, Physics, Scene, Types } from 'phaser'

type OverlapedObj = Types.Physics.Arcade.GameObjectWithBody

export class AttackHitbox {
  protected rectanle: GameObjects.Rectangle | null = null
  protected rectangleBody: Physics.Arcade.Body | null = null

  protected overlapMap = new Map<
    Types.Physics.Arcade.ArcadeColliderType,
    (obj: OverlapedObj) => void
  >()

  constructor(private scene: Scene) {}

  get x() {
    return this.rectanle?.x
  }

  get y() {
    return this.rectanle?.y
  }

  addOverlapWith(obj: Types.Physics.Arcade.ArcadeColliderType, cb: (obj: OverlapedObj) => void) {
    this.overlapMap.set(obj, cb)
  }

  enable(x: number, y: number, width: number, height?: number) {
    this.rectanle = this.scene.add.rectangle(x, y, width, height || width)
    this.scene.physics.add.existing(this.rectanle)
    this.rectangleBody = this.rectanle.body as Physics.Arcade.Body

    for (const [overlapObj, cb] of this.overlapMap) {
      this.scene.physics.overlap(this.rectangleBody, overlapObj, (_: unknown, obj) => {
        cb(obj as OverlapedObj)
      })
    }
  }

  disable() {
    if (this.rectanle) {
      this.rectanle?.destroy()
    }
  }
}
