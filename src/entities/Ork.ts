import { Scene } from "phaser";
import { Sprite } from "./../shared/Sprite";
import { Characteristics } from "../shared/Characteristics";

export class Ork {
  sprite: Sprite;
  characteristics: Characteristics;

  constructor(scene: Scene) {
    this.sprite = new Sprite(scene);
    this.characteristics = new Characteristics({
      rapidFire: 500,
      speed: 200,
      hp: 100,
    });
  }

  create(x: number, y: number) {
    this.sprite.create(x, y, "ork");
    this.sprite.sprite.userInfo = new Map([["creator", this]]);
  }

  hurt() {
    this.playHurtAnimation();
  }

  private playHurtAnimation() {
    const defaultTint = this.sprite.sprite.tint;

    this.sprite.sprite.setTint(0xff0000);

    setTimeout(() => {
      this.sprite.sprite.setTint(defaultTint);
    }, 1);
  }
}
