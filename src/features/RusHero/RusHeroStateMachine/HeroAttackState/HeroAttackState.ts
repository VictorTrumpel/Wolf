import { IRusHeroState } from '@entities'
import { RusHeroContext } from '../RusHeroContext'

export class HeroAttackState implements IRusHeroState {
  private isInAttack = false

  constructor(private rusHeroContext: RusHeroContext) {}

  moveTop(): void {}

  moveBottom(): void {}

  moveLeft(): void {}

  moveRight(): void {}

  stopMoving(): void {}

  stopMovingX(): void {}

  stopMovingY(): void {}

  async attack(): Promise<void> {
    if (this.isInAttack) return

    const sprite = this.rusHeroContext.getSprite()

    this.isInAttack = true
    await sprite.playAttack()
    this.isInAttack = false

    const idleHeroState = this.rusHeroContext.getIdleHeroState()
    idleHeroState.stopMoving()

    this.rusHeroContext.setState(idleHeroState)
  }

  getHurt(): void {}

  pushWoodsInStove() {}
}
