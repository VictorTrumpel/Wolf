import { Input } from 'phaser'
import { ICommand } from '@entities'
import { IRusHeroKeyboardHandler } from './IRusHeroKeyboardHandler'

export class RusHeroKeyboardHandler implements IRusHeroKeyboardHandler {
  private moveTopCommand: ICommand | null = null
  private moveBottomCommand: ICommand | null = null
  private stopMoveYCommand: ICommand | null = null

  private moveLeftCommand: ICommand | null = null
  private moveRightCommand: ICommand | null = null
  private stopMoveXCommand: ICommand | null = null

  private stopMoveCommand: ICommand | null = null

  private attackCommand: ICommand | null = null

  private pushWoodsInStoveCommand: ICommand | null = null

  private moveTopKey: Phaser.Input.Keyboard.Key | null = null
  private moveBottomKey: Phaser.Input.Keyboard.Key | null = null
  private moveLeftKey: Phaser.Input.Keyboard.Key | null = null
  private moveRightKey: Phaser.Input.Keyboard.Key | null = null
  private attackKey: Phaser.Input.Keyboard.Key | null = null
  private pushWoodsInStoveKey: Phaser.Input.Keyboard.Key | null = null

  static _instance: RusHeroKeyboardHandler | null = null

  constructor(private keyboard: Input.Keyboard.KeyboardPlugin) {}

  bindMoveTopKey(keyCode: number) {
    this.moveTopKey = this.keyboard.addKey(keyCode)
  }

  bindMoveTopCommand(command: ICommand) {
    this.moveTopCommand = command
  }

  bindMoveBottomKey(keyCode: number) {
    this.moveBottomKey = this.keyboard.addKey(keyCode)
  }

  bindMoveBottomCommand(command: ICommand) {
    this.moveBottomCommand = command
  }

  bindStopMoveYCommand(command: ICommand) {
    this.stopMoveYCommand = command
  }

  bindMoveLeftKey(keyCode: number) {
    this.moveLeftKey = this.keyboard.addKey(keyCode)
  }

  bindMoveLeftCommand(command: ICommand) {
    this.moveLeftCommand = command
  }

  bindMoveRightKey(keyCode: number) {
    this.moveRightKey = this.keyboard.addKey(keyCode)
  }

  bindAttackKey(keyCode: number) {
    this.attackKey = this.keyboard.addKey(keyCode)
  }

  bindPushWoodsInStoveKey(keyCode: number) {
    this.pushWoodsInStoveKey = this.keyboard.addKey(keyCode)
    this.pushWoodsInStoveKey.on('down', () => {
      this.pushWoodsInStoveCommand?.execute()
    })
  }

  bindMoveRightCommand(command: ICommand) {
    this.moveRightCommand = command
  }

  bindStopMoveXCommand(command: ICommand) {
    this.stopMoveXCommand = command
  }

  bindStopMoveCommand(command: ICommand) {
    this.stopMoveCommand = command
  }

  bindAttackCommand(command: ICommand) {
    this.attackCommand = command
  }

  bindPushWoodsInStoveCommand(command: ICommand): void {
    this.pushWoodsInStoveCommand = command
  }

  executeKeyCommands() {
    this.processMoveTop()
    this.processMoveBottom()
    this.processStopMoveY()

    this.processMoveLeft()
    this.processMoveRight()
    this.processStopMoveX()

    this.processStopMove()

    this.processAttack()
  }

  private checkIsAllUnpressed() {
    const isAllUnpressed =
      this.moveTopKey?.isUp &&
      this.moveBottomKey?.isUp &&
      this.moveLeftKey?.isUp &&
      this.moveRightKey?.isUp
    return isAllUnpressed
  }

  private processAttack() {
    if (this.attackKey?.isUp) return
    this.attackCommand?.execute()
  }

  private processMoveTop() {
    if (this.moveTopKey?.isUp) return
    if (this.moveBottomKey?.isDown) return
    this.moveTopCommand?.execute()
  }

  private processMoveBottom() {
    if (this.moveBottomKey?.isUp) return
    if (this.moveTopKey?.isDown) return
    this.moveBottomCommand?.execute()
  }

  private processStopMoveY() {
    const isBothKeyPressed = this.moveTopKey?.isDown && this.moveBottomKey?.isDown
    const isBothKeyUnpressed = this.moveTopKey?.isUp && this.moveBottomKey?.isUp
    const isMoveXKeysUnpressed = this.moveLeftKey?.isUp && this.moveRightKey?.isUp

    const needStopMoveY = isBothKeyPressed || isBothKeyUnpressed

    if (needStopMoveY) {
      this.stopMoveYCommand?.execute()
    }

    if (isMoveXKeysUnpressed && needStopMoveY) {
      this.stopMoveCommand?.execute()
    }
  }

  private processMoveLeft() {
    if (this.moveLeftKey?.isUp) return
    if (this.moveRightKey?.isDown) return
    this.moveLeftCommand?.execute()
  }

  private processMoveRight() {
    if (this.moveRightKey?.isUp) return
    if (this.moveLeftKey?.isDown) return
    this.moveRightCommand?.execute()
  }

  private processStopMoveX() {
    const isBothKeyPressed = this.moveLeftKey?.isDown && this.moveRightKey?.isDown
    const isBothKeyUnpressed = this.moveLeftKey?.isUp && this.moveRightKey?.isUp
    const isMoveYKeysUnpressed = this.moveTopKey?.isUp && this.moveBottomKey?.isUp

    const needStopMoveX = isBothKeyPressed || isBothKeyUnpressed

    if (needStopMoveX) {
      this.stopMoveXCommand?.execute()
    }

    if (isMoveYKeysUnpressed && needStopMoveX) {
      this.stopMoveCommand?.execute()
    }
  }

  private processStopMove() {
    const isAllUnpressed = this.checkIsAllUnpressed()

    if (isAllUnpressed) {
      this.stopMoveCommand?.execute()
    }
  }
}
