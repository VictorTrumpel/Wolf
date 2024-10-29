import { Scene } from 'phaser'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { RusHeroSprite } from './RusHeroSprite'

vi.mock('../../shared/PhysicsSprite', () => {
  class PhysicsSprite {
    width = 200
    setScale = vi.fn()
    body = {
      setCircle: vi.fn(),
      setVelocityX: vi.fn(),
      setVelocityY: vi.fn(),
      setVelocity: vi.fn(),
    }
    getBody() {
      return this.body
    }
    play = vi.fn()
    anims = {
      generateFrameNames: vi.fn((...args) => args),
      create: vi.fn(),
    }
  }

  return {
    PhysicsSprite,
  }
})

describe('Спецификация класса RusHeroSprite', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('Когда создается инстанс RusHero, то он увеличивается в 2 раза', () => {
    const hero = new RusHeroSprite({} as unknown as Scene, 0, 0)

    expect(hero.setScale).toBeCalledTimes(1)
    expect(hero.setScale).toBeCalledWith(2)
  })
  test(`
    Когда создается инстанс RusHero, ему присваивется круглый хитбокс, радиусом в половину ширины / 2.5,
    и отступами 2px по X и 4px по Y
  `, () => {
    const hero = new RusHeroSprite({} as unknown as Scene, 0, 0)

    const heroWidth = hero.width

    // @ts-ignore
    expect(hero.body.setCircle).toBeCalledTimes(1)
    // @ts-ignore
    expect(hero.body.setCircle).toBeCalledWith(heroWidth / 2.5, 4, 4)
  })
  test('Когда создается инстанс RusHero, то первой создается анимация покоя', () => {
    const hero = new RusHeroSprite({} as unknown as Scene, 0, 0)

    const mockCreate = hero.anims.create as ReturnType<typeof vi.fn>

    const mockGenerateFrames = hero.anims.generateFrameNames as ReturnType<typeof vi.fn>

    const frames = mockGenerateFrames.mock.calls[0]

    expect(mockCreate.mock.calls[0][0].key).toBe('idle')
    expect(mockCreate.mock.calls[0][0].frames).toStrictEqual(frames)
  })
  test('Когда создается инстанс RusHero, то после анимации покоя создается анимация бега', () => {
    const hero = new RusHeroSprite({} as unknown as Scene, 0, 0)

    const mockCreate = hero.anims.create as ReturnType<typeof vi.fn>

    const mockGenerateFrames = hero.anims.generateFrameNames as ReturnType<typeof vi.fn>

    const frames = mockGenerateFrames.mock.calls[1]

    expect(mockCreate.mock.calls[1][0].key).toBe('run')
    expect(mockCreate.mock.calls[1][0].frames).toStrictEqual(frames)
  })
  test('При вызове метода playIdle() вызывается метод play с анимацией покоя', () => {
    const rusHero = new RusHeroSprite({} as unknown as Scene, 0, 0)
    rusHero.playIdle()

    expect(rusHero.play).toBeCalledTimes(1)
    expect(rusHero.play).toBeCalledWith('idle', true)
  })
  test('При вызове метода playRun() вызывается метод play с анимацией бега', () => {
    const rusHero = new RusHeroSprite({} as unknown as Scene, 0, 0)
    rusHero.playRun()

    expect(rusHero.play).toBeCalledTimes(1)
    expect(rusHero.play).toBeCalledWith('run', true)
  })
  test('При вызове moveX(), body спрайта начинает двигаться с переданной скоростью по оси X', () => {
    const rusHero = new RusHeroSprite({} as unknown as Scene, 0, 0)

    rusHero.moveX(200)

    // @ts-ignore
    expect(rusHero.body.setVelocityX).toBeCalledTimes(1)
    // @ts-ignore
    expect(rusHero.body.setVelocityX).toBeCalledWith(200)
  })
  test('При вызове moveY(), body спрайта начинает двигаться с переданной скоростью по оси Y', () => {
    const rusHero = new RusHeroSprite({} as unknown as Scene, 0, 0)

    rusHero.moveY(200)

    // @ts-ignore
    expect(rusHero.body.setVelocityY).toBeCalledTimes(1)
    // @ts-ignore
    expect(rusHero.body.setVelocityY).toBeCalledWith(200)
  })
  test('Метод stopMoving() останавливает персонажа', () => {
    const rusHero = new RusHeroSprite({} as unknown as Scene, 0, 0)

    rusHero.stopMoving()

    // @ts-ignore
    expect(rusHero.body.setVelocity).toBeCalledTimes(1)
  })
  test('Метод stopMoveY() останавливает движение персонажа по оси Y', () => {
    const rusHero = new RusHeroSprite({} as unknown as Scene, 0, 0)

    rusHero.stopMoveY()

    // @ts-ignore
    expect(rusHero.body.setVelocityY).toBeCalledTimes(1)
    // @ts-ignore
    expect(rusHero.body.setVelocityY).toBeCalledWith(0)
  })
  test('Метод stopMoveX() останавливает движение персонажа по оси X', () => {
    const rusHero = new RusHeroSprite({} as unknown as Scene, 0, 0)

    rusHero.stopMoveX()

    // @ts-ignore
    expect(rusHero.body.setVelocityX).toBeCalledTimes(1)
    // @ts-ignore
    expect(rusHero.body.setVelocityX).toBeCalledWith(0)
  })
})
