import { mockAccount, throwError } from '@/tests/domain/mocks'
import { DesactiveAccountUseCase } from '@/domain/usecases/account'
import { DesactiveAccountRepository } from '@/domain/protocols/repositories/account'
import { mock, MockProxy } from 'jest-mock-extended'

describe('DesactiveAccount Usecase', () => {
  let sut: DesactiveAccountUseCase
  let desactiveAccountRepository: MockProxy<DesactiveAccountRepository>
  const accountParams = mockAccount()

  beforeEach(() => {
    desactiveAccountRepository = mock()
    desactiveAccountRepository.desactive.mockResolvedValue(true)
    sut = new DesactiveAccountUseCase(desactiveAccountRepository)
  })
  test('Should call DesactiveAccountRepository with correct values', async () => {
    await sut.desactive(accountParams.accountId)
    expect(desactiveAccountRepository.desactive).toHaveBeenCalledWith(accountParams.accountId)
    expect(desactiveAccountRepository.desactive).toHaveBeenCalledTimes(1)
  })

  test('Should throw if DesactiveAccountRepository throws', async () => {
    desactiveAccountRepository.desactive.mockImplementationOnce(throwError)
    const promise = sut.desactive(accountParams.accountId)
    await expect(promise).rejects.toThrow()
  })

  test('Shold return DesactiveAccountRepository on success', async () => {
    const result = await sut.desactive(accountParams.accountId)
    const repositoryResult = await desactiveAccountRepository.desactive(accountParams.accountId)

    expect(repositoryResult).toBe(result)
  })
})
