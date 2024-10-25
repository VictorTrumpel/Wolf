export interface IRusHeroState {
  moveTop(): void;
  moveBottom(): void;

  moveLeft(): void;
  moveRight(): void;

  stopMoving(): void;
  stopMovingX(): void;
  stopMovingY(): void;

  attack(): void;
  getHurt(): void;
}
