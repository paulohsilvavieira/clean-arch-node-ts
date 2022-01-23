import { CreateAccountController } from '@/application/controllers/account'
import { MissingParamError, ServerError } from '@/application/errors'
import { ok, serverError, badRequest } from '@/application/helpers'
import { ValidationSpy, CreateAccountSpy } from '@/tests/application/mocks'
import { mockCreateAccount, throwError } from '@/tests/domain/mocks'

import faker from 'faker'
import { mock, MockProxy } from 'jest-mock-extended'
import { ExistsEmail } from '@/domain/protocols/usecases/account'

const mockRequest = () => {
  return {
    body: mockCreateAccount()
  }
}

type SutTypes = {
  sut: CreateAccountController
  createAccountSpy: CreateAccountSpy
  validationSpy: ValidationSpy
}

let existsEmail: MockProxy<ExistsEmail>

const makeSut = (): SutTypes => {
  const createAccountSpy = new CreateAccountSpy()
  const validationSpy = new ValidationSpy()
  existsEmail = mock()
  existsEmail.exists.mockResolvedValue(false)
  const sut = new CreateAccountController(validationSpy, createAccountSpy,existsEmail)
  return {
    sut,
    createAccountSpy,
    validationSpy
  }
}

describe('CreateAccount Controller', () => {
  test('Should return 500 if CreateAccount throws', async () => {
    const { sut, createAccountSpy } = makeSut()
    jest.spyOn(createAccountSpy, 'create').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call CreateAccount with correct values', async () => {
    const { sut, createAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(createAccountSpy.params).toEqual(request.body)
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ msg: 'User Created' }))
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
