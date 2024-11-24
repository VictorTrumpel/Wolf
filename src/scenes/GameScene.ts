import { Scene } from 'phaser'
import { RusHeroContext, RusHeroKeyboardBinder, RusHeroKeyboardHandler } from '@features'
import { RusHeroSprite } from '@entities'
import { AttackHitbox } from '@shared'

type Keyboard = ReturnType<RusHeroKeyboardBinder['getKeyboard']>

export class GameScene extends Scene {
  private rusHeroContext: RusHeroContext | null = null
  private keyboard: Keyboard | null = null

  constructor() {
    super('GameScene')
  }

  create() {
    this.createCastle()

    const box = this.add.rectangle(800, 200, 64, 64, 0xfff)
    this.physics.add.existing(box)

    const boxHert = () => {
      box.fillColor = 0xa8324e
      setTimeout(() => {
        box.fillColor = 0xfff
      }, 300)
    }

    const rusHeroSprite = new RusHeroSprite(this, 700, 200)
    this.rusHeroContext = new RusHeroContext(rusHeroSprite)

    this.initKeyboardForHero(this.rusHeroContext)

    const attackHitbox = new AttackHitbox(this)

    attackHitbox.addOverlapWith(box, () => {
      console.log('Attack')
      boxHert()
    })

    rusHeroSprite.onFrameUpdate = (_: unknown, { frame }) => {
      const attackFrames = new Set(['attack_2'])
      if (attackFrames.has(frame.name)) {
        const x = rusHeroSprite.flipX ? -38 : 38

        attackHitbox.enable(rusHeroSprite.x + x, rusHeroSprite.y - 5, 32)
      }
      attackHitbox.disable()
    }

    this.physics.add.collider(rusHeroSprite, box)
  }

  createCastle() {
    const staticBody = this.physics.add.staticImage(200, 190, 'castle')
    staticBody.flipX = true
    staticBody.setCircle(225)
    staticBody.setPushable(false)
    staticBody.setDepth(-1)
  }

  initKeyboardForHero(heroContext: RusHeroContext) {
    const keyboardPlugin = this.input.keyboard
    const hero = heroContext

    if (!keyboardPlugin) return

    const keyboardHandler = new RusHeroKeyboardHandler(keyboardPlugin)

    const keyboardBinder = new RusHeroKeyboardBinder(hero, keyboardHandler)

    this.keyboard = keyboardBinder.getKeyboard()
  }

  update(): void {
    this.keyboard?.executeKeyCommands()
  }
}
