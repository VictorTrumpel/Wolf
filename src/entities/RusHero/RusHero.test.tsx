import { describe, test, vi, expect, beforeEach } from "vitest";
import { RusHero } from "./RusHero";
import { Scene } from "phaser";

vi.mock("../../shared/PhysicsSprite", () => {
  class PhysicsSprite {
    width = 200;
    setScale = vi.fn();
    body = {
      setCircle: vi.fn(),
    };
    play = vi.fn();
    anims = {
      generateFrameNames: vi.fn((...args) => args),
      create: vi.fn(),
    };
  }

  return {
    PhysicsSprite,
  };
});

describe("Спецификация класса RusHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Когда создается инстанс RusHero, то он увеличивается в 2 раза", () => {
    const hero = new RusHero({} as unknown as Scene, 0, 0);

    expect(hero.setScale).toBeCalledTimes(1);
    expect(hero.setScale).toBeCalledWith(2);
  });
  test(`
    Когда создается инстанс RusHero, ему присваивется круглый хитбокс, радиусом в половину ширины / 2.5,
    и отступами 2px по X и 4px по Y
  `, () => {
    const hero = new RusHero({} as unknown as Scene, 0, 0);

    const heroWidth = hero.width;

    // @ts-ignore
    expect(hero.body.setCircle).toBeCalledTimes(1);
    // @ts-ignore
    expect(hero.body.setCircle).toBeCalledWith(heroWidth / 2.5, 2, 4);
  });
  test("Когда создается инстанс RusHero, то первой создается анимация покоя", () => {
    const hero = new RusHero({} as unknown as Scene, 0, 0);

    const mockCreate = hero.anims.create as ReturnType<typeof vi.fn>;

    const mockGenerateFrames = hero.anims.generateFrameNames as ReturnType<
      typeof vi.fn
    >;

    const frames = mockGenerateFrames.mock.calls[0];

    expect(mockCreate.mock.calls[0][0].key).toBe("idle");
    expect(mockCreate.mock.calls[0][0].frames).toStrictEqual(frames);
  });
  test("Когда создается инстанс RusHero, то после анимации покоя создается анимация бега", () => {
    const hero = new RusHero({} as unknown as Scene, 0, 0);

    const mockCreate = hero.anims.create as ReturnType<typeof vi.fn>;

    const mockGenerateFrames = hero.anims.generateFrameNames as ReturnType<
      typeof vi.fn
    >;

    const frames = mockGenerateFrames.mock.calls[1];

    expect(mockCreate.mock.calls[1][0].key).toBe("run");
    expect(mockCreate.mock.calls[1][0].frames).toStrictEqual(frames);
  });
  test("При вызове метода playIdle() вызывается метод play с анимацией покоя", () => {
    class Test extends RusHero {
      testIdle() {
        this.playIdle();
      }
    }

    const rusHero = new Test({} as unknown as Scene, 0, 0);
    rusHero.testIdle();

    expect(rusHero.play).toBeCalledTimes(1);
    expect(rusHero.play).toBeCalledWith("idle", true);
  });
  test("При вызове метода playRun() вызывается метод play с анимацией бега", () => {
    class Test extends RusHero {
      testRun() {
        this.playRun();
      }
    }

    const rusHero = new Test({} as unknown as Scene, 0, 0);
    rusHero.testRun();

    expect(rusHero.play).toBeCalledTimes(1);
    expect(rusHero.play).toBeCalledWith("run", true);
  });
});
