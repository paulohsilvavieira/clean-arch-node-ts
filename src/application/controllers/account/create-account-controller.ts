import { CreateAccount, ExistsEmail } from '@/domain/protocols/usecases/account'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/application/protocols'
import { badRequest, serverError, ok } from '@/application/helpers'

export class CreateAccountController implements Controller {
  constructor (private readonly validation: Validation,
    private readonly createAccount: CreateAccount,
    private readonly existsEmail: ExistsEmail
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const exists = await this.existsEmail.exists(httpRequest.body.email)
      if (exists) {
        return badRequest(new Error('E-mail already registered'))
      }
      await this.createAccount.create(httpRequest.body)

      return ok({
        msg: 'User Created'
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
