import { describe, test, expect } from "vitest";
import { RusHeroContext } from "./RusHeroContext";
import { RusHeroSprite } from "@entities";
import { IRusHeroState } from "../IRusHeroState";

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
});
