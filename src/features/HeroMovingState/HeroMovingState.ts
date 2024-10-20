import { RusHero } from "../../entities/RusHero/RusHero";
import { IHeroState } from "../IHeroState";

export class RusHeroMover implements IHeroState {
  constructor(private rusHero: RusHero) {}

  moveBottom(): void {
    
  }
  moveLeft(): void {}
  moveRight(): void {}
  moveTop(): void {}
  getHurt(): void {}
  attack(): void {}
}
