import { Physics, Scene } from "phaser";

export class Enemy {
  private heroInstance: Physics.Arcade.Image | null = null;

  private isInHurt = false;

  private health = 100;

  constructor(private scene: Scene) {}

  create() {
    const hero = this.scene.physics.add.image(50, 350, "ork");

    hero.setPushable(false);

    this.heroInstance = hero;
    return hero;
  }

  hurt(hp: number) {
    if (!this.heroInstance) return;
    if (this.isInHurt) return;

    this.isInHurt = true;

    this.health -= hp;

    if (this.health <= 0) {
      this.heroInstance.destroy();
    }

    const defaultTint = this.heroInstance.tint;

    this.heroInstance.setTint(0xff0000);

    setTimeout(() => {
      this.heroInstance?.setTint(defaultTint);
      this.isInHurt = false;
    }, 300);
  }
}
