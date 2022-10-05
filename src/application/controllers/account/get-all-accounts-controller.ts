import { GetAllAccounts } from '@/domain/protocols/usecases/account'
import { serverError, ok, badRequest } from '@/application/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/application/protocols'

export class GetAllAccountsController implements Controller {
  constructor (private readonly validation: Validation, private readonly getAllAccounts: GetAllAccounts) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.query)
      if (error) {
        return badRequest(error)
      }
      const response = await this.getAllAccounts.getAll(httpRequest.query)
      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}
