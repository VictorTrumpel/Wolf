import { IRusHeroState } from "../IRusHeroState";
import { RusHeroContext } from "../RusHeroContext";

export class IdleHeroState implements IRusHeroState {
  constructor(private rusHeroContext: RusHeroContext) {}

  moveTop(): void {
    const movingHeroState = this.rusHeroContext.getMovingHeroState();
    movingHeroState.moveTop();
    this.rusHeroContext.setState(movingHeroState);
  }

  moveBottom(): void {
    const movingHeroState = this.rusHeroContext.getMovingHeroState();
    movingHeroState.moveBottom();
    this.rusHeroContext.setState(movingHeroState);
  }

  moveLeft(): void {
    const movingHeroState = this.rusHeroContext.getMovingHeroState();
    movingHeroState.moveLeft();
    this.rusHeroContext.setState(movingHeroState);
  }

  moveRight(): void {
    const movingHeroState = this.rusHeroContext.getMovingHeroState();
    movingHeroState.moveRight();
    this.rusHeroContext.setState(movingHeroState);
  }

  stopMoving(): void {
    const sprite = this.rusHeroContext.getSprite();
    sprite.stopMoving();
    sprite.playIdle();
  }

  attack(): void {}
  getHurt(): void {}
}
