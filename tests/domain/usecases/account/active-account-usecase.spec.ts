import { ActiveAccountUseCase } from '@/domain/usecases/account'
import { mockAccount, throwError } from '@/tests/domain/mocks'
import { mock, MockProxy } from 'jest-mock-extended'
import { ActiveAccountRepository } from '@/domain/protocols/repositories/account'

describe('ActiveAccount Usecase', () => {
  let sut: ActiveAccountUseCase
  let activeAccountRepository: MockProxy<ActiveAccountRepository>

  beforeEach(() => {
    activeAccountRepository = mock()
    activeAccountRepository.active.mockResolvedValue(true)
    sut = new ActiveAccountUseCase(activeAccountRepository)
  })
  test('Should call ActiveAccountRepositorySpy with correct values', async () => {
    const accountParams = mockAccount()

    await sut.active(accountParams.accountId)
    expect(activeAccountRepository.active).toHaveBeenCalledWith(
      accountParams.accountId
    )
    expect(activeAccountRepository.active).toHaveBeenCalledTimes(1)
  })

  test('Should throw if ActiveAccountRepository throws', async () => {
    activeAccountRepository.active.mockImplementationOnce(throwError)
    const accountParams = mockAccount()
    const promise = sut.active(accountParams.accountId)
    await expect(promise).rejects.toThrow()
  })

  test('Shold return ActiveAccountRepository on success', async () => {
    const accountParams = mockAccount()
    const result = await sut.active(accountParams.accountId)
    expect(await activeAccountRepository.active(accountParams.accountId)).toBe(
      result
    )
  })
})
