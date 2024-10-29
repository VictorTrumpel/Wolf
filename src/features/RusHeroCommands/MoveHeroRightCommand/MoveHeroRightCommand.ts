import type { ICommand, IRusHeroState } from '@entities'

export class MoveHeroRightCommand implements ICommand {
  constructor(private heroState: IRusHeroState) {}

  execute(): void {
    this.heroState.moveRight()
  }
}
