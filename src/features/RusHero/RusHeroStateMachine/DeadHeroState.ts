import { IRusHeroState } from '@entities'
import { RusHeroContext } from './RusHeroContext'

export class DeadHeroState implements IRusHeroState {
  constructor(private rusHeroContext: RusHeroContext) {
    this.rusHeroContext.stopMoving()
  }

  moveBottom(): void {}
  moveTop(): void {}
  moveLeft(): void {}
  moveRight(): void {}
  stopMoving(): void {}
  stopMovingX(): void {}
  stopMovingY(): void {}
  async attack() {}
  pushWoodsInStove() {}
  getHurt() {}
}
