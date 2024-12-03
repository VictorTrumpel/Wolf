import { Input } from 'phaser'
import {
  HeroAttackCommand,
  IRusHeroKeyboardHandler,
  MoveHeroBottomCommand,
  MoveHeroLeftCommand,
  MoveHeroRightCommand,
  MoveHeroTopCommand,
  StopMoveHeroCommand,
  StopMoveXHeroCommand,
  StopMoveYHeroCommand,
} from '@features'
import { IRusHeroState } from '@entities'

export class RusHeroKeyboardBinder {
  constructor(
    private rusHero: IRusHeroState,
    private keyboard: IRusHeroKeyboardHandler
  ) {
    this.keyboard.bindMoveTopKey(Input.Keyboard.KeyCodes.W)
    this.keyboard.bindMoveBottomKey(Input.Keyboard.KeyCodes.S)
    this.keyboard.bindMoveRightKey(Input.Keyboard.KeyCodes.D)
    this.keyboard.bindMoveLeftKey(Input.Keyboard.KeyCodes.A)
    this.keyboard.bindAttackKey(Input.Keyboard.KeyCodes.ENTER)

    const moveTopCommand = new MoveHeroTopCommand(this.rusHero)
    const moveBottomCommand = new MoveHeroBottomCommand(this.rusHero)
    const stopMoveYCommand = new StopMoveYHeroCommand(this.rusHero)

    const moveLeftCommand = new MoveHeroLeftCommand(this.rusHero)
    const moveRightCommand = new MoveHeroRightCommand(this.rusHero)
    const stopMoveXCommand = new StopMoveXHeroCommand(this.rusHero)

    const stopMoveCommand = new StopMoveHeroCommand(this.rusHero)

    this.keyboard.bindMoveTopCommand(moveTopCommand)
    this.keyboard.bindMoveBottomCommand(moveBottomCommand)
    this.keyboard.bindStopMoveYCommand(stopMoveYCommand)
    this.keyboard.bindMoveLeftCommand(moveLeftCommand)
    this.keyboard.bindMoveRightCommand(moveRightCommand)
    this.keyboard.bindStopMoveXCommand(stopMoveXCommand)
    this.keyboard.bindStopMoveCommand(stopMoveCommand)

    const attackCommand = new HeroAttackCommand(this.rusHero)

    this.keyboard.bindAttackCommand(attackCommand)
  }

  getKeyboard() {
    return this.keyboard
  }
}
