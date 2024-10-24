import { RusHeroSprite } from "@entities";
import { IRusHeroState } from "./IRusHeroState";
import { MovingHeroState } from "./MovingHeroState";
import { IdleHeroState } from "./IdleHeroState";

export class RusHeroContext {
  private heroState: IRusHeroState;

  constructor(private rusHeroSprite: RusHeroSprite) {
    this.heroState = new IdleHeroState(this);
  }

  setState(state: IRusHeroState) {
    this.heroState = state;
  }

  getState() {
    return this.heroState;
  }

  getSprite() {
    return this.rusHeroSprite;
  }

  getMovingHeroState(): IRusHeroState {
    return new MovingHeroState(this);
  }

  getIdleHeroState(): IRusHeroState {
    return new IdleHeroState(this);
  }
}
