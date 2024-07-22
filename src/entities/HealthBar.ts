import { GameObjects, Scene } from "phaser";

type HealthBarOptions = {
  x: number;
  y: number;
  color: number;
};

export class HealthBar {
  private x = 0;
  private y = 0;

  private style = {
    boxColor: 0xeb4034,
    barColor: 0xfff8dc,
    width: 60,
    height: 8,
  };

  private progressBox!: GameObjects.Rectangle;

  constructor(private scene: Scene, options: HealthBarOptions) {
    this.x = options.x - this.style.width / 2;
    this.y = options.y;

    this.style.boxColor = options.color;
  }

  create() {
    this.progressBox = this.scene.add.rectangle(
      this.x + this.style.width / 2,
      this.y,
      this.style.width,
      this.style.height,
      this.style.boxColor
    );
  }

  moveTo(x: number, y: number) {
    this.progressBox.x = x;
    this.progressBox.y = y;
  }

  change(k: number) {
    this.progressBox.width = this.style.width * (k < 0 ? 0 : k);
  }
}
