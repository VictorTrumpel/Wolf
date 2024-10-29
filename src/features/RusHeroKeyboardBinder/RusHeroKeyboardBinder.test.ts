import { describe, test, vi, expect, beforeEach } from "vitest";
import { RusHeroKeyboardBinder } from "./RusHeroKeyboardBinder";
import { IRusHeroState } from "@entities";
import {
  MoveHeroTopCommand,
  MoveHeroBottomCommand,
  StopMoveYHeroCommand,
  StopMoveHeroCommand,
  MoveHeroLeftCommand,
  MoveHeroRightCommand,
  StopMoveXHeroCommand,
} from "@features";
import { Input } from "phaser";

const MockKeybordHandlerBinder = {
  bindMoveTopKey: vi.fn(),
  bindMoveBottomKey: vi.fn(),
  bindMoveRightKey: vi.fn(),
  bindMoveLeftKey: vi.fn(),
  bindMoveTopCommand: vi.fn(),
  bindMoveBottomCommand: vi.fn(),
  bindStopMoveYCommand: vi.fn(),
  bindMoveLeftCommand: vi.fn(),
  bindMoveRightCommand: vi.fn(),
  bindStopMoveXCommand: vi.fn(),
  bindStopMoveCommand: vi.fn(),
  executeKeyCommands: vi.fn(),
};

vi.mock("phaser", () => {
  return {
    Input: { Keyboard: { KeyCodes: { W: 86, A: 12, S: 13, D: 34 } } },
  };
});

vi.mock("@features", async (importModules) => {
  const featureModule: Record<string, unknown> = await importModules();
  return {
    ...featureModule,
    MoveHeroTopCommand: vi.fn().mockImplementation(() => ({})),
    MoveHeroBottomCommand: vi.fn().mockImplementation(() => ({})),
    StopMoveYHeroCommand: vi.fn().mockImplementation(() => ({})),
    MoveHeroLeftCommand: vi.fn().mockImplementation(() => ({})),
    MoveHeroRightCommand: vi.fn().mockImplementation(() => ({})),
    StopMoveXHeroCommand: vi.fn().mockImplementation(() => ({})),
    StopMoveHeroCommand: vi.fn().mockImplementation(() => ({})),
  };
});

