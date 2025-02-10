import { Scene } from 'phaser'
import { PhysicsSprite } from '@shared'
import { IEnemySprite } from './interfaces/IEnemySprite'
import { IEnemyState } from './interfaces/IEnemyState'

export class EnemySprite extends PhysicsSprite implements IEnemySprite {
  private context: IEnemyState | null = null

  constructor(scene: Scene, x: number, y: number, enemy: 'wolf' | 'ork') {
    super(scene, x, y, enemy, enemy)

    this.setOrigin(0.5, 1)
  }

  async playHurt(): Promise<void> {
    return new Promise((resolve) => {
      const defaultTint = this.tint

      this.setTint(0xff0000)

      this.scene.time.addEvent({
        delay: 300,
        callback: () => {
          this.setTint(defaultTint)
          resolve(undefined)
        },
        callbackScope: this,
      })
    })
  }

  setContext(context: IEnemyState) {
    this.context = context
  }

  getContext() {
    return this.context
  }
}
