import type { ICommand, IRusHeroState } from '@entities'

export class PushWoodsInStoveCommand implements ICommand {
  constructor(private heroState: IRusHeroState) {}

  execute(): void {
    this.heroState.pushWoodsInStove()
  }
}
