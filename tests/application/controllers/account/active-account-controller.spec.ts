import { ValidationSpy,ActiveAccountSpy } from '@/tests/application/mocks'
import faker from 'faker'
import { throwError } from '@/tests/domain/mocks'
import { MissingParamError, ServerError } from '@/application/errors'
import { ActiveAccountController } from '@/application/controllers/account'
import { serverError, badRequest, ok } from '@/application/helpers/http-helper'

const mockRequest = () => {
  return {
    body: {
      accountId: faker.datatype.uuid()
    }
  }
}

const makeSut = () => {
  const activeAccountSpy = new ActiveAccountSpy()
  const validationSpy = new ValidationSpy()
  const systemUnderTests = new ActiveAccountController(validationSpy, activeAccountSpy)
  return {
    activeAccountSpy,
    validationSpy,
    systemUnderTests
  }
}

describe('ActiveAccountController', () => {
  test('Should return 500 if ActiveAccount throws', async () => {
    const {
      activeAccountSpy,
      systemUnderTests
    } = makeSut()
    jest.spyOn(activeAccountSpy, 'active').mockImplementationOnce(throwError)
    const httpResponse = await systemUnderTests.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call ActiveAccount with correct values', async () => {
    const { systemUnderTests, activeAccountSpy } = makeSut()
    const request = mockRequest()
    await systemUnderTests.handle(request)
    expect(activeAccountSpy.accountId).toEqual(request.body.accountId)
  })

  test('Should return 200 if valid data is provided', async () => {
    const { systemUnderTests } = makeSut()
    const httpResponse = await systemUnderTests.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ msg: 'Account actived' }))
  })

  test('Should return 400 if ApproveAccount error', async () => {
    const { systemUnderTests, activeAccountSpy } = makeSut()
    activeAccountSpy.result = false
    const httpResponse = await systemUnderTests.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error('Ocurred error on active account')))
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
