import { throwError } from '@/tests/domain/mocks'
import { mock, MockProxy } from 'jest-mock-extended'
import { ConfirmEmailUseCase } from '@/domain/usecases/account'
import { ConfirmEmailRepository } from '@/domain/protocols/repositories/account'

describe('ConfirmEmail Usecase', () => {
  let sut: ConfirmEmailUseCase
  let confirmEmailRepository: MockProxy<ConfirmEmailRepository>
  const params = {
    email: 'any_email',
    tokenConfirmation: 'any_token'
  }
  beforeEach(() => {
    confirmEmailRepository = mock()
    confirmEmailRepository.confirm.mockResolvedValue(true)
    sut = new ConfirmEmailUseCase(confirmEmailRepository)
  })
  test('Should call ConfirmEmailRepository with correct values', async () => {
    await sut.perfom(params)
    expect(confirmEmailRepository.confirm).toHaveBeenCalledWith(
      params
    )
    expect(confirmEmailRepository.confirm).toHaveBeenCalledTimes(1)
  })

  test('Should throw if confirmEmailRepository throws', async () => {
    confirmEmailRepository.confirm.mockImplementationOnce(throwError)
    const promise = sut.perfom(params)
    await expect(promise).rejects.toThrow()
  })

  test('Shold return confirmEmailRepository on success', async () => {
    const result = await sut.perfom(params)
    expect(await confirmEmailRepository.confirm(params)).toBe(
      result
    )
  })
})
