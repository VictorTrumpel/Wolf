import { GameObjects, Scene } from "phaser";

export class PhysicsSprite extends GameObjects.Sprite {
  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    frame: string
  ) {
    super(scene, x, y, texture, frame);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
  }
}
