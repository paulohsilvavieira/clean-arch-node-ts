import { SaveBasicInfoAccountUseCase } from '@/domain/usecases/account'
import { mockSaveInfoParams } from '../../mocks/mock-account'
import { throwError } from '@/tests/domain/mocks/test-helper'
import { SaveBasicInfoAccountRepository } from '@/domain/protocols/repositories/account'
import { mock, MockProxy } from 'jest-mock-extended'

describe('DbApproveAccount Usecase', () => {
  let sut: SaveBasicInfoAccountUseCase
  let saveBasicInfoAccountRepository: MockProxy<SaveBasicInfoAccountRepository>
  const infoParams = mockSaveInfoParams()

  beforeEach(() => {
    saveBasicInfoAccountRepository = mock()
    saveBasicInfoAccountRepository.saveBasicData.mockResolvedValue(true)
    sut = new SaveBasicInfoAccountUseCase(saveBasicInfoAccountRepository)
  })
  test('Should call SaveBasicInfoAccountRepositorySpy with correct values', async () => {
    await sut.saveBasicData(infoParams)
    expect(saveBasicInfoAccountRepository.saveBasicData).toBeCalledWith(infoParams)
    expect(saveBasicInfoAccountRepository.saveBasicData).toBeCalledTimes(1)
  })

  test('Should throw if saveBasicInfoAccountRepositorySpy throws', async () => {
    saveBasicInfoAccountRepository.saveBasicData.mockRejectedValueOnce(throwError)
    const promise = sut.saveBasicData(infoParams)
    await expect(promise).rejects.toThrow()
  })

  test('Should return saveBasicInfoAccountRepositorySpy on success', async () => {
    const infoParams = mockSaveInfoParams()

    const result = await sut.saveBasicData(infoParams)
    const resultRepository = await saveBasicInfoAccountRepository.saveBasicData(infoParams)
    expect(resultRepository).toBe(
      result
    )
  })
})
