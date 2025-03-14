import { Scene } from 'phaser'
import { Characteristics } from '../shared/Characteristics'
import { Sprite } from './../shared/Sprite'
import { HealthBar } from './HealthBar'
import { RedSword } from './RedSword'

export class Wolf {
  sprite: Sprite
  characteristics: Characteristics
  redSword: RedSword

  private health = 100

  healthBar: HealthBar

  attackReloadTimer: number | null = null

  onKill: (() => void) | null = null

  defaultTint = 0

  constructor(scene: Scene) {
    this.sprite = new Sprite(scene)
    this.redSword = new RedSword(scene)
    this.characteristics = new Characteristics({
      rapidFire: 500,
      speed: 150,
      hp: 100,
    })
    this.healthBar = new HealthBar(scene, {
      x: 0,
      y: 0,
      color: 0xf55742,
    })
  }

  create(x: number, y: number) {
    this.sprite.create(x, y, 'wolf')
    this.sprite.setScale(2)
    this.redSword.create()
    this.healthBar.create()
    this.sprite.sprite.userInfo = new Map([['creator', this]])
    this.defaultTint = this.sprite.sprite.tint
  }

  updateWeaponPosition() {
    const wolfPositionX = this.sprite.sprite.x
    const wolfPositionY = this.sprite.sprite.y
    const wolfFlipX = this.sprite.sprite.flipX

    const offset = wolfFlipX ? -79 : 79

    this.redSword.sprite.sprite.setX(wolfPositionX + offset)
    this.redSword.sprite.sprite.setY(wolfPositionY)
    this.redSword.sprite.sprite.flipX = wolfFlipX
  }

  updateHealthBarPosition() {
    const wolfPositionX = this.sprite.sprite.x
    const wolfPositionY = this.sprite.sprite.y

    const healthBarOffset = 38

    this.healthBar.moveTo(wolfPositionX, wolfPositionY + healthBarOffset)
  }

  isReadyToAttack() {
    return this.attackReloadTimer == null
  }

  hurt(hp: number) {
    this.health -= hp

    if (this.health <= 0) {
      this.sprite.sprite.destroy()
      this.redSword.setActive(false)
      this.onKill?.()
    }

    this.healthBar.change(this.health / 100)

    this.playHurtAnimation()
  }

  attack() {
    if (!this.sprite.sprite.active) return

    if (this.attackReloadTimer !== null) {
      clearTimeout(this.attackReloadTimer as number)
    }

    this.redSword.attack()

    this.attackReloadTimer = setTimeout(() => {
      this.attackReloadTimer = null
    }, this.characteristics.rapidFire) as unknown as number
  }

  update() {
    this.updateWeaponPosition()
    this.updateHealthBarPosition()
  }

  private playHurtAnimation() {
    this.sprite.sprite.setTint(0xff0000)

    setTimeout(() => {
      this.sprite.sprite.setTint(this.defaultTint)
    }, 100)
  }
}
