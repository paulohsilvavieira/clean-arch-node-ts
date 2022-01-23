import { SaveAddressAccountController } from '@/application/controllers/account'
import { MissingParamError, ServerError } from '@/application/errors'
import { ok, serverError, badRequest } from '@/application/helpers'
import { ValidationSpy, SaveAddressAccountSpy } from '../../mocks'
import { mockSaveAddressParams, throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = () => {
  return {
    body: mockSaveAddressParams()
  }
}

type SutTypes = {
  sut: SaveAddressAccountController
  saveAddressAccountSpy: SaveAddressAccountSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const saveAddressAccountSpy = new SaveAddressAccountSpy()
  const validationSpy = new ValidationSpy()
  const sut = new SaveAddressAccountController(saveAddressAccountSpy, validationSpy)
  return {
    sut,
    saveAddressAccountSpy,
    validationSpy
  }
}

describe('SaveAddressAccount Controller', () => {
  test('Should return 500 if SaveAddressAccount throws', async () => {
    const { sut, saveAddressAccountSpy } = makeSut()
    jest.spyOn(saveAddressAccountSpy, 'saveAddress').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call SaveAddressAccount with correct values', async () => {
    const { sut, saveAddressAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(saveAddressAccountSpy.params).toEqual(request.body)
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ msg: 'account address updated' }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
