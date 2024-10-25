import { Input } from "phaser";
import { ICommand } from "@entities";
import { IRusHeroKeyboardHandler } from "./IRusHeroKeyboardHandler";

export class RusHeroKeyboardHandler implements IRusHeroKeyboardHandler {
  private moveTopCommand: ICommand | null = null;
  private moveBottomCommand: ICommand | null = null;
  private stopMoveYCommand: ICommand | null = null;

  private moveLeftCommand: ICommand | null = null;
  private moveRightCommand: ICommand | null = null;
  private stopMoveXCommand: ICommand | null = null;

  private stopMoveCommand: ICommand | null = null;

  private moveTopKey: Phaser.Input.Keyboard.Key | null = null;
  private moveBottomKey: Phaser.Input.Keyboard.Key | null = null;
  private moveLeftKey: Phaser.Input.Keyboard.Key | null = null;
  private moveRightKey: Phaser.Input.Keyboard.Key | null = null;

  constructor(private keyboard: Input.Keyboard.KeyboardPlugin) {}

  bindMoveTopKey(keyCode: number) {
    this.moveTopKey = this.keyboard.addKey(keyCode);
  }

  bindMoveTopCommand(command: ICommand) {
    this.moveTopCommand = command;
  }

  bindMoveBottomKey(keyCode: number) {
    this.moveBottomKey = this.keyboard.addKey(keyCode);
  }

  bindMoveBottomCommand(command: ICommand) {
    this.moveBottomCommand = command;
  }

  bindStopMoveYCommand(command: ICommand) {
    this.stopMoveYCommand = command;
  }

  bindMoveLeftKey(keyCode: number) {
    this.moveLeftKey = this.keyboard.addKey(keyCode);
  }

  bindMoveLeftCommand(command: ICommand) {
    this.moveLeftCommand = command;
  }

  bindMoveRightKey(keyCode: number) {
    this.moveRightKey = this.keyboard.addKey(keyCode);
  }

  bindMoveRightCommand(command: ICommand) {
    this.moveRightCommand = command;
  }

  bindStopMoveXCommand(command: ICommand) {
    this.stopMoveXCommand = command;
  }

  bindStopMoveCommand(command: ICommand) {
    this.stopMoveCommand = command;
  }

  executeKeyCommands() {
    let isMoving = false;

    if (this.moveTopKey?.isDown) {
      isMoving = true;
      this.moveTopCommand?.execute();
    }

    if (this.moveBottomKey?.isDown) {
      isMoving = true;
      this.moveBottomCommand?.execute();
    }

    if (this.moveLeftKey?.isDown) {
      isMoving = true;
      this.moveLeftCommand?.execute();
    }

    if (this.moveRightKey?.isDown) {
      isMoving = true;
      this.moveRightCommand?.execute();
    }

    if (this.moveTopKey?.isUp && this.moveBottomKey?.isUp) {
      this.stopMoveYCommand?.execute();
    }

    if (this.moveLeftKey?.isUp && this.moveRightKey?.isUp) {
      this.stopMoveXCommand?.execute();
    }

    if (!isMoving) {
      this.stopMoveCommand?.execute();
    }
  }
}
