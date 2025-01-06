import { AxeHitbox, HeroWoodCounterText, IRusHeroState, RusHeroSprite } from '@entities'
import { HeroAttackState } from '../HeroAttackState'
import { IdleHeroState } from '../IdleHeroState'
import { MovingHeroState } from '../MovingHeroState'

export class RusHeroContext implements IRusHeroState {
  private woodGoodCount = 0

  private heroState: IRusHeroState

  readonly attackHitbox: AxeHitbox

  readonly heroWoodCounter: HeroWoodCounterText

  onPushWoodsInStove: () => void = () => null

  constructor(private rusHeroSprite: RusHeroSprite) {
    this.heroState = new IdleHeroState(this)

    this.attackHitbox = new AxeHitbox(rusHeroSprite)

    this.heroWoodCounter = new HeroWoodCounterText(rusHeroSprite)
  }

  getWoodGoodCount() {
    return this.woodGoodCount
  }

  addWoodGoodCount(value = 1) {
    this.woodGoodCount += value
  }

  setState(state: IRusHeroState) {
    this.heroState = state
  }

  getState() {
    return this.heroState
  }

  getSprite() {
    return this.rusHeroSprite
  }

  getMovingHeroState(): IRusHeroState {
    return new MovingHeroState(this)
  }

  getIdleHeroState(): IRusHeroState {
    return new IdleHeroState(this)
  }

  getHeroAttackState(): IRusHeroState {
    return new HeroAttackState(this)
  }

  moveBottom(): void {
    this.heroState.moveBottom()
  }
  moveTop(): void {
    this.heroState.moveTop()
  }
  moveLeft(): void {
    this.heroState.moveLeft()
  }
  moveRight(): void {
    this.heroState.moveRight()
  }
  stopMoving(): void {
    this.heroState.stopMoving()
  }
  stopMovingX(): void {
    this.heroState.stopMovingX()
  }
  stopMovingY(): void {
    this.heroState.stopMovingY()
  }
  async attack() {
    return await this.heroState.attack()
  }
  getHurt(): void {
    this.heroState.getHurt()
  }
  pushWoodsInStove() {
    if (this.heroState instanceof IdleHeroState) {
      this.onPushWoodsInStove()
    }
  }

  update() {
    this.heroWoodCounter.setValue(this.woodGoodCount)
    this.heroWoodCounter.update()
  }
}
