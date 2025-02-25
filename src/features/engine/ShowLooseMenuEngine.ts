import { Scene } from 'phaser'
import { LooseMenu } from '@entities/ui'
import { ISceneConnector } from '../ISceneConnector'

export class ShowLooseMenuEngine {
  private scene: Scene

  constructor(sceneConnector: ISceneConnector) {
    this.scene = sceneConnector.getScene()
    this.create()
  }

  private handleCreateShowMenu = () => {
    this.scene.scene.pause()

    const looseMenu = new LooseMenu()

    looseMenu.eventEmitter.on('restart-button-menu_click', () => {
      looseMenu.dispose()
      this.scene.scene.restart()
      this.scene.events.removeListener('HeroDead')
    })
  }

  private create() {
    this.scene.events.on('HeroDead', this.handleCreateShowMenu)
  }
}
