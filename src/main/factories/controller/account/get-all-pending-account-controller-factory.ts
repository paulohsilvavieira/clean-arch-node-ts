import { TypeORMHelper } from '@/infra/postgres/'
import { GetAllPendingAccountController } from '@/application/controllers/account'
import { Controller } from '@/application/protocols'
import { makeDbGetAllPendingAccount } from '@/main/factories/usecases/account'
import { makeGetAllPendingAccountValidation } from '@/main/factories/validators/account'

export const makeGetAllPEndingAccountController = (typeOrm: TypeORMHelper): Controller => {
  const controller = new GetAllPendingAccountController(makeGetAllPendingAccountValidation(), makeDbGetAllPendingAccount(typeOrm))
  return controller
}
