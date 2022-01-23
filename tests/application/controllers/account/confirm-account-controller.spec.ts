import { ConfirmEmailController } from '@/application/controllers/account'
import { MissingParamError, ServerError } from '@/application/errors'
import { ok, serverError, badRequest } from '@/application/helpers'
import { Validation } from '@/application/protocols'
import { ConfirmEmail } from '@/domain/protocols/usecases/account'
import { throwError } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

const mockRequest = () => {
  return {
    body: {
      tokenConfirmation: 'any_token',
      email: 'any_email'
    }
  }
}
describe('ApproveAccount Controller', () => {
  let sut: ConfirmEmailController
  let validation: MockProxy<Validation>
  let confirmEmail: MockProxy<ConfirmEmail>

  beforeEach(() => {
    confirmEmail = mock()
    confirmEmail.perfom.mockResolvedValue(true)
    validation = mock()
    validation.validate.mockReturnValue(null)
    sut = new ConfirmEmailController(validation, confirmEmail)
  })
  test('Should return 500 if ConfirmEmail throws', async () => {
    confirmEmail.perfom.mockRejectedValueOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call ApproveAccount with correct values', async () => {
    const request = mockRequest()
    await sut.handle(request)
    expect(confirmEmail.perfom).toBeCalledWith(request.body)
    expect(confirmEmail.perfom).toBeCalledTimes(1)
  })

  test('Should return 200 if valid data is provided', async () => {
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ msg: 'Email Confirmed' }))
  })

  test('Should return 400 if ConfirmEmail error', async () => {
    confirmEmail.perfom.mockResolvedValue(false)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error('Ocurred error on confirm email')))
  })

  test('Should call Validation with correct value', async () => {
    const request = mockRequest()
    await sut.handle(request)
    expect(validation.validate).toBeCalledWith(request.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    validation.validate.mockReset().mockReturnValueOnce(new MissingParamError('any_param') as never)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_param')))
  })
})
