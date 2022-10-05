import { CreateAccountController } from '@/application/controllers/account'
import { Controller } from '@/application/protocols'
import { TypeORMHelper } from '@/infra/postgres'

import { Mail } from '@/domain/protocols/messages'

import { makeDbCreateAccount, makeExistsEmailUseCase } from '@/main/factories/usecases/account'
import { makeCreateAccountValidation } from '@/main/factories/validators/account'

export const makeCreateAccountController = (typeOrm: TypeORMHelper, mailer?: Mail): Controller => {
  const controller = new CreateAccountController(makeCreateAccountValidation(), makeDbCreateAccount(typeOrm, mailer), makeExistsEmailUseCase(typeOrm))
  return controller
}
