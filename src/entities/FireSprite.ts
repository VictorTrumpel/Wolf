import { Scene } from 'phaser'
import { PhysicsSprite } from '@shared'

const LARGE_FIRE_ANIMATION = 'LARGE_FIRE_ANIMATION'
const SMALL_FIRE_ANIMATION = 'SMALL_FIRE_ANIMATION'
const MEDIUM_FIRE_ANIMATION = 'MEDIUM_FIRE_ANIMATION'

export class FireSprite extends PhysicsSprite {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'largeFire', 'largeFire_1')

    this.setScale(2)

    this.setDepth(y)

    this.setOrigin(0.5, 1)

    this.createLargeFireAnimation()
    this.createMediumFireAnimation()
    this.createSmallFireAnimation()
  }

  playLargeFire() {
    this.play(LARGE_FIRE_ANIMATION, true)
    this.setBodyOffsetForLargeFire()
  }

  playMediumFire() {
    this.play(MEDIUM_FIRE_ANIMATION, true)
    this.setBodyOffsetForMediumFire()
  }

  playSmallFire() {
    this.play(SMALL_FIRE_ANIMATION, true)
    this.setBodyOffsetForSmallFire()
  }

  private setBodyOffsetForLargeFire() {
    const body = this.getBody()
    body.setOffset(0, 0)
  }

  private setBodyOffsetForMediumFire() {
    const body = this.getBody()
    body.setOffset(-8, 1)
  }

  private setBodyOffsetForSmallFire() {
    const body = this.getBody()
    body.setOffset(-6, 1)
  }

  private createLargeFireAnimation() {
    const frames = this.anims.generateFrameNames('largeFire', {
      prefix: 'largeFire_',
      start: 1,
      end: 14,
    })

    this.anims.create({
      key: LARGE_FIRE_ANIMATION,
      frames,
      frameRate: 13,
      repeat: -1,
    })
  }

  private createSmallFireAnimation() {
    const frames = this.anims.generateFrameNames('smallFire', {
      prefix: 'smallFire_',
      start: 1,
      end: 14,
    })

    this.anims.create({
      key: SMALL_FIRE_ANIMATION,
      frames,
      frameRate: 13,
      repeat: -1,
    })
  }

  private createMediumFireAnimation() {
    const frames = this.anims.generateFrameNames('mediumFire', {
      prefix: 'mediumFire_',
      start: 1,
      end: 14,
    })

    this.anims.create({
      key: MEDIUM_FIRE_ANIMATION,
      frames,
      frameRate: 13,
      repeat: -1,
    })
  }
}
