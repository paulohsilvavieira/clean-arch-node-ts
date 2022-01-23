import { ApproveAccountController } from '@/application/controllers/account'
import { MissingParamError, ServerError } from '@/application/errors'
import { ok, serverError, badRequest } from '@/application/helpers'
import { ValidationSpy, ApproveAccountSpy } from '@/tests/application/mocks'
import { mockAccount, throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = () => {
  return {
    body: mockAccount()
  }
}

type SutTypes = {
  sut: ApproveAccountController
  approveAccountSpy: ApproveAccountSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const approveAccountSpy = new ApproveAccountSpy()
  const validationSpy = new ValidationSpy()
  const sut = new ApproveAccountController(approveAccountSpy, validationSpy)
  return {
    sut,
    approveAccountSpy,
    validationSpy
  }
}

describe('ApproveAccount Controller', () => {
  test('Should return 500 if ApproveAccount throws', async () => {
    const { sut, approveAccountSpy } = makeSut()
    jest.spyOn(approveAccountSpy, 'approve').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call ApproveAccount with correct values', async () => {
    const { sut, approveAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(approveAccountSpy.accountId).toEqual(request.body.accountId)
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ msg: 'Account Approved' }))
  })

  test('Should return 400 if ApproveAccount error', async () => {
    const { sut,approveAccountSpy } = makeSut()
    approveAccountSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error('Ocurred error on approve account')))
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
