import { Scene } from 'phaser'
import { PhysicsSprite } from '@shared'

const DEAD_ANIMATION = 'FIR_DEAD_ANIMATION'

export class DeadTreeGood extends PhysicsSprite {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'deadTreeAtlas', 'dead_1')

    this.setScale(1.5)

    const body = this.getBody()
    body.setSize(25, 25)

    this.setOrigin(0.5, 1)

    this.createDeadAnimation()
  }

  playDead() {
    this.setTint(0xffffff)
    this.setTexture('deadTreeAtlas')
    this.play(DEAD_ANIMATION, true)
    this.setScale(1.5)
    this.emit('becomeDead')
  }

  private createDeadAnimation() {
    const frames = this.anims.generateFrameNames('deadTreeAtlas', {
      prefix: 'dead_',
      start: 1,
      end: 8,
    })

    this.scene.anims.create({
      key: DEAD_ANIMATION,
      frames,
      frameRate: 10,
      repeatDelay: 1000,
      repeat: -1,
    })
  }
}
