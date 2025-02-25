import { Scene } from 'phaser'
import { RusHeroSprite } from '@entities'
import { RusHeroContext } from '../RusHero/RusHeroStateMachine'

export class HeroSceneMounter {
  private rusHeroSprite: RusHeroSprite
  private rusHeroContext: RusHeroContext

  constructor(private scene: Scene) {
    this.rusHeroSprite = new RusHeroSprite(this.scene, 1000, 1080)
    this.rusHeroContext = new RusHeroContext(this.rusHeroSprite)

    this.create()
  }

  getHeroContext() {
    return this.rusHeroContext
  }

  private create() {
    this.scene.cameras.main.startFollow(this.rusHeroSprite)

    this.rusHeroContext.onPushWoodsInStove = () => {
      this.scene.events.emit('PushWoodsInStove')
    }

    this.rusHeroContext.onHeroDead = () => {
      this.scene.events.emit('HeroDead')
    }

    this.scene.events.on('update', this.update.bind(this))
  }

  private update() {
    this.rusHeroContext.update()
  }
}
