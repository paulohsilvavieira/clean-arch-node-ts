import { mockAccount } from '@/tests/domain/mocks/mock-account'
import { throwError } from '@/tests/domain/mocks/test-helper'
import { MockProxy ,mock } from 'jest-mock-extended'
import { ApproveAccountUseCase } from '@/domain/usecases/account'
import { ApproveAccountRepository } from '@/domain/protocols/repositories/account'

describe('ApproveAccount Usecase', () => {
  let sut: ApproveAccountUseCase
  let approveAccountRepository: MockProxy<ApproveAccountRepository>
  const accountParams = mockAccount()

  beforeEach(() => {
    approveAccountRepository = mock()
    approveAccountRepository.approve.mockResolvedValue(true)
    sut = new ApproveAccountUseCase(approveAccountRepository)
  })
  test('Should call ApproveAccountRepository with correct values', async () => {
    await sut.approve(accountParams.accountId)

    expect(approveAccountRepository.approve).toHaveBeenCalledWith(accountParams.accountId)
    expect(approveAccountRepository.approve).toHaveBeenCalledTimes(1)
  })

  test('Should throw if ApproveAccountRepository throws', async () => {
    approveAccountRepository.approve.mockImplementationOnce(throwError)
    const promise = sut.approve(accountParams.accountId)
    await expect(promise).rejects.toThrow()
  })

  test('Should return ApproveAccountRepository on success', async () => {
    const accountParams = mockAccount()

    const result = await sut.approve(accountParams.accountId)
    expect(await approveAccountRepository.approve(accountParams.accountId)).toBe(
      result
    )
  })
})
