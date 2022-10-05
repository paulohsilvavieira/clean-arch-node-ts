import { DisapproveAccountController } from '@/application/controllers/account'
import { MissingParamError, ServerError } from '@/application/errors'
import { ok, serverError, badRequest } from '@/application/helpers'
import { ValidationSpy, DisapproveAccountSpy } from '../../mocks'
import { mockDisapproveAccount, throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = () => {
  return {
    body: mockDisapproveAccount()
  }
}

type SutTypes = {
  sut: DisapproveAccountController
  dispproveAccountSpy: DisapproveAccountSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const dispproveAccountSpy = new DisapproveAccountSpy()
  const validationSpy = new ValidationSpy()
  const sut = new DisapproveAccountController(dispproveAccountSpy, validationSpy)
  return {
    sut,
    dispproveAccountSpy,
    validationSpy
  }
}

describe('DisapproveAccount Controller', () => {
  test('Should return 500 if DisapproveAccount throws', async () => {
    const { sut, dispproveAccountSpy } = makeSut()
    jest.spyOn(dispproveAccountSpy, 'disapprove').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call DisapproveAccount with correct values', async () => {
    const { sut, dispproveAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(dispproveAccountSpy.params).toEqual(request.body)
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ msg: 'Account Disapproved' }))
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

  test('Should return 400 if DisapproveAccount error', async () => {
    const { sut, dispproveAccountSpy } = makeSut()
    dispproveAccountSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error('Ocurred error on disapprove account')))
  })
})
