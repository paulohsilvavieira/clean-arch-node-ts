import { ApproveAccount } from '@/domain/protocols/usecases/account'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/application/protocols'
import { badRequest, ok, serverError } from '@/application/helpers'

export class ApproveAccountController implements Controller {
  constructor (private readonly approveAccount: ApproveAccount, private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const approved = await this.approveAccount.approve(httpRequest.body.accountId)
      if (!approved) {
        const error = new Error('Ocurred error on approve account')
        return badRequest(error)
      }
      return ok({
        msg: 'Account Approved'
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
