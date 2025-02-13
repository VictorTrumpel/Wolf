import { GameObjects } from 'phaser'
import { StaticSprite } from '@shared'
import { ITreeSprite } from '../interfaces/ITreeSprite'
import { ITreeState } from '../interfaces/ITreeState'

const IDLE_ANIMATION = 'FIR_IDLE_ANIMATION'

export class FirTree extends StaticSprite implements ITreeSprite {
  private context: ITreeState | null = null

  constructor(forest: GameObjects.Group, x: number, y: number) {
    super(forest.scene, x, y, 'firTreeAtlas', 'fir_15')

    forest.add(this)

    this.setScale(2)
    this.setOrigin(0.48, 0.92)

    this.createHitboxBody()
    this.createIdleAnimation()

    this.playIdle()
  }

  setContext(context: ITreeState) {
    this.context = context
  }

  getContext() {
    return this.context
  }

  playIdle() {
    this.play(IDLE_ANIMATION, true)
  }

  playHurt() {
    this.setTint(0xff0000)

    this.scene.time.delayedCall(500, () => {
      this.setTint(0xffffff)
    })
  }

  getHitboxBody() {
    return this.getBody()
  }

  private createHitboxBody() {
    const body = this.getHitboxBody()
    body.setSize(56, 40)
    body.setOffset(60.5, 55)
  }

  private createIdleAnimation() {
    const isAnimationExist = this.scene.anims.exists(IDLE_ANIMATION)

    if (isAnimationExist) return

    const frames = this.anims.generateFrameNames('firTreeAtlas', {
      prefix: 'fir_',
      start: 1,
      end: 15,
    })

    this.scene.anims.create({
      key: IDLE_ANIMATION,
      frames,
      frameRate: 10,
      repeatDelay: 1000,
      repeat: -1,
    })
  }
}
