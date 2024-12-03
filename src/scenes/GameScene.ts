import { GameObjects, Scene } from 'phaser'
import {
  ForestGroup,
  RusHeroContext,
  RusHeroKeyboardBinder,
  RusHeroKeyboardHandler,
} from '@features'
import { DeadTreeGood, FirTree, RusHeroSprite } from '@entities'

type Keyboard = ReturnType<RusHeroKeyboardBinder['getKeyboard']>
type GameObject =
  | Phaser.Types.Physics.Arcade.GameObjectWithBody
  | Phaser.Physics.Arcade.Body
  | Phaser.Tilemaps.Tile

export class GameScene extends Scene {
  private rusHeroContext: RusHeroContext | null = null
  private keyboard: Keyboard | null = null
  private forest: ForestGroup | null = null

  constructor() {
    super('GameScene')
  }

  handleHeroAttackFrame = () => {
    if (!this.rusHeroContext) return
    const heroSprite = this.rusHeroContext.getSprite()
    const attackHitbox = this.rusHeroContext.attackHitbox
    const x = heroSprite.flipX ? -30 : 30
    attackHitbox.enable(heroSprite.x + x, heroSprite.y - 5, 32)
    this.time.delayedCall(1, () => attackHitbox.disable())
  }

  handleAttackTree = (tree: GameObjects.GameObject) => {
    const isFirTree = tree instanceof FirTree
    if (!isFirTree) return
    const treeContext = tree.getContext()
    treeContext?.hurt(20)
  }

  handleHeroPickTreeGood = (_: GameObject, treeGood: GameObject) => {
    const isTreeGood = treeGood instanceof DeadTreeGood
    if (!isTreeGood || !this.forest) return
    this.forest.removeTreeFromDeadGroup(treeGood)
    treeGood.destroy()
  }

  create() {
    this.initHero()
    this.initForest()
    this.initializeForestTransparency()
    this.initCollisions()
  }

  initHero() {
    const rusHeroSprite = new RusHeroSprite(this, 700, 200)

    this.rusHeroContext = new RusHeroContext(rusHeroSprite)

    rusHeroSprite.onFrameUpdate = (_: unknown, { frame }) => {
      const isAttack = frame.name === 'attack_2'
      if (!isAttack) return
      this.handleHeroAttackFrame()
    }

    this.initKeyboardForHero(this.rusHeroContext)
  }

  initForest() {
    this.forest = new ForestGroup(this.physics.world, this)
    const forestGroup = this.forest

    forestGroup.setForestAreaPosition(870, 0)
    forestGroup.setForestAreaSize(400, 719)

    forestGroup.addFirTree(50, 250)
    forestGroup.addFirTree(150, 450)
    forestGroup.addFirTree(100, 650)
  }

  initCollisions() {
    if (!this.rusHeroContext || !this.forest) return

    const rusHeroSprite = this.rusHeroContext.getSprite()
    const attackHitbox = this.rusHeroContext.attackHitbox
    const forestGroup = this.forest
    const deadForesGroup = forestGroup.deadTreeGroup

    this.physics.add.collider(rusHeroSprite, forestGroup)
    this.physics.add.overlap(rusHeroSprite, deadForesGroup, this.handleHeroPickTreeGood)
    attackHitbox.addOverlapWith(forestGroup, this.handleAttackTree)
  }

  initKeyboardForHero(heroContext: RusHeroContext) {
    const keyboardPlugin = this.input.keyboard
    const hero = heroContext

    if (!keyboardPlugin) return

    const keyboardHandler = new RusHeroKeyboardHandler(keyboardPlugin)

    const keyboardBinder = new RusHeroKeyboardBinder(hero, keyboardHandler)

    this.keyboard = keyboardBinder.getKeyboard()
  }

  initializeForestTransparency() {
    if (!this.rusHeroContext || !this.forest) return

    const rusHeroSprite = this.rusHeroContext.getSprite()

    this.forest.addTransparentForObject(rusHeroSprite, (treeSprite) => {
      if (treeSprite instanceof FirTree) {
        const treeBodyYPos = treeSprite.y - treeSprite.BODY_BOTTOM_OFFSET
        return treeBodyYPos > rusHeroSprite.y
      }
      return false
    })
  }

  update(): void {
    this.keyboard?.executeKeyCommands()
    this.forest?.update()
  }
}
