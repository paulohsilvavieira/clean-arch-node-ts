import { throwError } from '@/tests/domain/mocks/test-helper'
import { mockDisapproveAccount } from '@/tests/domain/mocks/mock-account'

import { DisapproveAccountUseCase } from '@/domain/usecases/account'
import { mock, MockProxy } from 'jest-mock-extended'
import { DisapproveAccountRepository } from '@/domain/protocols/repositories/account'

describe('DispproveAccount Usecase', () => {
  let sut: DisapproveAccountUseCase
  let disapproveAccountRepository: MockProxy<DisapproveAccountRepository>
  const accountParams = mockDisapproveAccount()

  beforeEach(() => {
    disapproveAccountRepository = mock()
    disapproveAccountRepository.disapprove.mockResolvedValue(true)
    sut = new DisapproveAccountUseCase(disapproveAccountRepository)
  })
  test('Should call DispproveAccountRepository with correct values', async () => {
    await sut.disapprove(accountParams)
    expect(disapproveAccountRepository.disapprove).toHaveBeenCalledWith(accountParams)
    expect(disapproveAccountRepository.disapprove).toHaveBeenCalledTimes(1)
  })

  test('Should throw if DisapproveAccountRepositorySpy throws', async () => {
    disapproveAccountRepository.disapprove.mockRejectedValueOnce(throwError)

    const promise = sut.disapprove(accountParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return DisapproveAccountRepositorySpy on success', async () => {
    const accountParams = mockDisapproveAccount()

    const result = await sut.disapprove(accountParams)
    expect(await disapproveAccountRepository.disapprove(accountParams)).toBe(
      result
    )
  })
})
