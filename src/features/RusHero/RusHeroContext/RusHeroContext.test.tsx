import { describe, test, expect, vi } from "vitest";
import { RusHeroContext } from "./RusHeroContext";
import { RusHeroSprite } from "@entities";
import { IRusHeroState } from "../../../entities/IRusHeroState";
import { MovingHeroState } from "../MovingHeroState";
import { IdleHeroState } from "../IdleHeroState";

describe("Спецификация компонента RusHeroContext", () => {
  test("Метод setState и getState позволяют предсказуемо устанавливать и получать состояние", () => {
    const mockState = {} as unknown as IRusHeroState;
    const rusHeroContext = new RusHeroContext({} as unknown as RusHeroSprite);
    rusHeroContext.setState(mockState);
    expect(rusHeroContext.getState() === mockState).toBeTruthy();
  });
  test("Метод getSprite позволяет получить спрайт, который был передан в конструктор", () => {
    const mockSprite = {} as unknown as RusHeroSprite;
    const rusHeroContext = new RusHeroContext(mockSprite);
    expect(rusHeroContext.getSprite() === mockSprite).toBeTruthy();
  });
  test("Метод moveBottom() вызовет метод moveBottom() на текущем состоянии", () => {
    const mockState = { moveBottom: vi.fn() } as unknown as IRusHeroState;
    const rusHeroContext = new RusHeroContext({} as unknown as RusHeroSprite);
    rusHeroContext.setState(mockState);
    rusHeroContext.moveBottom();
    expect(mockState.moveBottom).toBeCalledTimes(1);
  });
  test("Метод moveTop() вызовет метод moveTop() на текущем состоянии", () => {
    const mockState = { moveTop: vi.fn() } as unknown as IRusHeroState;
    const rusHeroContext = new RusHeroContext({} as unknown as RusHeroSprite);
    rusHeroContext.setState(mockState);
    rusHeroContext.moveTop();
    expect(mockState.moveTop).toBeCalledTimes(1);
  });
  test("Метод moveLeft() вызовет метод moveLeft() на текущем состоянии", () => {
    const mockState = { moveLeft: vi.fn() } as unknown as IRusHeroState;
    const rusHeroContext = new RusHeroContext({} as unknown as RusHeroSprite);
    rusHeroContext.setState(mockState);
    rusHeroContext.moveLeft();
    expect(mockState.moveLeft).toBeCalledTimes(1);
  });
  test("Метод moveRight() вызовет метод moveRight() на текущем состоянии", () => {
    const mockState = { moveRight: vi.fn() } as unknown as IRusHeroState;
    const rusHeroContext = new RusHeroContext({} as unknown as RusHeroSprite);
    rusHeroContext.setState(mockState);
    rusHeroContext.moveRight();
    expect(mockState.moveRight).toBeCalledTimes(1);
  });
  test("Метод stopMoving() вызовет метод stopMoving() на текущем состоянии", () => {
    const mockState = { stopMoving: vi.fn() } as unknown as IRusHeroState;
    const rusHeroContext = new RusHeroContext({} as unknown as RusHeroSprite);
    rusHeroContext.setState(mockState);
    rusHeroContext.stopMoving();
    expect(mockState.stopMoving).toBeCalledTimes(1);
  });
  test("Метод attack() вызовет метод attack() на текущем состоянии", () => {
    const mockState = { attack: vi.fn() } as unknown as IRusHeroState;
    const rusHeroContext = new RusHeroContext({} as unknown as RusHeroSprite);
    rusHeroContext.setState(mockState);
    rusHeroContext.attack();
    expect(mockState.attack).toBeCalledTimes(1);
  });
  test("Метод getHurt() вызовет метод getHurt() на текущем состоянии", () => {
    const mockState = { getHurt: vi.fn() } as unknown as IRusHeroState;
    const rusHeroContext = new RusHeroContext({} as unknown as RusHeroSprite);
    rusHeroContext.setState(mockState);
    rusHeroContext.getHurt();
    expect(mockState.getHurt).toBeCalledTimes(1);
  });
  test("Метод stopMovingX() вызовет метод stopMovingX() на текущем состоянии", () => {
    const mockState = { stopMovingX: vi.fn() } as unknown as IRusHeroState;
    const rusHeroContext = new RusHeroContext({} as unknown as RusHeroSprite);
    rusHeroContext.setState(mockState);
    rusHeroContext.stopMovingX();
    expect(mockState.stopMovingX).toBeCalledTimes(1);
  });
  test("Метод stopMovingY() вызовет метод stopMovingX() на текущем состоянии", () => {
    const mockState = { stopMovingY: vi.fn() } as unknown as IRusHeroState;
    const rusHeroContext = new RusHeroContext({} as unknown as RusHeroSprite);
    rusHeroContext.setState(mockState);
    rusHeroContext.stopMovingY();
    expect(mockState.stopMovingY).toBeCalledTimes(1);
  });
  test("Метод getMovingHeroState() возвращает состояние типа MovingHeroState", () => {
    const rusHeroContext = new RusHeroContext({} as unknown as RusHeroSprite);
    const movingState = rusHeroContext.getMovingHeroState();
    expect(movingState instanceof MovingHeroState).toBeTruthy();
  });
  test("Метод getIdleHeroState() возвращает состояние типа IdleHeroState", () => {
    const rusHeroContext = new RusHeroContext({} as unknown as RusHeroSprite);
    const idleState = rusHeroContext.getIdleHeroState();
    expect(idleState instanceof IdleHeroState).toBeTruthy();
  });
});
