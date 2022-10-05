import { badRequest, ok, serverError } from '@/application/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/application/protocols'
import { SavePhoneNumber } from '@/domain/protocols/usecases/account'

export class SavePhoneNumberController implements Controller {
  constructor (private readonly validation: Validation, private readonly savePhoneNumber: SavePhoneNumber) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      await this.savePhoneNumber.perform(httpRequest.body)
      return ok('PhoneNumber Saved, waiting confirmation.')
    } catch (error) {
      return serverError(error)
    }
  }
}
