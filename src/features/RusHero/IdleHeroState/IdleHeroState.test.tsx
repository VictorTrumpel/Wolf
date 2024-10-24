import { describe, test, expect, vi } from "vitest";
import { IdleHeroState } from "./IdleHeroState";
import { RusHeroContext } from "../RusHeroContext/RusHeroContext";

describe("спецификация компонента IdleHeroState", () => {
  test(`
    Вызов метода moveBottom() 
    - получает состояние MovingHeroState
    - вызывает на состоянии метод moveBottom
    - устанавливает в контекст состояние MovingHeroState
  `, () => {
    const MockMoveHeroState = {
      moveBottom: vi.fn(),
    };

    const MockContext = {
      getMovingHeroState: vi.fn(() => MockMoveHeroState),
      setState: vi.fn(),
    };

    const idleHeroState = new IdleHeroState(
      MockContext as unknown as RusHeroContext
    );

    idleHeroState.moveBottom();

    expect(MockContext.getMovingHeroState).toBeCalledTimes(1);
    expect(MockMoveHeroState.moveBottom).toBeCalledTimes(1);
    expect(MockContext.setState).toBeCalledTimes(1);

    const settedState = MockContext.setState.mock.calls[0][0];

    expect(MockMoveHeroState === settedState).toBeTruthy();
  });

  test(`
    Вызов метода moveLeft() 
    - получает состояние MovingHeroState
    - вызывает на состоянии метод moveLeft
    - устанавливает в контекст состояние MovingHeroState
  `, () => {
    const MockMoveHeroState = {
      moveLeft: vi.fn(),
    };

    const MockContext = {
      getMovingHeroState: vi.fn(() => MockMoveHeroState),
      setState: vi.fn(),
    };

    const idleHeroState = new IdleHeroState(
      MockContext as unknown as RusHeroContext
    );

    idleHeroState.moveLeft();

    expect(MockContext.getMovingHeroState).toBeCalledTimes(1);
    expect(MockMoveHeroState.moveLeft).toBeCalledTimes(1);
    expect(MockContext.setState).toBeCalledTimes(1);

    const settedState = MockContext.setState.mock.calls[0][0];

    expect(MockMoveHeroState === settedState).toBeTruthy();
  });

  test(`
    Вызов метода moveTop() 
    - получает состояние MovingHeroState
    - вызывает на состоянии метод moveTop
    - устанавливает в контекст состояние MovingHeroState
  `, () => {
    const MockMoveHeroState = {
      moveTop: vi.fn(),
    };

    const MockContext = {
      getMovingHeroState: vi.fn(() => MockMoveHeroState),
      setState: vi.fn(),
    };

    const idleHeroState = new IdleHeroState(
      MockContext as unknown as RusHeroContext
    );

    idleHeroState.moveTop();

    expect(MockContext.getMovingHeroState).toBeCalledTimes(1);
    expect(MockMoveHeroState.moveTop).toBeCalledTimes(1);
    expect(MockContext.setState).toBeCalledTimes(1);

    const settedState = MockContext.setState.mock.calls[0][0];

    expect(MockMoveHeroState === settedState).toBeTruthy();
  });

  test(`
    Вызов метода moveRight() 
    - получает состояние MovingHeroState
    - вызывает на состоянии метод moveRight
    - устанавливает в контекст состояние MovingHeroState
  `, () => {
    const MockMoveHeroState = {
      moveRight: vi.fn(),
    };

    const MockContext = {
      getMovingHeroState: vi.fn(() => MockMoveHeroState),
      setState: vi.fn(),
    };

    const idleHeroState = new IdleHeroState(
      MockContext as unknown as RusHeroContext
    );

    idleHeroState.moveRight();

    expect(MockContext.getMovingHeroState).toBeCalledTimes(1);
    expect(MockMoveHeroState.moveRight).toBeCalledTimes(1);
    expect(MockContext.setState).toBeCalledTimes(1);

    const settedState = MockContext.setState.mock.calls[0][0];

    expect(MockMoveHeroState === settedState).toBeTruthy();
  });

  test("При вызове метода stopMoving() на спрайте внутри контекста вызывается метод stopMoving() и playIdle()", () => {
    const MockSprote = {
      stopMoving: vi.fn(),
      playIdle: vi.fn(),
    };

    const MockContext = {
      getSprite: vi.fn(() => MockSprote),
    };

    const idleHeroState = new IdleHeroState(
      MockContext as unknown as RusHeroContext
    );

    idleHeroState.stopMoving();

    expect(MockContext.getSprite).toBeCalledTimes(1);
    expect(MockSprote.stopMoving).toBeCalledTimes(1);
    expect(MockSprote.playIdle).toBeCalledTimes(1);
  });
});
