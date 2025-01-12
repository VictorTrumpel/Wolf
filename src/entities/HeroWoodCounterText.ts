import { GameObjects } from 'phaser'
import { RusHeroSprite } from './RusHeroSprite'

export class HeroWoodCounterText extends GameObjects.Text {
  private woodIcon: GameObjects.Image | null = null

  private value = 1

  static OFFSET_TEXT_Y = -45

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

  update() {
    this.text = `×${this.value}`
    this.setVisible(this.value === 0 ? false : true)
    this.setPosition(
      this.hero.x,
      this.hero.y - this.hero.getBody().height + HeroWoodCounterText.OFFSET_TEXT_Y
    )
    this.woodIcon?.setDepth(this.hero.depth)
    this.setDepth(this.hero.depth)
  }
}
