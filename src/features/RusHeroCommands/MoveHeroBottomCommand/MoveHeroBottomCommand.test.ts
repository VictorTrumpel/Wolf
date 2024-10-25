import { describe, test, vi, expect } from "vitest";
import { MoveHeroBottomCommand } from "./MoveHeroBottomCommand";
import type { IRusHeroState } from "@entities";

describe("Спецификация компонента MoveHeroBottomCommand", () => {
  test("Метод execute вызывает метод moveBottom на состоянии героя", () => {
    const heroState = { moveBottom: vi.fn() } as unknown as IRusHeroState;
    const bottomCommand = new MoveHeroBottomCommand(heroState);
    bottomCommand.execute();

    expect(heroState.moveBottom).toBeCalledTimes(1);
  });
});
