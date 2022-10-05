import { DesactiveAccountController } from '@/application/controllers/account'
import { Controller } from '@/application/protocols'
import { makeDbDesactiveAccount } from '@/main/factories/usecases/account'
import { makeDesactiveAccountValidation } from '@/main/factories/validators/account'
import { TypeORMHelper } from '@/infra/postgres'

export const makeDesactiveAccountController = (typeOrm: TypeORMHelper): Controller => {
  const controller = new DesactiveAccountController(makeDesactiveAccountValidation(), makeDbDesactiveAccount(typeOrm))
  return controller
}
