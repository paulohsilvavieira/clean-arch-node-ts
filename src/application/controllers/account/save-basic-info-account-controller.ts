import { HttpRequest, HttpResponse, Controller, Validation } from '@/application/protocols'
import { badRequest, ok, serverError } from '@/application/helpers'
import { SaveBasicInfoAccount } from '@/domain/protocols/usecases/account'

export class SaveBasicInfoAccountController implements Controller {
  constructor (private readonly saveBasicInfo: SaveBasicInfoAccount,
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      await this.saveBasicInfo.saveBasicData(httpRequest.body)

      return ok({
        msg: 'account created'
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
