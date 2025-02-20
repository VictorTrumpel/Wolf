import { GameObjects } from 'phaser'
import { RusHeroSprite } from './RusHeroSprite'

const OFFSET_X = 25
const OFFSET_Y = -35

export class HeroWoodCounterText extends GameObjects.Text {
  private woodIcon: GameObjects.Image | null = null

  private value = 1

  constructor(private hero: RusHeroSprite) {
    super(hero.scene, hero.x, hero.y, `x${0}`, {
      fontSize: '12px',
      fontFamily: 'Arial',
      color: '0x000000',
    })

    this.woodIcon = this.scene.add.image(this.hero.x, this.hero.y, 'woodIcon')
    this.scene.add.existing(this)
  }

  setValue(value: number) {
    this.value = value
  }

  getValue() {
    return this.value
  }

  setVisible(value: boolean): this {
    super.setVisible(value)
    this.woodIcon?.setVisible(value)
    return this
  }

  setPosition(x?: number, y?: number, z?: number, w?: number) {
    super.setPosition(x, y, z, w)
    this.woodIcon?.setPosition(x, y, z, w)
    return this
  }

  setDepth(value: number): this {
    super.setDepth(value)
    this.woodIcon?.setDepth(this.hero.depth)
    return this
  }

  update() {
    this.text = `×${this.value}`
    this.setVisible(this.value === 0 ? false : true)

    const heroBody = this.hero.getBody()
    const positionX = heroBody.x + OFFSET_X
    const positionY = heroBody.y + OFFSET_Y

    this.setPosition(positionX, positionY)

    this.setDepth(this.hero.depth)
  }
}
