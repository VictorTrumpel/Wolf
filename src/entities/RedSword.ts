import { Scene } from 'phaser'
import { Sprite } from '../shared/Sprite'

export class RedSword {
  sprite: Sprite

  private swordWidth = 500
  private swordHeight = 126

  constructor(public scene: Scene) {
    this.sprite = new Sprite(scene)
  }

  create() {
    const frames = this.scene.anims.generateFrameNames('swordSplash', {
      prefix: 'swordSplash',
      start: 1,
      end: 6,
    })

    this.scene.anims.create({
      key: 'swordSplash',
      frames,
      frameRate: 13,
      repeat: -1,
    })

    this.sprite.create(0, 0, 'swordSplash')

    this.sprite.sprite.setScale(0.2, 0.2)
    this.sprite.sprite.userInfo = new Map([['creator', this]])
    this.setActive(false)
  }

  attack() {
    this.setActive(true)

    this.sprite.sprite.play('swordSplash')

    setTimeout(() => {
      this.sprite.sprite.stop()
      this.setActive(false)
    }, 400)
  }

  setActive(active: boolean) {
    this.sprite.sprite.setVisible(active)
    this.sprite.body.enable = active
    this.sprite.sprite.stop()
    if (active) {
      this.sprite.body.setSize(this.swordWidth, this.swordHeight)
      return
    }
    this.sprite.body.setSize(0.1, 0.1)
  }
}
