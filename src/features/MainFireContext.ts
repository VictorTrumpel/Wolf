import { FireSprite } from '@entities'

export class MainFireContext {
  private health = 100

  constructor(private fireSprite: FireSprite) {
    fireSprite.playLargeFire()
  }

  getSprite() {
    return this.fireSprite
  }

  getHealth() {
    return this.health
  }

  addWoodForHealth(woodCount: number) {
    const addedHp = woodCount * 10

    this.health += addedHp

    this.updateHealthAnimation()
  }

  hurt(hp: number) {
    this.health -= hp

    if (this.health <= 0) {
      this.health = 0
    }

    this.updateHealthAnimation()
  }

  updateHealthAnimation() {
    if (this.health >= 70) {
      this.fireSprite.playLargeFire()
      return
    }

    if (this.health >= 30) {
      this.fireSprite.playMediumFire()
      return
    }

    this.fireSprite.playSmallFire()
  }
}
