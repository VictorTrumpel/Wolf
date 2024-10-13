import { Physics, Scene } from "phaser";

export class Sprite {
  private _sprite: Physics.Arcade.Sprite | null = null;

  constructor(private scene: Scene) {}

  get sprite() {
    if (this._sprite == null) {
      return this.create(0, 0, "");
    }
    return this._sprite;
  }

  get body() {
    return this.sprite.body!;
  }

  create(x: number, y: number, texture: string, frame?: string) {
    this._sprite = this.scene.physics.add.sprite(x, y, texture, frame);
    this._sprite.setPushable(false);
    return this._sprite;
  }

  setVelocityX(velocity: number) {
    this.sprite.setVelocityX(velocity);
  }

  setVelocityY(velocity: number) {
    this.sprite.setVelocityY(velocity);
  }

  setScale(scale: number) {
    this.sprite.setScale(scale)
  }

  moveTo(x: number, y: number, velocity = 100, maxTime?: number) {
    this.scene.physics.moveTo(this.sprite, x, y, velocity, maxTime);
  }
}
