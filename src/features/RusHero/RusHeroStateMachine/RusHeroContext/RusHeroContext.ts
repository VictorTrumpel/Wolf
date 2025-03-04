import { AxeHitbox, HeroHPBar, HeroWoodCounterText, IRusHeroState, RusHeroSprite } from '@entities'
import { DeadHeroState } from '../DeadHeroState'
import { HeroAttackState } from '../HeroAttackState'
import { IdleHeroState } from '../IdleHeroState'
import { MovingHeroState } from '../MovingHeroState'

export class RusHeroContext implements IRusHeroState {
  private woodGoodCount = 0
  private healthCount = 100

  private heroState: IRusHeroState

  private heroHpBar: HeroHPBar

  readonly attackHitbox: AxeHitbox

  readonly heroWoodCounter: HeroWoodCounterText

  onPushWoodsInStove: () => void = () => null
  onHeroDead: () => void = () => null

  constructor(private rusHeroSprite: RusHeroSprite) {
    this.heroState = new IdleHeroState(this)

    this.attackHitbox = new AxeHitbox(rusHeroSprite)

    this.heroWoodCounter = new HeroWoodCounterText(rusHeroSprite)

    this.heroHpBar = new HeroHPBar(rusHeroSprite, this.healthCount)

    this.matchAttackHitboxWithSpriteFrame()
  }

  addhealthCountCount(value: number) {
    this.healthCount += value
  }

  gethealthCountCount() {
    return this.healthCount
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

  getAttackHitbox() {
    return this.attackHitbox
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

  getDeadHeroState(): IRusHeroState {
    return new DeadHeroState(this)
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
  hurt(damage: number) {
    if (this.getState() instanceof DeadHeroState) return

    this.healthCount -= damage
    this.rusHeroSprite.playHurt()

    if (this.healthCount >= 0) return

    const deadHeroState = this.getDeadHeroState()
    this.setState(deadHeroState)
    this.onHeroDead()
  }
  getHurt(): void {
    this.heroState.getHurt()
  }
  pushWoodsInStove() {
    this.onPushWoodsInStove()
  }

  update() {
    this.rusHeroSprite.setDepth(this.rusHeroSprite.y)

    this.heroWoodCounter.setValue(this.woodGoodCount)
    this.heroWoodCounter.update()

    this.heroHpBar.setValue(this.healthCount)
    this.heroHpBar.update()
  }

  private matchAttackHitboxWithSpriteFrame() {
    this.rusHeroSprite.onFrameUpdate = (_, { frame }) => {
      const isAttack = frame.name === RusHeroSprite.ATTACK_FRAME
      if (!isAttack) return
      this.attackHitbox.squash()
    }
  }
}
