import { Scene } from 'phaser'
import { EnemiesSceneMounter, ForestSceneMounter, HeroSceneMounter } from './mounters'

export interface ISceneConnector {
  getForestMounter(): ForestSceneMounter
  getHeroMounter(): HeroSceneMounter
  getEnemiesMounter(): EnemiesSceneMounter
  getScene(): Scene
}
