import { GameObjects } from 'phaser'
import { StaticSprite } from '@shared'
import { ITreeSprite } from '../interfaces/ITreeSprite'
import { ITreeState } from '../interfaces/ITreeState'

const IDLE_ANIMATION = 'FIR_IDLE_ANIMATION'
const DEAD_ANIMATION = 'FIR_DEAD_ANIMATION'

export class FirTree extends StaticSprite implements ITreeSprite {
  private context: ITreeState | null = null

  readonly BODY_BOTTOM_OFFSET = 100

  constructor(forest: GameObjects.Group, x: number, y: number) {
    super(forest.scene, x, y, 'firTreeAtlas', 'fir_15')

    forest.add(this)

    this.setScale(2)
    this.setOrigin(0.5, 1)

    const c = this.scene.add.circle(this.x, this.y - this.BODY_BOTTOM_OFFSET, 4, 0xe35849)
    c.depth = 5000

    this.createHitboxBody()
    this.createIdleAnimation()
    this.createDeadAnimation()

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

  playDead() {
    this.setTint(0xffffff)
    this.setTexture('deadTreeAtlas')
    this.play(DEAD_ANIMATION, true)
    this.setScale(1.5)
    this.emit('becomeDead')
  }

  playHurt() {
    this.setTint(0xff0000)

    this.scene.time.delayedCall(500, () => {
      this.setTint(0xffffff)
    })
  }

  moveTo(sprite: GameObjects.Sprite) {
    this.moveTo(sprite)
  }

  getHitboxBody() {
    return this.getBody()
  }

  private createHitboxBody() {
    const body = this.getHitboxBody()
    body.setSize(56, 40)
    body.setOffset(52.5, 25)
  }

  private createDeadAnimation() {
    const frames = this.anims.generateFrameNames('deadTreeAtlas', {
      prefix: 'dead_',
      start: 1,
      end: 8,
    })

    this.scene.anims.create({
      key: DEAD_ANIMATION,
      frames,
      frameRate: 10,
      repeatDelay: 1000,
      repeat: -1,
    })
  }

  private createIdleAnimation() {
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
