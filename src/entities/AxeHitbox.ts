import { AttackHitbox } from '@shared'
import { RusHeroSprite } from './RusHeroSprite'
import { WoodChips } from './WoodChips'

export class AxeHitbox extends AttackHitbox {
  constructor(private rusHeroSprite: RusHeroSprite) {
    super(rusHeroSprite.scene)
  }

  async playWoodChips() {
    const scene = this.rusHeroSprite.scene

    const offsetX = this.rusHeroSprite.flipX ? -50 : 50

    if (this.x === undefined || this.y === undefined) return

    const woodChips = new WoodChips(scene, this.x + offsetX, this.y)

    woodChips.flipX = this.rusHeroSprite.flipX

    woodChips.setDepth(this.rusHeroSprite.depth)

    await woodChips.playFly()

    woodChips.destroy()
  }
}
