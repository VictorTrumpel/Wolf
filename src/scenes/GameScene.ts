import { GameObjects, Physics, Scene } from 'phaser'
import {
  ForestGroup,
  RusHeroContext,
  RusHeroKeyboardBinder,
  RusHeroKeyboardHandler,
} from '@features'
import { BathHouse, DeadTreeGood, FirTree, RusHeroSprite } from '@entities'

type Keyboard = ReturnType<RusHeroKeyboardBinder['getKeyboard']>
type GameObject =
  | Phaser.Types.Physics.Arcade.GameObjectWithBody
  | Phaser.Physics.Arcade.Body
  | Phaser.Tilemaps.Tile

export class GameScene extends Scene {
  private rusHeroContext: RusHeroContext | null = null
  private keyboard: Keyboard | null = null
  private forest: ForestGroup | null = null
  private buildings: Physics.Arcade.StaticGroup | null = null
  private bathHouse: BathHouse | null = null

  constructor() {
    super('GameScene')
  }

  handleHeroAttackFrame = () => {
    if (!this.rusHeroContext) return
    const attackHitbox = this.rusHeroContext.attackHitbox
    attackHitbox.enable()
    this.time.delayedCall(0, () => attackHitbox.disable())
  }

  handleAttackTreeByAxe = async (tree: GameObjects.GameObject) => {
    const isFirTree = tree instanceof FirTree
    if (!isFirTree || !this.rusHeroContext) return
    const treeContext = tree.getContext()
    treeContext?.hurt(20)
    this.rusHeroContext.attackHitbox.playWoodChips()
  }

  handleHeroPickTreeGood = (_: GameObject, treeGood: GameObject) => {
    const isTreeGood = treeGood instanceof DeadTreeGood
    if (!isTreeGood || !this.forest) return
    this.forest.removeTreeFromDeadGroup(treeGood)
    treeGood.destroy()
  }

  create() {
    this.initBathHouse()
    this.initHero()
    this.initForest()
    this.initializeForestTransparency()
    this.initCollisions()
  }

  initBathHouse() {
    this.buildings = this.physics.add.staticGroup()
    this.bathHouse = new BathHouse(this.buildings, 270, 230)
    this.buildings.add(this.bathHouse)
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

    forestGroup.addFirTree(100, 200)
    forestGroup.addFirTree(300, 150)
    forestGroup.addFirTree(210, 350)
    forestGroup.addFirTree(320, 430)
    forestGroup.addFirTree(100, 550)
    forestGroup.addFirTree(220, 680)
  }

  initCollisions() {
    if (!this.rusHeroContext || !this.forest || !this.buildings) return

    const rusHeroSprite = this.rusHeroContext.getSprite()
    const attackHitbox = this.rusHeroContext.attackHitbox
    const forestGroup = this.forest
    const deadForesGroup = forestGroup.deadTreeGroup

    this.physics.add.collider(rusHeroSprite, this.buildings)
    this.physics.add.collider(rusHeroSprite, forestGroup)
    this.physics.add.overlap(rusHeroSprite, deadForesGroup, this.handleHeroPickTreeGood)
    attackHitbox.addOverlapWith(forestGroup, this.handleAttackTreeByAxe)
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