describe("Спецификация компонента RusHeroKeyboardBinder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Биндится клавиша W под движение наверх", () => {
    new RusHeroKeyboardBinder(
      {} as unknown as IRusHeroState,
      MockKeybordHandlerBinder
    );

    expect(MockKeybordHandlerBinder.bindMoveTopKey).toBeCalledTimes(1);
    expect(MockKeybordHandlerBinder.bindMoveTopKey).toBeCalledWith(
      Input.Keyboard.KeyCodes.W
    );
  });
  test("Биндится клавиша S под движение вниз", () => {
    new RusHeroKeyboardBinder(
      {} as unknown as IRusHeroState,
      MockKeybordHandlerBinder
    );

    expect(MockKeybordHandlerBinder.bindMoveBottomKey).toBeCalledTimes(1);
    expect(MockKeybordHandlerBinder.bindMoveBottomKey).toBeCalledWith(
      Input.Keyboard.KeyCodes.S
    );
  });
  test("Биндится клавиша D под движение вправо", () => {
    new RusHeroKeyboardBinder(
      {} as unknown as IRusHeroState,
      MockKeybordHandlerBinder
    );

    expect(MockKeybordHandlerBinder.bindMoveRightKey).toBeCalledTimes(1);
    expect(MockKeybordHandlerBinder.bindMoveRightKey).toBeCalledWith(
      Input.Keyboard.KeyCodes.D
    );
  });
  test("Биндится клавиша A под движение влево", () => {
    new RusHeroKeyboardBinder(
      {} as unknown as IRusHeroState,
      MockKeybordHandlerBinder
    );

    expect(MockKeybordHandlerBinder.bindMoveLeftKey).toBeCalledTimes(1);
    expect(MockKeybordHandlerBinder.bindMoveLeftKey).toBeCalledWith(
      Input.Keyboard.KeyCodes.A
    );
  });
  test("Создается команда 'движения вверх' с переданным героем", () => {
    const hero = {} as unknown as IRusHeroState;
    new RusHeroKeyboardBinder(hero, MockKeybordHandlerBinder);

    expect(MoveHeroTopCommand).toBeCalledTimes(1);
    expect(MoveHeroTopCommand).toBeCalledWith(hero);
  });
  test("Создается команда 'движения вниз' с переданным героем", () => {
    const hero = {} as unknown as IRusHeroState;
    new RusHeroKeyboardBinder(hero, MockKeybordHandlerBinder);

    expect(MoveHeroBottomCommand).toBeCalledTimes(1);
    expect(MoveHeroBottomCommand).toBeCalledWith(hero);
  });
  test("Создается команда 'остановить движение по вертикали' с переданным героем", () => {
    const hero = {} as unknown as IRusHeroState;
    new RusHeroKeyboardBinder(hero, MockKeybordHandlerBinder);

    expect(StopMoveYHeroCommand).toBeCalledTimes(1);
    expect(StopMoveYHeroCommand).toBeCalledWith(hero);
  });
  test("Создается команда 'движение влево' с переданным героем", () => {
    const hero = {} as unknown as IRusHeroState;
    new RusHeroKeyboardBinder(hero, MockKeybordHandlerBinder);

    expect(MoveHeroLeftCommand).toBeCalledTimes(1);
    expect(MoveHeroLeftCommand).toBeCalledWith(hero);
  });
  test("Создается команда 'движение вправо' с переданным героем", () => {
    const hero = {} as unknown as IRusHeroState;
    new RusHeroKeyboardBinder(hero, MockKeybordHandlerBinder);

    expect(MoveHeroRightCommand).toBeCalledTimes(1);
    expect(MoveHeroRightCommand).toBeCalledWith(hero);
  });
  test("Создается команда 'остановить движение по горизонтали' с переданным героем", () => {
    const hero = {} as unknown as IRusHeroState;
    new RusHeroKeyboardBinder(hero, MockKeybordHandlerBinder);

    expect(StopMoveXHeroCommand).toBeCalledTimes(1);
    expect(StopMoveXHeroCommand).toBeCalledWith(hero);
  });
  test("Создается команда 'остановиться полностью' с переданным героем", () => {
    const hero = {} as unknown as IRusHeroState;
    new RusHeroKeyboardBinder(hero, MockKeybordHandlerBinder);

    expect(StopMoveHeroCommand).toBeCalledTimes(1);
    expect(StopMoveHeroCommand).toBeCalledWith(hero);
  });

  test("Биндится команда 'движения вверх'", () => {
    const hero = {} as unknown as IRusHeroState;
    new RusHeroKeyboardBinder(hero, MockKeybordHandlerBinder);
    const MockMoveHeroTopCommand = MoveHeroTopCommand as ReturnType<
      typeof vi.fn
    >;

    const topCommand = MockMoveHeroTopCommand.mock.results[0].value;

    expect(MockKeybordHandlerBinder.bindMoveTopCommand).toBeCalledTimes(1);
    expect(MockKeybordHandlerBinder.bindMoveTopCommand).toBeCalledWith(
      topCommand
    );
  });
  test("Биндится команда 'движения вниз'", () => {
    const hero = {} as unknown as IRusHeroState;
    new RusHeroKeyboardBinder(hero, MockKeybordHandlerBinder);
    const MoveHeroBottomCommand = MoveHeroTopCommand as ReturnType<
      typeof vi.fn
    >;

    const bottomCommand = MoveHeroBottomCommand.mock.results[0].value;

    expect(MockKeybordHandlerBinder.bindMoveBottomCommand).toBeCalledTimes(1);
    expect(MockKeybordHandlerBinder.bindMoveBottomCommand).toBeCalledWith(
      bottomCommand
    );
  });
  test("Биндится команда 'остановить движение по вертикали'", () => {
    const hero = {} as unknown as IRusHeroState;
    new RusHeroKeyboardBinder(hero, MockKeybordHandlerBinder);
    const MoveStopMoveYHeroCommand = StopMoveYHeroCommand as ReturnType<
      typeof vi.fn
    >;

    const stopYCommand = MoveStopMoveYHeroCommand.mock.results[0].value;

    expect(MockKeybordHandlerBinder.bindStopMoveYCommand).toBeCalledTimes(1);
    expect(MockKeybordHandlerBinder.bindStopMoveYCommand).toBeCalledWith(
      stopYCommand
    );
  });
  test("Биндится команда 'движение влево'", () => {
    const hero = {} as unknown as IRusHeroState;
    new RusHeroKeyboardBinder(hero, MockKeybordHandlerBinder);
    const MoveLeftCommand = MoveHeroLeftCommand as ReturnType<typeof vi.fn>;

    const moveLeftCommand = MoveLeftCommand.mock.results[0].value;

    expect(MockKeybordHandlerBinder.bindMoveLeftCommand).toBeCalledTimes(1);
    expect(MockKeybordHandlerBinder.bindMoveLeftCommand).toBeCalledWith(
      moveLeftCommand
    );
  });
  test("Биндится команда 'движение вправо'", () => {
    const hero = {} as unknown as IRusHeroState;
    new RusHeroKeyboardBinder(hero, MockKeybordHandlerBinder);
    const MoveRightCommand = MoveHeroRightCommand as ReturnType<typeof vi.fn>;

    const moveRightCommand = MoveRightCommand.mock.results[0].value;

    expect(MockKeybordHandlerBinder.bindMoveRightCommand).toBeCalledTimes(1);
    expect(MockKeybordHandlerBinder.bindMoveRightCommand).toBeCalledWith(
      moveRightCommand
    );
  });
  test("Биндится команда 'остановить движение по горизонтали'", () => {
    const hero = {} as unknown as IRusHeroState;
    new RusHeroKeyboardBinder(hero, MockKeybordHandlerBinder);
    const StopMoveXCommand = StopMoveXHeroCommand as ReturnType<typeof vi.fn>;

    const stopMoveXCommand = StopMoveXCommand.mock.results[0].value;

    expect(MockKeybordHandlerBinder.bindStopMoveXCommand).toBeCalledTimes(1);
    expect(MockKeybordHandlerBinder.bindStopMoveXCommand).toBeCalledWith(
      stopMoveXCommand
    );
  });
  test("Биндится команда 'остановить движение'", () => {
    const hero = {} as unknown as IRusHeroState;
    new RusHeroKeyboardBinder(hero, MockKeybordHandlerBinder);
    const StopMoveCommand = StopMoveXHeroCommand as ReturnType<typeof vi.fn>;

    const stopMoveXCommand = StopMoveCommand.mock.results[0].value;

    expect(MockKeybordHandlerBinder.bindStopMoveCommand).toBeCalledTimes(1);
    expect(MockKeybordHandlerBinder.bindStopMoveCommand).toBeCalledWith(
      stopMoveXCommand
    );
  });
  test("Метод getKeyboard() возвращает инстанс клавиатуры", () => {
    const hero = {} as unknown as IRusHeroState;
    const keyboardHandler = new RusHeroKeyboardBinder(
      hero,
      MockKeybordHandlerBinder
    );

    const keyboard = keyboardHandler.getKeyboard();

    expect(keyboard === MockKeybordHandlerBinder).toBeTruthy();
  });
});
