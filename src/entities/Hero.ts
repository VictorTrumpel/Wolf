import { HealthBar } from "./HealthBar";
import { Physics, Scene } from "phaser";

export class Hero {
  private heroInstance: Physics.Arcade.Image | null = null;
  private isRecharge = false;
  private healthBar: HealthBar | null = null;
  private healthBarOffset = 38;

  private isInHurt = false;

  private health = 100;

  constructor(private scene: Scene) {}

  create() {
    const hero = this.scene.physics.add.image(350, 350, "wolf");

    hero.setPushable(false);

    this.heroInstance = hero;

    this.createAttackSplash();
    this.createHealthBar();

    return hero;
  }

  attack() {
    if (!this.heroInstance) throw new Error("");
    if (this.isRecharge) return null;

    const swordSplash = this.scene.physics.add.sprite(
      0,
      0,
      "swordSplash",
      "swordSplash1"
    );

    const hero = this.heroInstance;

    const offset = !hero.flipX ? -79 : 79;

    swordSplash.setSize(500, 126);

    swordSplash.setX(hero.x + offset);
    swordSplash.setY(hero.y);
    swordSplash.setScale(0.2, 0.2);
    swordSplash.flipX = !hero.flipX;

    swordSplash.play("swordSplash", false);

    this.isRecharge = true;

    setTimeout(() => {
      swordSplash.destroy();
    }, 400);

    setTimeout(() => {
      this.isRecharge = false;
    }, 500);

    return swordSplash;
  }

  update() {
    if (!this.heroInstance) throw new Error("");

    this.healthBar?.moveTo(
      this.heroInstance.x,
      this.heroInstance.y + this.healthBarOffset
    );
  }

  hurt(hp: number) {
    if (!this.heroInstance) return;
    if (this.isInHurt) return;

    this.isInHurt = true;

    const defaultTint = this.heroInstance.tint;

    this.heroInstance.setTint(0xff0000);

    this.health -= hp;

    if (this.health <= 0) {
      this.heroInstance.destroy();
    }

    this.healthBar?.change(this.health / 100);

    setTimeout(() => {
      this.heroInstance?.setTint(defaultTint);
      this.isInHurt = false;
    }, 300);
  }

  private createAttackSplash() {
    const frames = this.scene.anims.generateFrameNames("swordSplash", {
      prefix: "swordSplash",
      start: 1,
      end: 6,
    });

    this.scene.anims.create({
      key: "swordSplash",
      frames,
      frameRate: 13,
      repeat: -1,
    });
  }

  private createHealthBar() {
    if (!this.heroInstance) throw new Error("");

    this.healthBar = new HealthBar(this.scene, {
      x: this.heroInstance.x,
      y: this.heroInstance.y,
      color: 0xf55742,
    });
  }
}
