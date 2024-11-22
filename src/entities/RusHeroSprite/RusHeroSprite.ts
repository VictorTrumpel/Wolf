import { Scene } from 'phaser'
import { PhysicsSprite } from '../../shared/PhysicsSprite'
import {
  ATTACK_ANIMATION,
  ATTACK_ANIMATION_DURATION,
  ATTACK_HITBOX_OFFSET_X,
  ATTACK_HITBOX_OFFSET_Y,
  HITBOX_WIDTH,
  IDLE_ANIMATION,
  IDLE_HITBOX_OFFSET_X,
  IDLE_HITBOX_OFFSET_Y,
  RUN_ANIMATION,
} from './constants'

export class RusHeroSprite extends PhysicsSprite {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'heroAtlas', 'idle_0')

    this.setScale(2)

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
    return new Promise((resolve) => {
      this.play(ATTACK_ANIMATION, true)
      this.setHitboxForAttack()

      setTimeout(() => {
        this.playIdle()
        this.setHitboxForIdle()
        resolve(null)
      }, ATTACK_ANIMATION_DURATION)
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

  private setHitboxForIdle() {
    const body = this.getBody()
    body.setCircle(HITBOX_WIDTH, IDLE_HITBOX_OFFSET_X, IDLE_HITBOX_OFFSET_Y)
  }

  private setHitboxForAttack() {
    const body = this.getBody()
    body.setCircle(HITBOX_WIDTH, ATTACK_HITBOX_OFFSET_X, ATTACK_HITBOX_OFFSET_Y)
  }

  private createAttackAnimation() {
    const frames = this.anims.generateFrameNames('heroAtlas', {
      prefix: 'attack_',
      start: 0,
      end: 3,
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
