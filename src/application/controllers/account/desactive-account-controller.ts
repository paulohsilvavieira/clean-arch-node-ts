import { DesactiveAccount } from '@/domain/protocols/usecases/account'
import { badRequest, serverError, ok } from '@/application/helpers'
import { Controller, Validation, HttpRequest, HttpResponse } from '@/application/protocols'

export class DesactiveAccountController implements Controller {
  constructor (private readonly validation: Validation,
    private readonly desactiveAccount: DesactiveAccount) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const desactived = await this.desactiveAccount.desactive(httpRequest.body.accountId)
      if (!desactived) {
        return badRequest(new Error('Ocurred error on desactive account'))
      }
      return ok({
        msg: 'Account desactived'
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
