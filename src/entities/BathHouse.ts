import { GameObjects, Physics } from 'phaser'
import { StaticSprite } from '@shared'

const SMOLDER_ANIMATION = 'SMOLDER_ANIMATION'
const WEAK_ANIMATION = 'WEAK_ANIMATION'
const MEDIUM_ANIMATION = 'MEDIUM_ANIMATION'
const STRONG_ANIMATION = 'STRONG_ANIMATION'

export class BathHouse extends StaticSprite {
  private stoveBody!: Phaser.Physics.Arcade.Body
  private doorBody!: Phaser.Physics.Arcade.Body

  constructor(
    private buildings: GameObjects.Group,
    x: number,
    y: number
  ) {
    super(buildings.scene, x, y, 'bathHouseAtlas', 'smalder_1')

    buildings.add(this)

    this.getBody().setSize(10, 10)

    this.setScale(2)

    this.createStoveBody()
    this.createDoorBody()

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

  getDoorBody() {
    return this.doorBody
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

  private createDoorBody() {
    const housePositionX = this.x
    const housePositionY = this.y

    this.doorBody = this.scene.physics.add.body(housePositionX + 110, housePositionY + 50, 90, 80)
  }

  private createStoveBody() {
    const housePositionX = this.x
    const housePositionY = this.y

    this.stoveBody = this.scene.physics.add
      .body(housePositionX - 140, housePositionY + 110)
      .setCircle(50)
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
