type CharacteristicsType = {
  rapidFire: number;
  speed: number;
  hp: number;
};

export class Characteristics {
  rapidFire: number;
  speed: number;

  constructor({ rapidFire, speed, hp }: CharacteristicsType) {
    this.rapidFire = rapidFire;
    this.speed = speed;
    this.hp = hp;
  }
}
