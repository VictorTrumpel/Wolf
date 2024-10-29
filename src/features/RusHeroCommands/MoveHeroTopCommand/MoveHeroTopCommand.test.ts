import { describe, expect, test, vi } from 'vitest'
import type { IRusHeroState } from '@entities'
import { MoveHeroTopCommand } from './MoveHeroTopCommand'

describe('Спецификация класса MoveHeroTopCommand', () => {
  test('Команда execut() выполняет метод moveTop() на состоянии героя', () => {
    const heroState = { moveTop: vi.fn() } as unknown as IRusHeroState
    const moveTopCommand = new MoveHeroTopCommand(heroState)
    moveTopCommand.execute()

    expect(heroState.moveTop).toBeCalledTimes(1)
  })
})
