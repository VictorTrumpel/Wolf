import { Scene } from 'phaser'

export class SnowParticleMounter {
  constructor(private scene: Scene) {
    this.create()
  }

  private create() {
    this.scene.add.particles(0, 0, 'snowParticle', {
      x: { min: -window.innerWidth, max: window.innerWidth },
      y: 0,
      emitZone: {
        source: new Phaser.Geom.Rectangle(0, 0, window.innerWidth, window.innerHeight * 2),
        type: 'random',
        quantity: 70,
      },
      speedX: { min: -20, max: 20 },
      accelerationY: [1, 15],
      lifespan: { random: [8000, 10000] },
      scale: { min: 0.25, max: 0.35 },
      alpha: { random: [0.1, 0.8] },
      gravityY: 9.7,
      frequency: 10,
      blendMode: 'ADD',
    })
  }
}
