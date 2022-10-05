import { ValidationSpy,DesactiveAccountSpy } from '@/tests/application/mocks'
import faker from 'faker'
import { throwError } from '@/tests/domain/mocks'
import { MissingParamError, ServerError } from '@/application/errors'
import { DesactiveAccountController } from '@/application/controllers/account'
import { serverError, badRequest, ok } from '@/application/helpers/http-helper'

const mockRequest = () => {
  return {
    body: {
      accountId: faker.datatype.uuid()
    }
  }
}

const makeSut = () => {
  const desactiveAccountSpy = new DesactiveAccountSpy()
  const validationSpy = new ValidationSpy()
  const systemUnderTests = new DesactiveAccountController(validationSpy, desactiveAccountSpy)
  return {
    desactiveAccountSpy,
    validationSpy,
    systemUnderTests
  }
}

describe('DesactiveAccountController', () => {
  test('Should return 500 if DesactiveAccount throws', async () => {
    const {
      desactiveAccountSpy,
      systemUnderTests
    } = makeSut()
    jest.spyOn(desactiveAccountSpy, 'desactive').mockImplementationOnce(throwError)
    const httpResponse = await systemUnderTests.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call DesactiveAccount with correct values', async () => {
    const { systemUnderTests, desactiveAccountSpy } = makeSut()
    const request = mockRequest()
    await systemUnderTests.handle(request)
    expect(desactiveAccountSpy.accountId).toEqual(request.body.accountId)
  })

  test('Should return 200 if valid data is provided', async () => {
    const { systemUnderTests } = makeSut()
    const httpResponse = await systemUnderTests.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ msg: 'Account desactived' }))
  })

  test('Should return 400 if DesactiveAccount error', async () => {
    const { systemUnderTests, desactiveAccountSpy } = makeSut()
    desactiveAccountSpy.result = false
    const httpResponse = await systemUnderTests.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error('Ocurred error on desactive account')))
  })

  test('Should call Validation with correct value', async () => {
    const { systemUnderTests, validationSpy } = makeSut()
    const request = mockRequest()
    await systemUnderTests.handle(request)
    expect(validationSpy.input).toEqual(request.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { systemUnderTests, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await systemUnderTests.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
