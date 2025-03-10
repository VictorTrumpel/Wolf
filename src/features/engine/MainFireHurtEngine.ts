import { Scene } from 'phaser'
import { ISceneConnector } from '../ISceneConnector'
import { FireSceneMounter } from '../mounters'

export class MainFireHurtEngine {
  private fireMounter: FireSceneMounter
  private scene: Scene

  constructor(sceneConnector: ISceneConnector) {
    this.fireMounter = sceneConnector.getMainFireMounter()
    this.scene = sceneConnector.getScene()

    this.create()
  }

  private get fireContext() {
    return this.fireMounter.getFireContext()
  }

  create() {
    this.scene.time.addEvent({
      delay: 3000,
      callback: () => {
        this.fireContext.hurt(3)
      },
      loop: true,
    })
  }
}
