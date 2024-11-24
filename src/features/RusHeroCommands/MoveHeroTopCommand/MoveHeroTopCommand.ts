import type { ICommand, IRusHeroState } from '@entities'

export class MoveHeroTopCommand implements ICommand {
  constructor(private heroState: IRusHeroState) {}

  execute(): void {
    this.heroState.moveTop()
  }
}
