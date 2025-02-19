import { Scene } from 'phaser'
import { FireSprite } from '@entities'
import { MainFireContext } from '../MainFireContext'

export class FireSceneMounter {
  private fireSprite: FireSprite
  private fireSpriteContext: MainFireContext

  constructor(private scene: Scene) {
    this.fireSprite = new FireSprite(scene, 1000, 1000)
    this.fireSpriteContext = new MainFireContext(this.fireSprite)

    this.create()
  }

  getFireContext() {
    return this.fireSpriteContext
  }

  private create() {
    this.scene.events.on('update', this.udpdate.bind(this))
  }

  private udpdate() {
    this.fireSpriteContext.update()
  }
}
