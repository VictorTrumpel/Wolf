import { Physics, Scene } from 'phaser'
import { RusHeroContext, RusHeroKeyboardBinder, RusHeroKeyboardHandler } from '@features'
import { RusHeroSprite } from '@entities'
import { AttackHitbox } from '@shared'
import { Ork } from '../entities/Ork'

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
    this.createEnemiesGroup()

    const rusHeroSprite = new RusHeroSprite(this, 700, 200)
    rusHeroSprite.setDepth(100)
    this.rusHeroSprite = rusHeroSprite
    this.rusHeroContext = new RusHeroContext(this.rusHeroSprite)

    this.initKeyboardForHero(this.rusHeroContext)

    const attackHitbox = new AttackHitbox(this)

    if (this.enemiesGroup) {
      attackHitbox.addOverlapWith(this.enemiesGroup, (obj) => {
        const sprite = obj as Physics.Arcade.Sprite
        const creator = sprite.userInfo?.get('creator')
        if (creator instanceof Ork) {
          creator.hurt(50)
        }
      })
    }

    this.rusHeroSprite.onFrameUpdate = (_: unknown, { frame }) => {
      const attackFrames = new Set(['attack_2'])
      if (attackFrames.has(frame.name)) {
        const x = rusHeroSprite.flipX ? -38 : 38

        attackHitbox.enable(rusHeroSprite.x + x, rusHeroSprite.y - 5, 32)
      }
      attackHitbox.disable()
    }
  }

  createEnemiesGroup() {
    const enemiesGroup = this.physics.add.group({
      collideWorldBounds: true,
    })
    this.enemiesGroup = enemiesGroup

    setInterval(() => {
      if (this.countOfEnemies >= this.maxCountOfEnemies) return
      this.countOfEnemies += 1
      const ork: Ork | null = new Ork(this)
      ork.create(400, 350)
      enemiesGroup.add(ork.sprite.sprite)
      ork.onKill = () => {
        this.countOfEnemies -= 1
      }
    }, 3000)
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
