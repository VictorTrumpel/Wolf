import { PhysicsSprite } from "../../shared/PhysicsSprite";
import { Scene } from "phaser";

const RUN_ANIMATION = "run";
const IDLE_ANIMATION = "idle";

const HITBOX_OFFSET_X = 2;
const HITBOX_OFFSET_Y = 4;

export class RusHero extends PhysicsSprite {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "heroAtlas", "idle_");

    this.setScale(2);

    const body = this.getBody();
    body.setCircle(this.width / 2.5, HITBOX_OFFSET_X, HITBOX_OFFSET_Y);

    this.createIdleAnimation();
    this.createRunAnimation();
  }

  playIdle() {
    this.play(IDLE_ANIMATION, true);
  }

  playRun() {
    this.play(RUN_ANIMATION, true);
  }

  moveX(speed: number) {
    const body = this.getBody();
    body.setVelocityX(speed);
  }

  moveY(speed: number) {
    const body = this.getBody();
    body.setVelocityY(speed);
  }

  stopMoving() {
    const body = this.getBody();
    body.setVelocity(0);
  }

  private createIdleAnimation() {
    const frames = this.anims.generateFrameNames("heroAtlas", {
      prefix: "idle_",
      start: 1,
    });

    this.anims.create({
      key: IDLE_ANIMATION,
      frames,
      frameRate: 10,
      repeat: Infinity,
    });
  }

  private createRunAnimation() {
    const frames = this.anims.generateFrameNames("heroAtlas", {
      prefix: "walk_",
      start: 1,
      end: 8,
    });

    this.anims.create({
      key: RUN_ANIMATION,
      frames,
      frameRate: 10,
      repeat: Infinity,
    });
  }
}
