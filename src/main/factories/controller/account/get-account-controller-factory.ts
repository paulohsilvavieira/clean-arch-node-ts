import { GetAccountController } from '@/application/controllers/account'
import { Controller } from '@/application/protocols'
import { makeDbGetAccount } from '@/main/factories/usecases/account'
import { makeGetAccountValidation } from '@/main/factories/validators/account'
import { TypeORMHelper } from '@/infra/postgres'

export const makeGetAccountController = (typeOrm: TypeORMHelper): Controller => {
  const controller = new GetAccountController(makeGetAccountValidation(), makeDbGetAccount(typeOrm))
  return controller
}
