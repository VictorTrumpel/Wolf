import { IRusHeroState } from "../IRusHeroState";
import { RusHeroContext } from "../RusHeroContext/RusHeroContext";

export class MovingHeroState implements IRusHeroState {
  constructor(private rusHeroContext: RusHeroContext) {}

  moveBottom(): void {
    const heroSprite = this.rusHeroContext.getSprite();
    heroSprite.moveY(100);
    heroSprite.playRun();
  }
  moveTop(): void {
    const heroSprite = this.rusHeroContext.getSprite();
    heroSprite.moveY(-100);
    heroSprite.playRun();
  }

  moveLeft(): void {
    const heroSprite = this.rusHeroContext.getSprite();
    heroSprite.moveX(-100);
    heroSprite.flipX = true;
    heroSprite.playRun();
  }
  moveRight(): void {
    const heroSprite = this.rusHeroContext.getSprite();
    heroSprite.moveX(100);
    heroSprite.flipX = false;
    heroSprite.playRun();
  }

  stopMoving(): void {
    const idleHeroState = this.rusHeroContext.getIdleHeroState();
    idleHeroState.stopMoving();
    this.rusHeroContext.setState(idleHeroState);
  }

  stopMovingX(): void {
    const heroSprite = this.rusHeroContext.getSprite();
    heroSprite.stopMoveX();
  }

  stopMovingY(): void {
    const heroSprite = this.rusHeroContext.getSprite();
    heroSprite.stopMoveY();
  }

  attack(): void {}
  getHurt(): void {}
}
