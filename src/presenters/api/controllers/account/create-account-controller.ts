import { CreateAccount } from '@/domain/protocols/usecases/account'
import { Controller, HttpRequest, HttpResponse } from '@/presenters/api/protocols'
import { badRequest, serverError, ok } from '@/presenters/api/helpers'

export class CreateAccountController implements Controller {
  constructor (
    private readonly createAccount: CreateAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.createAccount.execute(httpRequest.body)

      if (!result.success) {
        return badRequest({
          msg: result.errors
        })
      }
      return ok({
        msg: 'Account Created'
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
