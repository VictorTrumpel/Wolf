import { Animations, Scene } from 'phaser'
import { PhysicsSprite } from '@shared'
import {
  ATTACK_ANIMATION,
  ATTACK_ANIMATION_DELAY_AFTER_COMPLETE,
  ATTACK_HITBOX_OFFSET_X,
  ATTACK_HITBOX_OFFSET_Y,
  HITBOX_HEIGHT,
  HITBOX_WIDTH,
  IDLE_ANIMATION,
  IDLE_HITBOX_OFFSET_X,
  IDLE_HITBOX_OFFSET_Y,
  RUN_ANIMATION,
} from './constants'

export class RusHeroSprite extends PhysicsSprite {
  static ATTACK_FRAME = 'attack_2'

  onFrameUpdate: (
    animation: Animations.Animation,
    animationframe: Animations.AnimationFrame
  ) => void = () => null

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'heroAtlas', 'idle_0')

    this.setScale(2)
    this.setOriginForIdle()

    this.setBodyShape()

    this.setHitboxForIdle()

    this.createIdleAnimation()
    this.createRunAnimation()
    this.createAttackAnimation()
  }

  playIdle() {
    this.play(IDLE_ANIMATION, true)
  }

  playRun() {
    this.play(RUN_ANIMATION, true)
  }

  playAttack() {
    this.setOriginForAttack()
    this.setHitboxForAttack()
    this.play(ATTACK_ANIMATION, true)

    this.on(Phaser.Animations.Events.ANIMATION_UPDATE, this.onFrameUpdate)

    return new Promise((complete) => {
      this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.off(Phaser.Animations.Events.ANIMATION_UPDATE)

        this.scene.time.delayedCall(ATTACK_ANIMATION_DELAY_AFTER_COMPLETE, () => {
          this.setOrigin(0.5, 1)
          this.setHitboxForIdle()
          this.playIdle()
          complete(null)
        })
      })
    })
  }

  moveX(speed: number) {
    const body = this.getBody()
    body.setVelocityX(speed)
  }

  moveY(speed: number) {
    const body = this.getBody()
    body.setVelocityY(speed)
  }

  stopMoveY() {
    const body = this.getBody()
    body.setVelocityY(0)
  }

  stopMoveX() {
    const body = this.getBody()
    body.setVelocityX(0)
  }

  stopMoving() {
    const body = this.getBody()
    body.setVelocity(0)
  }

  private setBodyShape() {
    const body = this.getBody()
    body.setSize(HITBOX_WIDTH, HITBOX_HEIGHT)
    body.setOffset(IDLE_HITBOX_OFFSET_X, IDLE_HITBOX_OFFSET_Y)
  }

  private setHitboxForIdle() {
    const body = this.getBody()
    body.setOffset(IDLE_HITBOX_OFFSET_X, IDLE_HITBOX_OFFSET_Y)
  }

  private setOriginForIdle() {
    this.setOrigin(0.5, 1)
  }

  private setOriginForAttack() {
    this.setOrigin(0.5, 0.765)
  }

  private setHitboxForAttack() {
    const body = this.getBody()
    body.setOffset(ATTACK_HITBOX_OFFSET_X, ATTACK_HITBOX_OFFSET_Y)
  }

  private createAttackAnimation() {
    const frames = this.anims.generateFrameNames('heroAtlas', {
      prefix: 'attack_',
      start: 1,
      end: 4,
    })

    this.anims.create({
      key: ATTACK_ANIMATION,
      frames,
      frameRate: 13,
      repeat: 0,
    })
  }

  private createIdleAnimation() {
    const frames = this.anims.generateFrameNames('heroAtlas', {
      prefix: 'idle_',
      start: 0,
    })

    this.anims.create({
      key: IDLE_ANIMATION,
      frames,
      frameRate: 10,
      repeat: -1,
    })
  }

  private createRunAnimation() {
    const frames = this.anims.generateFrameNames('heroAtlas', {
      prefix: 'walk_',
      start: 1,
      end: 7,
    })

    this.anims.create({
      key: RUN_ANIMATION,
      frames,
      frameRate: 10,
      repeat: -1,
    })
  }
}
