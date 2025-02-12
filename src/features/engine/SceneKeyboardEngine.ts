import { Scene } from 'phaser'
import { ISceneConnector } from '../ISceneConnector'
import { RusHeroKeyboardBinder } from '../RusHero/RusHeroKeyboardBinder'
import { RusHeroKeyboardHandler } from '../RusHero/RusHeroKeyboardHandler'
import { HeroSceneEngine } from './HeroSceneEngine'

export class SceneKeyboardEngine {
  private heroEngine: HeroSceneEngine
  private scene: Scene

  constructor(sceneConnector: ISceneConnector) {
    this.heroEngine = sceneConnector.getHeroEngine()
    this.scene = sceneConnector.getScene()

    this.create()
  }

  private get heroContext() {
    return this.heroEngine.getHeroContext()
  }

  private create() {
    const keyboardPlugin = this.scene.input.keyboard
    const heroContext = this.heroContext

    if (!keyboardPlugin) return

    const keyboardHandler = new RusHeroKeyboardHandler(keyboardPlugin)
    const keyboardBinder = new RusHeroKeyboardBinder(heroContext, keyboardHandler)

    const keyboard = keyboardBinder.getKeyboard()

    this.scene.events.on('update', () => {
      keyboard.executeKeyCommands()
    })
  }
}
