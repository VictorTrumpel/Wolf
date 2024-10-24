export interface IRusHeroState {
  moveTop(): void;
  moveBottom(): void;
  moveLeft(): void;
  moveRight(): void;
  stopMoving(): void;

  attack(): void;
  getHurt(): void;
}
