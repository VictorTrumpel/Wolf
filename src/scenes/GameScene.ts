import { Physics, Scene } from 'phaser'
import { RusHeroContext, RusHeroKeyboardBinder, RusHeroKeyboardHandler } from '@features'
import { RusHeroSprite } from '@entities'
import { AttackHitbox } from '@shared'

type Keyboard = ReturnType<RusHeroKeyboardBinder['getKeyboard']>

export class GameScene extends Scene {
  private rusHeroSprite: RusHeroSprite | null = null
  private rusHeroContext: RusHeroContext | null = null
  private keyboard: Keyboard | null = null

  private enemiesGroup: Physics.Arcade.Group | null = null

  countOfEnemies = 0
  maxCountOfEnemies = 10

  constructor() {
    super('GameScene')
  }

  create() {
    this.createCastle()

    const rusHeroSprite = new RusHeroSprite(this, 700, 200)
    rusHeroSprite.setDepth(100)
    this.rusHeroSprite = rusHeroSprite
    this.rusHeroContext = new RusHeroContext(this.rusHeroSprite)

    this.initKeyboardForHero(this.rusHeroContext)

    const attackHitbox = new AttackHitbox(this)

    this.rusHeroSprite.onFrameUpdate = (_: unknown, { frame }) => {
      const attackFrames = new Set(['attack_2'])
      if (attackFrames.has(frame.name)) {
        const x = rusHeroSprite.flipX ? -38 : 38

        attackHitbox.enable(rusHeroSprite.x + x, rusHeroSprite.y - 5, 32)
      }
      attackHitbox.disable()
    }
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

    this.enemiesGroup?.children.each((ch) => {
      ;(ch as Physics.Arcade.Sprite).setVelocity(0)
      return true
    })
    if (this.rusHeroSprite?.active) {
      this.enemiesGroup?.children.each((ch) => {
        if (!this.rusHeroSprite) return true
        this.physics.moveToObject(ch, this.rusHeroSprite, 50)
        return true
      })
    }
  }
}
