import { ActiveAccountController } from '@/application/controllers/account'
import { Controller } from '@/application/protocols'
import { makeDbActiveAccount } from '@/main/factories/usecases/account'
import { makeActiveAccountValidation } from '@/main/factories/validators/account'
import { TypeORMHelper } from '@/infra/postgres'

export const makeActiveAccountController = (typeOrm: TypeORMHelper): Controller => {
  const controller = new ActiveAccountController(makeActiveAccountValidation(), makeDbActiveAccount(typeOrm))
  return controller
}
