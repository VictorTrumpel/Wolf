import { GameObjects, Physics, Scene } from 'phaser'
import {
  BathHouseContext,
  EnemyContext,
  ForestGroup,
  RusHeroContext,
  RusHeroKeyboardBinder,
  RusHeroKeyboardHandler,
} from '@features'
import { BathHouse, DeadTreeGood, EnemySprite, FirTree, RusHeroSprite, WoodFence } from '@entities'

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
  private enemies: Phaser.GameObjects.Group | null = null

  constructor() {
    super('GameScene')
  }

  handleHurtEnemy = (enemy: GameObjects.GameObject) => {
    const isEmemy = enemy instanceof EnemySprite
    if (!isEmemy) return
    const heroSprite = this.rusHeroContext?.getSprite()
    if (!heroSprite) return
    const inpulseSpeed = heroSprite.flipX ? -10 : 10
    const enemyContext = enemy.getContext()
    enemy.getBody().setVelocityX(inpulseSpeed)
    enemyContext?.hurt(25)
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

  handleEnterIntoBathHouse = () => {
    this.scene.start('BanyaScene', { keyboard: this.keyboard })
  }

  create() {
    this.cameras.main.setBounds(0, 0, 2000, 2000)

    this.initBathHouse()
    this.initHero()
    this.initKeyboardForHero(this.rusHeroContext)
    this.initEnemies()
    this.initForest()
    this.initializeForestTransparency()
    this.initCollisions()
  }

  initHero() {
    const rusHeroSprite = new RusHeroSprite(this, 1000, 1300)

    this.rusHeroContext = new RusHeroContext(rusHeroSprite)

    rusHeroSprite.onFrameUpdate = (_: unknown, { frame }) => {
      const isAttack = frame.name === RusHeroSprite.ATTACK_FRAME
      if (!isAttack) return
      this.handleHeroAttackFrame()
    }

    this.rusHeroContext.onPushWoodsInStove = this.handlePutWoodInTheStorve

    this.cameras.main.startFollow(rusHeroSprite, true, 0.1, 0.1)
  }

  initForest() {
    this.forest = new ForestGroup(this.physics.world, this)
    const forestGroup = this.forest

    forestGroup.setForestAreaPosition(0, 0)
    forestGroup.setForestAreaSize(2000, 2000)

    const SIZE = 2000
    const STEP = 350

    const START_DEAD_ZONE_X = 500
    const END_DEAD_ZONE_X = 1400

    const START_DEAD_ZONE_Y = 650
    const END_DEAD_ZONE_Y = 1350

    const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min

    for (let x = 0; x <= SIZE; x += STEP) {
      for (let y = 0; y <= SIZE; y += STEP) {
        const minX = x
        const minY = y

        const maxX = x + STEP
        const maxY = y + STEP

        const randomX = randomFloat(minX, maxX)
        const randomY = randomFloat(minY, maxY)

        const isXInDeadZone = randomX >= START_DEAD_ZONE_X && randomX <= END_DEAD_ZONE_X
        const isYInDeadZone = randomY >= START_DEAD_ZONE_Y && randomY <= END_DEAD_ZONE_Y

        if (isXInDeadZone && isYInDeadZone) continue

        forestGroup.addFirTree(randomX, randomY)
      }
    }
  }

  initCollisions() {
    if (
      !this.rusHeroContext ||
      !this.forest ||
      !this.buildings ||
      !this.bathHouseContex ||
      !this.enemies
    )
      return

    const rusHeroSprite = this.rusHeroContext.getSprite()
    const attackHitbox = this.rusHeroContext.attackHitbox
    const forestGroup = this.forest
    const deadForesGroup = forestGroup.deadTreeGroup
    const doorBody = this.bathHouseContex.getSprite().getDoorBody()

    this.physics.add.collider(this.enemies, this.enemies)
    this.physics.add.collider(forestGroup, this.enemies)
    this.physics.add.collider(this.buildings, this.enemies)

    this.physics.add.collider(rusHeroSprite, this.buildings)
    this.physics.add.collider(rusHeroSprite, forestGroup)

    this.physics.add.overlap(rusHeroSprite, deadForesGroup, this.handleHeroPickTreeGood)
    this.physics.add.overlap(rusHeroSprite, doorBody, this.handleEnterIntoBathHouse)
    attackHitbox.addOverlapWith(forestGroup, this.handleAttackTreeByAxe)
    attackHitbox.addOverlapWith(this.enemies, this.handleHurtEnemy)

    const body = this.physics.add.staticImage(250, 280, '', 200)
    body.visible = false
    body.setOrigin(0, 0)
    body.setSize(255, 200)
    this.buildings.add(body)
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

  initBathHouse() {
    this.buildings = this.physics.add.staticGroup()
    const bathHouseSprite = new BathHouse(this.buildings, 1000, 1000)
    this.bathHouseContex = new BathHouseContext(bathHouseSprite)
    this.buildings.add(bathHouseSprite)

    this.initWoodFence(this.buildings, 740, 780)
  }

  createEnemySprite(x: number, y: number) {
    const sprite = new EnemySprite(this, x, y, 'ork')
    new EnemyContext(sprite)
    return sprite
  }

  initEnemies() {
    this.enemies = this.physics.add.group()

    this.time.addEvent({
      delay: 3000,
      callback: () => {
        const size = this.enemies?.children.size || 0
        if (size >= 1) return
        this.enemies?.add(this.createEnemySprite(1400, 1300))
      },
      loop: true,
    })

    this.time.addEvent({
      delay: 300,
      callback: () => {
        this.enemies?.children.each((child) => {
          if (!this.enemies || !child) return true
          const sprite = this.rusHeroContext?.getSprite()
          const isCollide = this.physics.overlap(this.enemies, child)
          if (isCollide) return true

          if (sprite && child instanceof EnemySprite) {
            const enemyContext = child.getContext()
            enemyContext?.moveToObject(sprite)
          }
          return true
        })
      },
      callbackScope: this,
      loop: true,
    })
  }

  initWoodFence(buildings: Phaser.Physics.Arcade.StaticGroup, x: number, y: number) {
    new WoodFence(buildings, x + 600, y + 96, { type: 'vertical', collumns: 8 })
    new WoodFence(buildings, x + 600, y + 240, { type: 'vertical', collumns: 4 })
    new WoodFence(buildings, x + 600, y + 310, { type: 'vertical', collumns: 2 })
    new WoodFence(buildings, x + 600, y + 338, { type: 'vertical', collumns: 1 })

    new WoodFence(buildings, x + 576, y + -10, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 515, y + -10, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 454, y + -10, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 393, y + -10, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 332, y + -10, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 271, y + -10, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 210, y + -10, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 149, y + -10, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 88, y + -10, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 27, y + -10, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + -34, y + -10, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + -95, y + -10, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 515, y + 338, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 562, y + 338, { type: 'horizontal', collumns: 3 })

    new WoodFence(buildings, x + -119, y + 90, { type: 'vertical', collumns: 8 })
    new WoodFence(buildings, x + -119, y + 280, { type: 'vertical', collumns: 8 })

    new WoodFence(buildings, x + -95, y + 380, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + -35, y + 380, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 25, y + 380, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 86, y + 380, { type: 'horizontal', collumns: 3 })

    new WoodFence(buildings, x + 240, y + 420, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 300, y + 420, { type: 'horizontal', collumns: 3 })
    new WoodFence(buildings, x + 360, y + 420, { type: 'horizontal', collumns: 3 })
  }
}
