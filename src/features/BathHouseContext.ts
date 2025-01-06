import { BathHouse } from '@entities'

export class BathHouseContext {
  private power = 0

  constructor(private bathHouseSprite: BathHouse) {}

  getSprite() {
    return this.bathHouseSprite
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
      this.bathHouseSprite.playStrong()
      return
    }

    if (this.power > 3) {
      this.bathHouseSprite.playMedium()
      return
    }

    if (this.power > 0) {
      this.bathHouseSprite.playWeak()
      return
    }

    this.bathHouseSprite.playSmolder()
  }
}
