import { GameObjects, Physics } from 'phaser'
import { StaticSprite } from '@shared'

const SMOLDER_ANIMATION = 'SMOLDER_ANIMATION'
const WEAK_ANIMATION = 'WEAK_ANIMATION'
const MEDIUM_ANIMATION = 'MEDIUM_ANIMATION'
const STRONG_ANIMATION = 'STRONG_ANIMATION'

export class BathHouse extends StaticSprite {
  private stoveBody!: GameObjects.Arc

  constructor(
    private buildings: GameObjects.Group,
    x: number,
    y: number
  ) {
    super(buildings.scene, x, y, 'bathHouseAtlas', 'smalder_1')

    buildings.add(this)

    const body = this.getBody()
    body.destroy()

    this.setScale(2)

    this.createBody()
    this.createStoveBody()

    this.createSmolderAnimation()
    this.createWeakAnimation()
    this.createMediumAnimation()
    this.createStrongAnimation()
  }

  playSmolder() {
    this.play(SMOLDER_ANIMATION, true)
  }

  playWeak() {
    this.play(WEAK_ANIMATION, true)
  }

  playMedium() {
    this.play(MEDIUM_ANIMATION, true)
  }

  playStrong() {
    this.play(STRONG_ANIMATION, true)
  }

  getStoveBody() {
    return this.stoveBody
  }

  private createSmolderAnimation() {
    const frames = this.anims.generateFrameNames('bathHouseAtlas', {
      prefix: 'smolder_',
      start: 1,
      end: 10,
    })

    this.anims.create({
      key: SMOLDER_ANIMATION,
      frames,
      frameRate: 4,
      repeat: 0,
    })
  }

  private createWeakAnimation() {
    const frames = this.anims.generateFrameNames('bathHouseAtlas', {
      prefix: 'weak_',
      start: 1,
      end: 10,
    })

    this.anims.create({
      key: WEAK_ANIMATION,
      frames,
      frameRate: 13,
      repeat: 0,
    })
  }

  private createMediumAnimation() {
    const frames = this.anims.generateFrameNames('bathHouseAtlas', {
      prefix: 'medium_',
      start: 1,
      end: 10,
    })

    this.anims.create({
      key: MEDIUM_ANIMATION,
      frames,
      frameRate: 13,
      repeat: 0,
    })
  }

  private createStrongAnimation() {
    const frames = this.anims.generateFrameNames('bathHouseAtlas', {
      prefix: 'strong_',
      start: 1,
      end: 10,
    })

    this.anims.create({
      key: STRONG_ANIMATION,
      frames,
      frameRate: 13,
      repeat: 0,
    })
  }

  private createStoveBody() {
    const housePositionX = this.x
    const housePositionY = this.y

    this.stoveBody = this.scene.add.circle(housePositionX - 90, housePositionY + 150, 50)
    this.scene.physics.add.existing(this.stoveBody)
  }

  private createBody() {
    this.createWallBlock(-44, -183)
    this.createWallBlock(-10, -166)
    this.createWallBlock(25, -148)
    this.createWallBlock(63, -135)
    this.createWallBlock(98, -118)
    this.createWallBlock(132, -100)
    this.createWallBlock(166, -80)
    this.createWallBlock(200, -65)
    this.createWallBlock(240, -55)
    this.createWallBlock(210, -28)
    this.createWallBlock(195, 0, 10)
    this.createWallBlock(195, 20, 10)
    this.createWallBlock(195, 40, 10)

    this.createWallBlock(20, 50, 10)
    this.createWallBlock(38, 60, 10)
    this.createWallBlock(56, 70, 10)
    this.createWallBlock(75, 75, 10)
    this.createWallBlock(25, 75, 10)

    this.createWallBlock(-13, 60)
    this.createWallBlock(-25, 100)

    this.createWallBlock(-65, 100)
    this.createWallBlock(-105, 90)
    this.createWallBlock(-140, 70)
    this.createWallBlock(-175, 50)
    this.createWallBlock(-210, 30)
    this.createWallBlock(-245, 10)
    this.createWallBlock(-283, -5)
  }

  private createWallBlock(x: number, y: number, radius = 20) {
    const housePositionX = this.x
    const housePositionY = this.y

    const b1 = this.scene.add.circle(housePositionX + x, housePositionY + y)
    b1.setOrigin(0, 0)
    this.buildings.add(b1)
    const body = b1.body as Physics.Arcade.StaticBody
    body.setCircle(radius, radius)
  }
}
