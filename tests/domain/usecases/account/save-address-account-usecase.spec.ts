import { mockSaveAddressParams } from '@/tests/domain/mocks/mock-account'
import { throwError } from '@/tests/domain/mocks/test-helper'
import { SaveAddressAccountUseCase } from '@/domain/usecases/account'
import { mock, MockProxy } from 'jest-mock-extended'
import { SaveAddressAccountRepository } from '@/domain/protocols/repositories/account'

describe('DbSaveAddressAccount Usecase', () => {
  let sut: SaveAddressAccountUseCase
  let saveAddressAccountRepository: MockProxy<SaveAddressAccountRepository>
  const addressParams = mockSaveAddressParams()

  beforeEach(() => {
    saveAddressAccountRepository = mock()
    saveAddressAccountRepository.saveAddress.mockResolvedValue(true)
    sut = new SaveAddressAccountUseCase(saveAddressAccountRepository)
  })
  test('Should call SaveAddressAccountRepository with correct values', async () => {
    await sut.saveAddress(addressParams)
    expect(saveAddressAccountRepository.saveAddress).toBeCalledWith(addressParams)
    expect(saveAddressAccountRepository.saveAddress).toBeCalledTimes(1)
  })

  test('Should throw if saveAddressAccountRepository throws', async () => {
    saveAddressAccountRepository.saveAddress.mockRejectedValueOnce(throwError)
    const promise = sut.saveAddress(addressParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return saveAddressAccountRepository on success', async () => {
    const addressParams = mockSaveAddressParams()

    const result = await sut.saveAddress(addressParams)
    const resultRepository = await saveAddressAccountRepository.saveAddress(addressParams)
    expect(resultRepository).toBe(
      result
    )
  })
})
