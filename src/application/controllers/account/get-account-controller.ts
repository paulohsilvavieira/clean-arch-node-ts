import { GetAccount } from '@/domain/protocols/usecases/account'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/application/protocols'
import { badRequest, ok, serverError } from '@/application/helpers'

export class GetAccountController implements Controller {
  constructor (private readonly validation: Validation, private readonly getAccount: GetAccount) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const account = await this.getAccount.get(httpRequest.body.accountId)
      if (!account) {
        const error = new Error('Account Not Found!')
        return badRequest(error)
      }

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
