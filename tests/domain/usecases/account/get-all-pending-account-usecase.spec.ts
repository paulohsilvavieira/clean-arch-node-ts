import { mockFilters } from '@/tests/domain/mocks/mock-account'
import { throwError } from '@/tests/domain/mocks/test-helper'

import { GetAllPendingAccountUsecase } from '@/domain/usecases/account'
import { mock, MockProxy } from 'jest-mock-extended'
import { GetAllPendingAccountRepository } from '@/domain/protocols/repositories/account'

describe('GetAllPendingAccount Usecase', () => {
  let sut: GetAllPendingAccountUsecase
  let getAllPendingAccountRepository: MockProxy<GetAllPendingAccountRepository>
  const filters = mockFilters()

  beforeEach(() => {
    getAllPendingAccountRepository = mock()
    getAllPendingAccountRepository.getAllPending.mockResolvedValue({
      accounts: [{
        id: 'any_value',
        firstName: 'any_value',
        secondName: 'any_value',
        email: 'any_value',
        dateBirth: 'any_date',
        documentType: 'any_value',
        phoneNumber: 'any_value',
        documentId: 'any_value',
        proofIdDocumentFront: 'any_value',
        proofIdDocumentBack: 'any_value',
        addressFirstLine: 'any_value',
        addressSecondLine: 'any_value',
        city: 'any_value',
        state: 'any_value',
        country: 'any_value',
        zipOrPostalCode: 'any_value',
        proofOfResidence: 'any_value',
        status: 'any_value'
      }],
      numberOfPages: 1
    })
    sut = new GetAllPendingAccountUsecase(getAllPendingAccountRepository)
  })
  test('Should call GetAllPendingAccountRepository with correct values', async () => {
    await sut.getAllPending(filters)
    expect(getAllPendingAccountRepository.getAllPending).toHaveBeenCalledWith(filters)
    expect(getAllPendingAccountRepository.getAllPending).toBeCalledTimes(1)
  })

  test('Should throw if getAllPendingAccountRepository throws', async () => {
    getAllPendingAccountRepository.getAllPending.mockRejectedValueOnce(throwError)

    const promise = sut.getAllPending(filters)
    await expect(promise).rejects.toThrow()
  })

  test('Should return getAllPendingAccountRepository on success', async () => {
    const result = await sut.getAllPending(filters)
    const resultRepository = await getAllPendingAccountRepository.getAllPending(filters)
    expect(resultRepository).toBe(
      result
    )
  })
  test('Should return getAllPendingAccountRepository on success if dont send filterss', async () => {
    const result = await sut.getAllPending()
    const resultRepository = await getAllPendingAccountRepository.getAllPending()
    expect(resultRepository).toBe(
      result
    )
  })
})
