import { SaveBasicInfoAccountController } from '@/application/controllers/account'
import { MissingParamError, ServerError } from '@/application/errors'
import { ok, serverError, badRequest } from '@/application/helpers'
import { ValidationSpy, SaveBasicInfoAccountSpy } from '../../mocks'
import { mockSaveInfoParams, throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = () => {
  return {
    body: mockSaveInfoParams()
  }
}

type SutTypes = {
  sut: SaveBasicInfoAccountController
  saveBasicInfoAccountSpy: SaveBasicInfoAccountSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const saveBasicInfoAccountSpy = new SaveBasicInfoAccountSpy()
  const validationSpy = new ValidationSpy()
  const sut = new SaveBasicInfoAccountController(saveBasicInfoAccountSpy, validationSpy)
  return {
    sut,
    saveBasicInfoAccountSpy,
    validationSpy
  }
}

describe('SaveBasicInfoAccount Controller', () => {
  test('Should return 500 if SaveBasicInfoAccount throws', async () => {
    const { sut, saveBasicInfoAccountSpy } = makeSut()
    jest.spyOn(saveBasicInfoAccountSpy, 'saveBasicData').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call SaveBasicInfoAccount with correct values', async () => {
    const { sut, saveBasicInfoAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(saveBasicInfoAccountSpy.params).toEqual(request.body)
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ msg: 'account created' }))
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
