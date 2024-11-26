export class TreeState {
  constructor(private hp: number) {}

  getHp() {
    return this.hp
  }

  setHp(hp: number) {
    this.hp = hp
  }
}
