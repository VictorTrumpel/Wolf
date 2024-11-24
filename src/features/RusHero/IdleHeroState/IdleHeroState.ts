import { IRusHeroState } from '@entities'
import { RusHeroContext } from '../RusHeroContext'

export class IdleHeroState implements IRusHeroState {
  constructor(private rusHeroContext: RusHeroContext) {}

  moveTop(): void {
    const movingHeroState = this.rusHeroContext.getMovingHeroState()
    movingHeroState.moveTop()
    this.rusHeroContext.setState(movingHeroState)
  }

  moveBottom(): void {
    const movingHeroState = this.rusHeroContext.getMovingHeroState()
    movingHeroState.moveBottom()
    this.rusHeroContext.setState(movingHeroState)
  }

  moveLeft(): void {
    const movingHeroState = this.rusHeroContext.getMovingHeroState()
    movingHeroState.moveLeft()
    this.rusHeroContext.setState(movingHeroState)
  }

  moveRight(): void {
    const movingHeroState = this.rusHeroContext.getMovingHeroState()
    movingHeroState.moveRight()
    this.rusHeroContext.setState(movingHeroState)
  }

  stopMoving(): void {
    const sprite = this.rusHeroContext.getSprite()
    sprite.stopMoving()
    sprite.playIdle()
  }

  stopMovingX(): void {
    const sprite = this.rusHeroContext.getSprite()
    sprite.stopMoveX()
  }

  stopMovingY(): void {
    const sprite = this.rusHeroContext.getSprite()
    sprite.stopMoveY()
  }

  async attack() {
    const attackHeroState = this.rusHeroContext.getHeroAttackState()
    this.rusHeroContext.setState(attackHeroState)
    await attackHeroState.attack()
  }

  getHurt(): void {}
}
