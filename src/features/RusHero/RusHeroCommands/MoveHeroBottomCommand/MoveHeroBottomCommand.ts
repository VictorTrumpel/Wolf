import type { ICommand, IRusHeroState } from '@entities'

export class MoveHeroBottomCommand implements ICommand {
  constructor(private heroState: IRusHeroState) {}

  execute(): void {
    this.heroState.moveBottom()
  }
}
