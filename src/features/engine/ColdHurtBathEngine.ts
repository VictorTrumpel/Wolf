import { GameObjects, Scene } from 'phaser'
import { ISceneConnector } from '../ISceneConnector'
import { FireSceneMounter, HeroSceneMounter } from '../mounters'

const SLOW_FIRE_HEALTH = 30

export class ColdHurtBathEngine {
  private fireMounter: FireSceneMounter
  private heroMounter: HeroSceneMounter
  private snowFlake: GameObjects.Image | null = null
  private scene: Scene

  constructor(sceneConnector: ISceneConnector) {
    this.fireMounter = sceneConnector.getMainFireMounter()
    this.heroMounter = sceneConnector.getHeroMounter()
    this.scene = sceneConnector.getScene()

    this.create()
  }

  private get heroContext() {
    return this.heroMounter.getHeroContext()
  }

  private get heroSprite() {
    return this.heroMounter.getHeroContext().getSprite()
  }

  private get fireContext() {
    return this.fireMounter.getFireContext()
  }

  private create() {
    this.createSnowFlake()
    this.scene.events.on('update', this.update.bind(this))
  }

  private createSnowFlake() {
    this.snowFlake = this.scene.add.image(0, 0, 'snowFlake')
    this.snowFlake.setScale(0.03)
    this.hurtIfCold()
  }

  private update() {
    this.updateSnowFlakePosition()
  }

  private hurtIfCold() {
    this.scene.time.addEvent({
      delay: 3000,
      loop: true,
      callback: () => {
        if (!this.isCold()) return
        this.heroContext.hurt(5)
      },
    })
  }

  private updateSnowFlakePosition() {
    if (!this.snowFlake) return

    const heroBody = this.heroSprite.getBody()

    this.snowFlake.x = heroBody.x
    this.snowFlake.y = heroBody.y - 35

    this.snowFlake.setDepth(this.heroSprite.depth)

    if (this.isCold()) {
      this.snowFlake.alpha = 1
      return
    }

    this.snowFlake.alpha = 0
  }

  private isCold() {
    const fireHealth = this.fireContext.getHealth()
    return fireHealth < SLOW_FIRE_HEALTH
  }
}
