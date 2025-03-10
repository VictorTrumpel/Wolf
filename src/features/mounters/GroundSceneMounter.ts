import { Scene } from 'phaser'

export class GroundSceneMounter {
  private scene: Scene

  constructor(scene: Scene) {
    this.scene = scene

    this.create()
  }

  private create() {
    this.scene.add.image(0, 0, 'iceGroundAsset').setOrigin(0, 0)
  }
}
