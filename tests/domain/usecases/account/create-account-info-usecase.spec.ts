import { mockCreateAccount } from '../../mocks/mock-account'
import { throwError } from '../../mocks/test-helper'
import { CreateAccountUseCase } from '@/domain/usecases/account'
import { MockProxy, mock } from 'jest-mock-extended'
import { CreateAccountRepository } from '@/domain/protocols/repositories/account'
import { Mail } from '@/domain/protocols/messages'

describe('DbCreateAccount Usecase', () => {
  let sut: CreateAccountUseCase
  let createAccountRepository: MockProxy<CreateAccountRepository>
  let mailer: MockProxy<Mail>
  const infoParams = mockCreateAccount()

  beforeEach(() => {
    createAccountRepository = mock()
    createAccountRepository.create.mockResolvedValue({
      accountId: 'any_account_id'
    })
    mailer = mock()
    mailer.send.mockResolvedValue(true)
    sut = new CreateAccountUseCase(createAccountRepository, mailer)
  })
  test('Should call CreateAccountRepositorySpy with correct values', async () => {
    await sut.create(infoParams)
    expect(createAccountRepository.create).toHaveBeenCalledWith(infoParams)
    expect(createAccountRepository.create).toHaveBeenCalledTimes(1)
  })

  test('Should throw if CreateAccountRepositorySpy throws', async () => {
    createAccountRepository.create.mockRejectedValueOnce(throwError)
    const promise = sut.create(infoParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return CreateAccountRepository on success', async () => {
    const result = await sut.create(infoParams)
    expect(await createAccountRepository.create(infoParams)).toBe(
      result
    )
  })
})
