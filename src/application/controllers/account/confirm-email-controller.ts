import { badRequest, serverError, ok } from '@/application/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/application/protocols'
import { ConfirmEmail } from '@/domain/protocols/usecases/account'

export class ConfirmEmailController implements Controller {
  constructor (private readonly validation: Validation, private readonly confirmEmail: ConfirmEmail) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { tokenConfirmation, email } = httpRequest.body
      const confirmed = await this.confirmEmail.perfom({
        tokenConfirmation,
        email
      })
      if (!confirmed) {
        const error = new Error('Ocurred error on confirm email')
        return badRequest(error)
      }
      return ok({
        msg: 'Email Confirmed'
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
