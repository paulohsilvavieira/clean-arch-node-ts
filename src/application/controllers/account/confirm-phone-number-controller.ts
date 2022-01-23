import { badRequest, ok, serverError } from '@/application/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/application/protocols'
import { ConfirmPhoneNumber } from '@/domain/protocols/usecases/account'

export class ConfirmPhoneNumberController implements Controller {
  constructor (private readonly validation: Validation, private readonly confirmPhoneNumber: ConfirmPhoneNumber) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const confirmed = await this.confirmPhoneNumber.perform(httpRequest.body)
      if (!confirmed) {
        return badRequest(new Error('PhoneNumber confirmation failed'))
      }
      return ok('PhoneNumber confirmed!')
    } catch (error) {
      return serverError(error)
    }
  }
}
