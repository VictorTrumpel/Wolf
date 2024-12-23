import { Scene } from 'phaser'
import { PhysicsSprite } from '@shared'

const FLY_ANIMATION = 'FLY_ANIMATION'

export class WoodChips extends PhysicsSprite {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'woodChips', 'chips_1')

    this.setScale(2)

    this.createFlyAnimation()
  }

  async playFly() {
    return new Promise((complete) => {
      this.play(FLY_ANIMATION)

      this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        complete(null)
      })
    })
  }

  private createFlyAnimation() {
    const frames = this.anims.generateFrameNames('woodChips', {
      prefix: 'chips_',
      start: 1,
      end: 2,
    })

    this.anims.create({
      key: FLY_ANIMATION,
      frames,
      frameRate: 10,
    })
  }
}
