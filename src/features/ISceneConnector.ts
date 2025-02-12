import { Scene } from 'phaser'
import { EnemiesSceneEngine } from './engine'
import { ForestSceneEngine } from './engine/ForestSceneEngine'
import { HeroSceneEngine } from './engine/HeroSceneEngine'

export interface ISceneConnector {
  getForestEngine(): ForestSceneEngine
  getHeroEngine(): HeroSceneEngine
  getEnemiesEngine(): EnemiesSceneEngine
  getScene(): Scene
}
