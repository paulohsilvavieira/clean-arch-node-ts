import { throwError } from '@/tests/domain/mocks'
import { MissingParamError, ServerError } from '@/application/errors'
import { badRequest, ok, serverError } from '@/application/helpers'
import { GetAllPendingAccountSpy, ValidationSpy } from '@/tests/application/mocks'
import { GetAllPendingAccountController } from '@/application/controllers/account'
import faker from 'faker'

const mockRequest = () => ({
  body: {},
  query: {
    currentPage: 1,
    pageSize: 5
  }
})
type SystemUndertestsTypes={
  systemUnderTest: GetAllPendingAccountController
  getAllPedingAccount: GetAllPendingAccountSpy
  validationSpy: ValidationSpy

}
const makeSut = (): SystemUndertestsTypes => {
  const getAllPedingAccount = new GetAllPendingAccountSpy()
  const validationSpy = new ValidationSpy()

  const systemUnderTest = new GetAllPendingAccountController(validationSpy, getAllPedingAccount)

  return {
    systemUnderTest,
    getAllPedingAccount,
    validationSpy
  }
}
describe('GetAllPendingAccount', () => {
  test('Should return 500 if GetAllPending throws', async () => {
    const { systemUnderTest, getAllPedingAccount } = makeSut()
    jest.spyOn(getAllPedingAccount, 'getAllPending').mockImplementationOnce(throwError)
    const httpResponse = await systemUnderTest.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { systemUnderTest } = makeSut()
    const httpResponse = await systemUnderTest.handle(mockRequest())
    expect(httpResponse).toEqual(ok({
      accounts: [],
      numberOfPages: 1
    }))
  })

  test('Should call CreateAccount with correct values', async () => {
    const { systemUnderTest, getAllPedingAccount } = makeSut()
    const request = mockRequest()
    await systemUnderTest.handle(request)
    expect(getAllPedingAccount.filter).toEqual(request.query)
  })

  test('Should return 200 if valid data is provided', async () => {
    const { systemUnderTest } = makeSut()
    const httpResponse = await systemUnderTest.handle(mockRequest())
    expect(httpResponse).toEqual(ok({
      accounts: [],
      numberOfPages: 1
    }))
  })

  test('Should call Validation with correct value', async () => {
    const { systemUnderTest, validationSpy } = makeSut()
    const request = mockRequest()
    await systemUnderTest.handle(request)
    expect(validationSpy.input).toEqual(request.query)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { systemUnderTest, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await systemUnderTest.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
