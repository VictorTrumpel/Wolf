import type { ICommand, IRusHeroState } from '@entities'

export class StopMoveYHeroCommand implements ICommand {
  constructor(private heroState: IRusHeroState) {}

  execute(): void {
    this.heroState.stopMovingY()
  }
}
