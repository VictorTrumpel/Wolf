import type { ICommand, IRusHeroState } from '@entities'

export class StopMoveXHeroCommand implements ICommand {
  constructor(private heroState: IRusHeroState) {}

  execute(): void {
    this.heroState.stopMovingX()
  }
}
