import { Scene } from 'phaser'
import {
  ForestGroup,
  RusHeroContext,
  RusHeroKeyboardBinder,
  RusHeroKeyboardHandler,
} from '@features'
import { RusHeroSprite } from '@entities'
import { AttackHitbox } from '@shared'

type Keyboard = ReturnType<RusHeroKeyboardBinder['getKeyboard']>

export class GameScene extends Scene {
  private rusHeroSprite: RusHeroSprite | null = null
  private rusHeroContext: RusHeroContext | null = null
  private keyboard: Keyboard | null = null
  private forest: ForestGroup | null = null

  countOfEnemies = 0
  maxCountOfEnemies = 10

  constructor() {
    super('GameScene')
  }

  create() {
    this.createCastle()

    const rusHeroSprite = new RusHeroSprite(this, 700, 200)
    this.rusHeroSprite = rusHeroSprite
    this.rusHeroContext = new RusHeroContext(this.rusHeroSprite)

    this.initKeyboardForHero(this.rusHeroContext)

    const attackHitbox = new AttackHitbox(this)

    this.rusHeroSprite.onFrameUpdate = (_: unknown, { frame }) => {
      const attackFrames = new Set(['attack_2'])
      if (attackFrames.has(frame.name)) {
        const x = rusHeroSprite.flipX ? -30 : 30

        attackHitbox.enable(rusHeroSprite.x + x, rusHeroSprite.y - 5, 32)
      }
      attackHitbox.disable()
    }

    const forestGroup = ForestGroup.create(this)
    this.forest = forestGroup
    forestGroup.setForestAreaPosition(870, 0)
    forestGroup.setForesAreaSize(400, 719)

    forestGroup.addTree(50, 200)
    forestGroup.addTree(250, 300)
    forestGroup.addTree(150, 400)
    forestGroup.addTree(300, 500)
    forestGroup.addTree(100, 600)

    forestGroup.addTransparentForObject(rusHeroSprite, (treeYCord) => {
      const isTreeOverHero = treeYCord - rusHeroSprite.height - 58 > rusHeroSprite.y
      return isTreeOverHero
    })

    this.physics.add.collider(rusHeroSprite, forestGroup.group)
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
    this.forest?.update()
  }
}
