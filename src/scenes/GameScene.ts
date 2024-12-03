import { GameObjects, Scene } from 'phaser'
import {
  ForestGroup,
  RusHeroContext,
  RusHeroKeyboardBinder,
  RusHeroKeyboardHandler,
} from '@features'
import { FirTree, RusHeroSprite } from '@entities'
import { AttackHitbox } from '@shared'

type Keyboard = ReturnType<RusHeroKeyboardBinder['getKeyboard']>

export class GameScene extends Scene {
  private rusHeroSprite: RusHeroSprite | null = null
  private rusHeroContext: RusHeroContext | null = null
  private keyboard: Keyboard | null = null
  private forest: ForestGroup | null = null

  private _debugPoint: GameObjects.Arc | null = null

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

    this._debugPoint = this.add.circle(0, 0, 4, 0xe35349)

    this.initKeyboardForHero(this.rusHeroContext)

    this.forest = new ForestGroup(this.physics.world, this)
    const forestGroup = this.forest

    forestGroup.setForestAreaPosition(870, 0)
    forestGroup.setForestAreaSize(400, 719)

    forestGroup.addFirTree(50, 250)
    forestGroup.addFirTree(150, 450)
    forestGroup.addFirTree(100, 650)

    const attackHitbox = new AttackHitbox(this)

    this.rusHeroSprite.onFrameUpdate = (_: unknown, { frame }) => {
      const attackFrames = new Set(['attack_2'])
      if (attackFrames.has(frame.name)) {
        const x = rusHeroSprite.flipX ? -30 : 30

        attackHitbox.enable(rusHeroSprite.x + x, rusHeroSprite.y - 5, 32)
      }
      attackHitbox.disable()
    }

    attackHitbox.addOverlapWith(forestGroup, (tree) => {
      if (tree instanceof FirTree) {
        const treeContext = tree.getContext()
        treeContext?.hurt(20)
      }
    })

    forestGroup.addTransparentForObject(rusHeroSprite, (treeSprite) => {
      if (treeSprite instanceof FirTree) {
        const isTreeOverHero = treeSprite.y - treeSprite.BODY_BOTTOM_OFFSET > rusHeroSprite.y
        return isTreeOverHero
      }
      return false
    })

    this.physics.add.collider(rusHeroSprite, forestGroup)
    this.physics.add.overlap(rusHeroSprite, forestGroup.deadTreeGroup, () => {
      console.log('pick tree')
    })
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

    if (this._debugPoint && this.rusHeroSprite) {
      this._debugPoint.x = this.rusHeroSprite.x
      this._debugPoint.y = this.rusHeroSprite.y
      this._debugPoint.setDepth(this.rusHeroSprite.depth + 1)
    }
  }
}
