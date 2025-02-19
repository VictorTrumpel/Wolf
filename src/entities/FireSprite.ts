import { Scene } from 'phaser'
import { PhysicsSprite } from '@shared'

const LARGE_FIRE_ANIMATION = 'LARGE_FIRE_ANIMATION'
const SMALL_FIRE_ANIMATION = 'SMALL_FIRE_ANIMATION'
const MEDIUM_FIRE_ANIMATION = 'MEDIUM_FIRE_ANIMATION'

export class FireSprite extends PhysicsSprite {
  private background: Phaser.GameObjects.Image[] = []
  private area: Phaser.Physics.Arcade.StaticBody | null = null

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'largeFire', 'largeFire_1')

    this.setScale(2)

    this.setDepth(y)

    this.setOrigin(0.5, 1)

    this.createLargeFireAnimation()
    this.createMediumFireAnimation()
    this.createSmallFireAnimation()

    this.printWoodStones()

    this.createFireArea()
  }

  getFireArea() {
    if (!this.area) throw new Error('Area does not exist!')
    return this.area
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

  setOpacityForBackground(opacity: number) {
    this.background.forEach((image) => {
      image.setAlpha(opacity)
    })
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

  private createFireArea() {
    this.area = this.scene.physics.add.staticBody(this.x - 86, this.y - 140)
    this.area.setCircle(90)
  }

  private printWoodStones() {
    const woodStones = this.scene.add.image(this.x - 55, this.y - 45, 'woodStones')
    woodStones.setOrigin(0.5, 0.7)
    woodStones.setScale(0.2)
    woodStones.setDepth(woodStones.y - 1)

    const stone1 = this.scene.add.image(this.x - 20, this.y, 'stone1')
    stone1.setScale(0.2)
    stone1.setDepth(this.y + 1)

    const stone2 = this.scene.add.image(this.x + 8, this.y, 'stone1')
    stone2.flipX = true
    stone2.setScale(0.12)
    stone2.setDepth(this.y + 1)

    const stone3 = this.scene.add.image(this.x + 25, this.y - 5, 'stone1')
    stone3.setScale(0.1)
    stone3.setDepth(this.y + 1)

    const stone4 = this.scene.add.image(this.x - 35, this.y - 15, 'stone1')
    stone4.setScale(0.13)
    stone4.setDepth(this.y - 1)

    const stone5 = this.scene.add.image(this.x + 30, this.y - 20, 'stone1')
    stone5.flipX = true
    stone5.setScale(0.12)
    stone5.setDepth(this.y - 1)

    const stone6 = this.scene.add.image(this.x - 15, this.y - 25, 'stone1')
    stone6.flipX = true
    stone6.setScale(0.12)
    stone6.setDepth(this.y - 1)

    const stone7 = this.scene.add.image(this.x + 12, this.y - 30, 'stone1')
    stone7.setScale(0.12)
    stone7.setDepth(this.y - 1)

    const tothemStoun = this.scene.add.image(this.x + 55, this.y - 40, 'tothemStoun')
    tothemStoun.setOrigin(0.5, 0.8)
    tothemStoun.setScale(0.2)
    tothemStoun.setDepth(tothemStoun.y)

    this.background.push(woodStones, tothemStoun)
  }
}
