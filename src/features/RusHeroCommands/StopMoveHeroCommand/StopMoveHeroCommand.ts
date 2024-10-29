import type { ICommand, IRusHeroState } from '@entities'

export class StopMoveHeroCommand implements ICommand {
  constructor(private heroState: IRusHeroState) {}

  execute(): void {
    this.heroState.stopMoving()
  }
}
