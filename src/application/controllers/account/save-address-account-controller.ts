import { HttpRequest, HttpResponse, Controller, Validation } from '@/application/protocols'
import { badRequest, ok, serverError } from '@/application/helpers'
import { SaveAddressAccount } from '@/domain/protocols/usecases/account'

export class SaveAddressAccountController implements Controller {
  constructor (private readonly saveAddressAccount: SaveAddressAccount,
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      await this.saveAddressAccount.saveAddress(httpRequest.body)

      return ok({
        msg: 'account address updated'
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
