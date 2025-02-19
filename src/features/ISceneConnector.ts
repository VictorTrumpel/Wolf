import { Scene } from 'phaser'
import {
  EnemiesSceneMounter,
  FireSceneMounter,
  ForestSceneMounter,
  HeroSceneMounter,
} from './mounters'

export interface ISceneConnector {
  getForestMounter(): ForestSceneMounter
  getHeroMounter(): HeroSceneMounter
  getEnemiesMounter(): EnemiesSceneMounter
  getMainFireMounter(): FireSceneMounter
  getScene(): Scene
}
