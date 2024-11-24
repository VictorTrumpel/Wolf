import type { ICommand, IRusHeroState } from '@entities'

export class MoveHeroLeftCommand implements ICommand {
  constructor(private heroState: IRusHeroState) {}

  execute(): void {
    this.heroState.moveLeft()
  }
}
