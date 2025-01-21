import { Scene } from 'phaser'
import { RusHeroContext, RusHeroKeyboardBinder, RusHeroKeyboardHandler } from '@features'
import { RusHeroSprite } from '@entities'

type Keyboard = ReturnType<RusHeroKeyboardBinder['getKeyboard']>

export class BanyaScene extends Scene {
  private rusHeroContext: RusHeroContext | null = null
  private keyboard: Keyboard | null = null

  constructor() {
    super('BanyaScene')
  }

  handleHeroAttackFrame = () => {
    if (!this.rusHeroContext) return
    this.rusHeroContext.attackHitbox.squash()
  }

  handleLeaveBanya = () => {
    this.scene.start('GameScene')
  }

  create() {
    this.add.image(0, 0, 'banyaInside').setOrigin(0, 0)

    this.add.image(300, 200, 'door').setScale(3)
    this.add.image(500, 150, 'ladder').setScale(3)

    this.add.image(100, 100, 'window').setScale(3)
    this.add.image(700, 100, 'window').setScale(3)

    this.initHero()
    this.initKeyboardForHero(this.rusHeroContext)
    this.initCollisions()
  }

  initHero() {
    const rusHeroSprite = new RusHeroSprite(this, 1100, 450)

    this.rusHeroContext = new RusHeroContext(rusHeroSprite)
  }

  initKeyboardForHero(heroContext: RusHeroContext | null) {
    if (!heroContext) return

    const keyboardPlugin = this.input.keyboard
    const hero = heroContext

    if (!keyboardPlugin) return

    const keyboardHandler = new RusHeroKeyboardHandler(keyboardPlugin)

    const keyboardBinder = new RusHeroKeyboardBinder(hero, keyboardHandler)

    this.keyboard = keyboardBinder.getKeyboard()
  }

  initCollisions() {
    if (!this.rusHeroContext) return

    const heroSprite = this.rusHeroContext.getSprite()
    const doorBody = this.physics.add.body(1250, 400)

    this.physics.add.overlap(heroSprite, doorBody, this.handleLeaveBanya)
  }

  update(): void {
    this.keyboard?.executeKeyCommands()
    this.rusHeroContext?.update()
  }
}
