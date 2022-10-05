import { ActiveAccount } from '@/domain/protocols/usecases/account'
import { badRequest, serverError, ok } from '@/application/helpers'
import { Controller, Validation, HttpRequest, HttpResponse } from '@/application/protocols'

export class ActiveAccountController implements Controller {
  constructor (private readonly validation: Validation, private readonly activeAccount: ActiveAccount) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const actived = await this.activeAccount.active(httpRequest.body.accountId)
      if (!actived) {
        return badRequest(new Error('Ocurred error on active account'))
      }
      return ok({
        msg: 'Account actived'
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
