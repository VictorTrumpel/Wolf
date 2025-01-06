import { ICommand } from '@entities'

export interface IRusHeroKeyboardHandler {
  bindMoveTopKey(keyCode: number): void
  bindMoveBottomKey(keyCode: number): void
  bindMoveLeftKey(keyCode: number): void
  bindMoveRightKey(keyCode: number): void
  bindAttackKey(keyCode: number): void
  bindPushWoodsInStoveKey(keyCode: number): void

  bindMoveTopCommand(command: ICommand): void
  bindMoveBottomCommand(command: ICommand): void
  bindStopMoveYCommand(command: ICommand): void
  bindMoveLeftCommand(command: ICommand): void
  bindMoveRightCommand(command: ICommand): void
  bindStopMoveXCommand(command: ICommand): void
  bindStopMoveCommand(command: ICommand): void

  bindAttackCommand(command: ICommand): void

  bindPushWoodsInStoveCommand(command: ICommand): void

  executeKeyCommands(): void
}
