import { Scene } from 'phaser'
import { FireSprite } from '@entities'
import { MainFireContext } from '../MainFireContext'

export class FireSceneMounter {
  private fireSprite: FireSprite
  private fireSpriteContext: MainFireContext

  constructor(scene: Scene) {
    this.fireSprite = new FireSprite(scene, 1000, 1000)
    this.fireSpriteContext = new MainFireContext(this.fireSprite)
  }

  getFireContext() {
    return this.fireSpriteContext
  }
}
