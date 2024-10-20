export interface IHeroState {
  moveLeft(): void;
  moveRight(): void;
  moveTop(): void;
  moveBottom(): void;
  attack(): void;
  getHurt(): void;
}
