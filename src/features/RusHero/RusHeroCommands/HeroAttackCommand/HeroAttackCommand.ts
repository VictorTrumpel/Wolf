import type { ICommand, IRusHeroState } from '@entities'

export class HeroAttackCommand implements ICommand {
  constructor(private heroState: IRusHeroState) {}

  execute(): void {
    this.heroState.attack()
  }
}
