import { GameObjects } from 'phaser'
import { RusHeroSprite } from './RusHeroSprite'

const HP_BAR_WIDTH = 50
const HP_BAR_HEIGHT = 10

const HP_BAR_OFFSET_X = -2
const HP_BAR_OFFSET_Y = 51

const BASE_HP_VALUE = 100

export class HeroHPBar extends GameObjects.Rectangle {
  private heroSprite: RusHeroSprite

  private value = BASE_HP_VALUE

  constructor(heroSprite: RusHeroSprite) {
    super(
      heroSprite.scene,
      heroSprite.x + HP_BAR_OFFSET_X,
      heroSprite.y + HP_BAR_OFFSET_Y,
      HP_BAR_WIDTH,
      HP_BAR_HEIGHT,
      0xad2828
    )

    this.heroSprite = heroSprite

    this.scene.add.existing(this)

    this.setOrigin(0, 0.5)
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

    this.setPosition(positionX, positionY)
    this.setDepth(this.heroSprite.depth)
  }

  private updateWidth() {
    this.width = (HP_BAR_WIDTH / BASE_HP_VALUE) * this.value
  }
}
