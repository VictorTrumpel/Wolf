export interface IRusHeroState {
  moveTop(): void
  moveBottom(): void

  moveLeft(): void
  moveRight(): void

  stopMoving(): void
  stopMovingX(): void
  stopMovingY(): void

  attack(): Promise<void>
  getHurt(): void
}
