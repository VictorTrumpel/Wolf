import { GameObjects, Scene } from 'phaser'
import { ISceneConnector } from '../ISceneConnector'
import { FireSceneMounter } from '../mounters'
import { HeroSceneMounter } from '../mounters/HeroSceneMounter'

export class ShowHelperTextWhenHeroNearEngine {
  private heroMounter: HeroSceneMounter
  private mainFireMounter: FireSceneMounter
  private scene: Scene

  private dropWoodsHelperText: GameObjects.Text | null = null

  constructor(sceneConnector: ISceneConnector) {
    this.heroMounter = sceneConnector.getHeroMounter()
    this.scene = sceneConnector.getScene()
    this.mainFireMounter = sceneConnector.getMainFireMounter()

    this.create()
  }

  private get heroSprite() {
    return this.heroMounter.getHeroContext().getSprite()
  }

  private get fireSprite() {
    return this.mainFireMounter.getFireContext().getSprite()
  }

  private handleShowHelperTextForDropWoods = () => {
    if (!this.dropWoodsHelperText) return

    const x = this.fireSprite.x - 120
    const y = this.fireSprite.y - 130

    this.dropWoodsHelperText.x = x
    this.dropWoodsHelperText.y = y

    this.dropWoodsHelperText.alpha = 1

    this.scene.time.addEvent({
      delay: 100,
      loop: false,
      callback: () => {
        if (!this.dropWoodsHelperText) return
        this.dropWoodsHelperText.alpha = 0
      },
    })
  }

  private create() {
    this.dropWoodsHelperText = this.scene.add.text(0, 0, 'press "E" to drop woods', {
      fontSize: '20px',
      color: '#ffffff',
    })

    this.dropWoodsHelperText.alpha = 0

    this.scene.physics.add.overlap(
      this.heroSprite,
      this.fireSprite.getFireArea(),
      this.handleShowHelperTextForDropWoods
    )
  }
}
