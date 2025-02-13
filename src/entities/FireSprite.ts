import { Scene } from 'phaser'
import { StaticSprite } from '@shared'

const LARGE_FIRE_ANIMATION = 'LARGE_FIRE_ANIMATION'

export class FireSprite extends StaticSprite {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'fireAtlas', 'largeFire_1')

    this.createLargeFireAnimation()
  }

  private createLargeFireAnimation() {
    const frames = this.anims.generateFrameNames('fireAtlas', {
      prefix: 'largeFire_',
      start: 1,
      end: 14,
    })

    this.anims.create({
      key: LARGE_FIRE_ANIMATION,
      frames,
      frameRate: 13,
      repeat: 0,
    })
  }
}
