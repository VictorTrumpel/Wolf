import { FireSprite } from '@entities'

export class MainFireContext {
  private power = 8

  constructor(private fireSprite: FireSprite) {}

  getSprite() {
    return this.fireSprite
  }

  addPower(woodCount: number) {
    this.power += woodCount
  }

  update() {
    this.power -= 0.001

    if (this.power < 0) {
      this.power = 0
    }

    if (this.power > 5) {
      this.fireSprite.playLargeFire()
      return
    }

    if (this.power > 3) {
      this.fireSprite.playMediumFire()
      return
    }

    if (this.power > 0) {
      this.fireSprite.playSmallFire()
    }
  }
}
