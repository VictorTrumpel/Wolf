import { GameObjects } from 'phaser'
import { RusHeroSprite } from './RusHeroSprite'

const HP_BAR_WIDTH = 50
const HP_BAR_HEIGHT = 10

const HP_BAR_OFFSET_X = -2
const HP_BAR_OFFSET_Y = 51

const OUTLINE_BAR_OFFSET_X = -3
const OUTLINE_BAR_OFFSET_Y = 45

const BASE_HP_VALUE = 100

export class HeroHPBar extends GameObjects.Rectangle {
  private heroSprite: RusHeroSprite

  private value: number

  private outline: GameObjects.Graphics

  private container: GameObjects.Container | null = null

  constructor(heroSprite: RusHeroSprite, hpBaseValue = BASE_HP_VALUE) {
    super(
      heroSprite.scene,
      heroSprite.x + HP_BAR_OFFSET_X,
      heroSprite.y + HP_BAR_OFFSET_Y,
      HP_BAR_WIDTH,
      HP_BAR_HEIGHT,
      0xad2828
    )

    this.outline = heroSprite.scene.add.graphics()

    this.value = hpBaseValue

    this.heroSprite = heroSprite

    this.scene.add.existing(this)

    this.setOrigin(0, 0.5)

    this.createOutline()
  }

  setValue(value: number) {
    this.value = value
    if (this.value <= 0) {
      this.value = 0
      return
    }
    this.updateWidth()
  }

  getValue() {
    return this.value
  }

  update() {
    const heroBody = this.heroSprite.getBody()
    const positionX = heroBody.x + HP_BAR_OFFSET_X
    const positionY = heroBody.y + HP_BAR_OFFSET_Y

    const outlinePositionX = heroBody.x + OUTLINE_BAR_OFFSET_X
    const outlinePositionY = heroBody.y + OUTLINE_BAR_OFFSET_Y

    this.container?.setX(outlinePositionX)
    this.container?.setY(outlinePositionY)

    this.setPosition(positionX, positionY)
  }

  private updateWidth() {
    this.width = (HP_BAR_WIDTH / BASE_HP_VALUE) * this.value
  }

  private createOutline() {
    this.container = this.scene.add.container(0, 0)

    this.outline.lineStyle(2, 0x000000, 1)
    this.outline.fillStyle(0x000000, 0)
    this.outline.strokeRect(0, 0, HP_BAR_WIDTH + 2, HP_BAR_HEIGHT + 2)

    this.container.add(this.outline)
  }
}
