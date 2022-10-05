import { DisapproveAccount } from '@/domain/protocols/usecases/account'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/application/protocols'
import { badRequest, ok, serverError } from '@/application/helpers'

export class DisapproveAccountController implements Controller {
  constructor (private readonly disapproveAccount: DisapproveAccount, private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const disapproved = await this.disapproveAccount.disapprove(httpRequest.body)
      if (!disapproved) {
        const error = new Error('Ocurred error on disapprove account')
        return badRequest(error)
      }

      return ok({
        msg: 'Account Disapproved'
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
