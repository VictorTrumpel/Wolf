import { GameObjects, Physics, Scene } from 'phaser'
import {
  BathHouseContext,
  ForestGroup,
  RusHeroContext,
  RusHeroKeyboardBinder,
  RusHeroKeyboardHandler,
} from '@features'
import { BathHouse, DeadTreeGood, FirTree, RusHeroSprite, WoodFence } from '@entities'

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
  private bathHouseContex: BathHouseContext | null = null

  constructor() {
    super('GameScene')
  }

  handleHeroAttackFrame = () => {
    if (!this.rusHeroContext) return
    this.rusHeroContext.attackHitbox.squash()
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
    if (!isTreeGood || !this.forest || !this.rusHeroContext) return
    this.forest.removeTreeFromDeadGroup(treeGood)
    this.rusHeroContext.addWoodGoodCount(1)
    treeGood.destroy()
  }

  handlePutWoodInTheStorve = () => {
    if (!this.bathHouseContex || !this.rusHeroContext) return
    const rusHeroSprite = this.rusHeroContext.getSprite()
    const stoveBody = this.bathHouseContex.getSprite().getStoveBody()
    const isOverlap = this.physics.overlap(rusHeroSprite, stoveBody)

    if (!isOverlap) return

    const woodCount = this.rusHeroContext.getWoodGoodCount()
    this.bathHouseContex.addPower(woodCount)
    this.rusHeroContext.addWoodGoodCount(-woodCount)
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
    const bathHouseSprite = new BathHouse(this.buildings, 270, 230)
    this.bathHouseContex = new BathHouseContext(bathHouseSprite)
    this.buildings.add(bathHouseSprite)

    new WoodFence(this.buildings, 600, 96, { type: 'vertical', collumns: 8 })
    new WoodFence(this.buildings, 600, 240, { type: 'vertical', collumns: 4 })
    new WoodFence(this.buildings, 600, 310, { type: 'vertical', collumns: 2 })
    new WoodFence(this.buildings, 600, 338, { type: 'vertical', collumns: 1 })

    new WoodFence(this.buildings, 515, 338, { type: 'horizontal', collumns: 3 })
    new WoodFence(this.buildings, 562, 338, { type: 'horizontal', collumns: 3 })
  }

  initHero() {
    const rusHeroSprite = new RusHeroSprite(this, 700, 400)

    this.rusHeroContext = new RusHeroContext(rusHeroSprite)

    rusHeroSprite.onFrameUpdate = (_: unknown, { frame }) => {
      const isAttack = frame.name === RusHeroSprite.ATTACK_FRAME
      if (!isAttack) return
      this.handleHeroAttackFrame()
    }

    this.rusHeroContext.onPushWoodsInStove = this.handlePutWoodInTheStorve

    this.initKeyboardForHero(this.rusHeroContext)
  }

  initForest() {
    this.forest = new ForestGroup(this.physics.world, this)
    const forestGroup = this.forest

    forestGroup.setForestAreaPosition(870, 0)
    forestGroup.setForestAreaSize(400, 719)

    forestGroup.addFirTree(100, 200)

    this.add.circle(870 + 100, 200, 2, 0xfff).depth = 2000
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
        const heroInfelicityPX = 5
        const heroSpriteY = rusHeroSprite.y - heroInfelicityPX
        const treeSpriteY = treeSprite.y - treeSprite.getBodyHeight()
        return heroSpriteY < treeSpriteY
      }
      return false
    })
  }

  update(): void {
    this.keyboard?.executeKeyCommands()
    this.forest?.update()
    this.rusHeroContext?.update()
    this.bathHouseContex?.update()
  }
}
