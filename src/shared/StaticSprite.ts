import { GameObjects, Physics, Scene } from 'phaser'

export class StaticSprite extends GameObjects.Sprite {
  constructor(scene: Scene, x: number, y: number, texture: string, frame: string) {
    super(scene, x, y, texture, frame)

    this.scene.add.existing(this)
  }

  getBody() {
    return this.body as Physics.Arcade.StaticBody
  }

  getBodyHeight() {
    return this.getBody().height
  }
}
