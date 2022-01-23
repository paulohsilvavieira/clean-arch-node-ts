import { mockFilters } from '@/tests/domain/mocks/mock-account'
import { throwError } from '@/tests/domain/mocks/test-helper'

import { GetAllAccountsUseCase } from '@/domain/usecases/account'
import { GetAllAccountsRepository } from '@/domain/protocols/repositories/account'

import { mock, MockProxy } from 'jest-mock-extended'
describe('GetAllAccounts Usecase', () => {
  let sut: GetAllAccountsUseCase
  let getAllAccountsRepository: MockProxy<GetAllAccountsRepository>
  const filters = mockFilters()

  beforeEach(() => {
    getAllAccountsRepository = mock()
    getAllAccountsRepository.getAll.mockResolvedValue({
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
    sut = new GetAllAccountsUseCase(getAllAccountsRepository)
  })
  test('Should call GetAllAccountsRepository with correct values', async () => {
    await sut.getAll(filters)
    expect(getAllAccountsRepository.getAll).toHaveBeenCalledWith(filters)
    expect(getAllAccountsRepository.getAll).toBeCalledTimes(1)
  })

  test('Should throw if getAllAccountsRepository throws', async () => {
    getAllAccountsRepository.getAll.mockRejectedValueOnce(throwError)

    const promise = sut.getAll(filters)
    await expect(promise).rejects.toThrow()
  })

  test('Should return getAllAccountsRepository on success', async () => {
    const result = await sut.getAll(filters)
    const resultRepository = await getAllAccountsRepository.getAll(filters)
    expect(resultRepository).toStrictEqual(
      result
    )
  })
  test('Should return getAllAccountsRepository on success if dont send filterss', async () => {
    const result = await sut.getAll()
    const resultRepository = await getAllAccountsRepository.getAll()
    expect(resultRepository).toStrictEqual(
      result
    )
  })
})
