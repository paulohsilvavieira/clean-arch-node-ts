import { mockCreateAccount } from '../../mocks/mock-account'
import { throwError } from '../../mocks/test-helper'
import { CreateAccountUseCase } from '@/domain/usecases/account'
import { MockProxy, mock } from 'jest-mock-extended'
import { CreateAccountRepository } from '@/domain/protocols/repositories/account'

describe('CreateAccount Usecase', () => {
  let sut: CreateAccountUseCase
  let createAccountRepository: MockProxy<CreateAccountRepository>
  const infoParams = mockCreateAccount()

  beforeEach(() => {
    createAccountRepository = mock()
    createAccountRepository.create.mockResolvedValue(true)
    sut = new CreateAccountUseCase(createAccountRepository)
  })
  test('Should call CreateAccountRepositorySpy with correct values', async () => {
    await sut.execute(infoParams)
    expect(createAccountRepository.create).toHaveBeenCalledWith(infoParams)
    expect(createAccountRepository.create).toHaveBeenCalledTimes(1)
  })

  test('Should throw if CreateAccountRepositorySpy throws', async () => {
    createAccountRepository.create.mockRejectedValueOnce(throwError)
    const promise = sut.execute(infoParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return CreateAccountRepository on success', async () => {
    const result = await sut.execute(infoParams)
    expect(result).toEqual(
      {
        success: true,
        errors: null
      }
    )
  })
})
