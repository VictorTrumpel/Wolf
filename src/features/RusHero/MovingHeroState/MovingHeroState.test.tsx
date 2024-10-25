import { describe, test, vi, expect } from "vitest";
import { MovingHeroState } from "./MovingHeroState";
import { RusHeroContext } from "../RusHeroContext/RusHeroContext";

describe("Спецификация класса MovingHeroState", () => {
  test(`
    При вызове moveBottom(), из контекста достается спрайт персонажа и на нем вызывается метод 
    - moveY() для перемещение тела
    - playRun() для проигрывания анимации бега
  `, () => {
    const SpriteContext = {
      moveY: vi.fn(),
      playRun: vi.fn(),
    };

    const MockHeroContext = {
      getSprite: vi.fn(() => SpriteContext),
    };

    const movingHeroState = new MovingHeroState(
      MockHeroContext as unknown as RusHeroContext
    );

    movingHeroState.moveBottom();

    expect(MockHeroContext.getSprite).toBeCalledTimes(1);
    expect(SpriteContext.moveY).toBeCalledTimes(1);
    expect(SpriteContext.playRun).toBeCalledTimes(1);
  });

  test(`
    При вызове moveTop(), из контекста достается спрайт персонажа и на нем вызывается метод 
    - moveY() для перемещения тела
    - playRun() для проигрывания анимации бега
  `, () => {
    const SpriteContext = {
      moveY: vi.fn(),
      playRun: vi.fn(),
    };

    const MockHeroContext = {
      getSprite: vi.fn(() => SpriteContext),
    };

    const movingHeroState = new MovingHeroState(
      MockHeroContext as unknown as RusHeroContext
    );

    movingHeroState.moveTop();

    expect(MockHeroContext.getSprite).toBeCalledTimes(1);
    expect(SpriteContext.moveY).toBeCalledTimes(1);
    expect(SpriteContext.playRun).toBeCalledTimes(1);
  });

  test(`
    При вызове moveLeft(), из контекста достается спрайт персонажа и на нем вызывается метод 
    - moveX() для перемещения тела
    - вызывается метод playRun() для проигрывания анимации бега
    - разворачивается лицом в отрицательное направление оси X
  `, () => {
    const SpriteContext = {
      moveX: vi.fn(),
      playRun: vi.fn(),
      flipX: false,
    };

    const MockHeroContext = {
      getSprite: vi.fn(() => SpriteContext),
    };

    const movingHeroState = new MovingHeroState(
      MockHeroContext as unknown as RusHeroContext
    );

    movingHeroState.moveLeft();

    expect(MockHeroContext.getSprite).toBeCalledTimes(1);
    expect(SpriteContext.moveX).toBeCalledTimes(1);
    expect(SpriteContext.playRun).toBeCalledTimes(1);
    expect(SpriteContext.flipX).toBeTruthy();
  });

  test(`
    При вызове moveRight(), из контекста достается спрайт персонажа и на нем вызывается метод 
    - moveX() для перемещения тела
    - вызывается метод playRun() для проигрывания анимации бега
    - разворачивается лицом в положительное направление оси X
  `, () => {
    const SpriteContext = {
      moveX: vi.fn(),
      playRun: vi.fn(),
      flipX: true,
    };

    const MockHeroContext = {
      getSprite: vi.fn(() => SpriteContext),
    };

    const movingHeroState = new MovingHeroState(
      MockHeroContext as unknown as RusHeroContext
    );

    movingHeroState.moveRight();

    expect(MockHeroContext.getSprite).toBeCalledTimes(1);
    expect(SpriteContext.moveX).toBeCalledTimes(1);
    expect(SpriteContext.playRun).toBeCalledTimes(1);
    expect(SpriteContext.flipX).toBeFalsy();
  });

  test(`
    При вызове метода stopMoving() происходит смена состояние на IdleHeroState и на этом состоянии сразу же вызывается метод stopMoving()
  `, () => {
    const MockIdleHeroState = {
      stopMoving: vi.fn(),
    };

    const MockHeroContext = {
      getIdleHeroState: vi.fn(() => MockIdleHeroState),
      setState: vi.fn(),
    };

    const movingHeroState = new MovingHeroState(
      MockHeroContext as unknown as RusHeroContext
    );

    movingHeroState.stopMoving();

    expect(MockHeroContext.getIdleHeroState).toBeCalledTimes(1);
    expect(MockHeroContext.setState).toBeCalledTimes(1);
    expect(
      MockHeroContext.setState.mock.calls[0][0] ===
        MockHeroContext.getIdleHeroState.mock.results[0].value
    ).toBeTruthy();
    expect(MockIdleHeroState.stopMoving).toBeCalledTimes(1);
  });

  test("При вызове метода stopMovingX() на спрайте вызывается метод stopMovingX()", () => {
    const MockSprite = {
      stopMoveX: vi.fn(),
    };

    const MockContext = {
      getSprite: vi.fn(() => MockSprite),
    };

    const movingHeroState = new MovingHeroState(
      MockContext as unknown as RusHeroContext
    );

    movingHeroState.stopMovingX();

    expect(MockContext.getSprite).toBeCalledTimes(1);
    expect(MockSprite.stopMoveX).toBeCalledTimes(1);
  });

  test("При вызове метода stopMovingY() на спрайте вызывается метод stopMovingY()", () => {
    const MockSprote = {
      stopMoveY: vi.fn(),
    };

    const MockContext = {
      getSprite: vi.fn(() => MockSprote),
    };

    const movingHeroState = new MovingHeroState(
      MockContext as unknown as RusHeroContext
    );

    movingHeroState.stopMovingY();

    expect(MockContext.getSprite).toBeCalledTimes(1);
    expect(MockSprote.stopMoveY).toBeCalledTimes(1);
  });
});
