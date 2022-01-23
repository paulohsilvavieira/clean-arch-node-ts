import { TypeORMHelper } from '@/infra/postgres/'
import { GetAllAccountsController } from '@/application/controllers/account'
import { Controller } from '@/application/protocols'
import { makeGetAllAccountUseCase } from '@/main/factories/usecases/account'
import { makeGetAllAccountsValidation } from '@/main/factories/validators/account'

export const makeGetAllAccountsController = (typeOrm: TypeORMHelper): Controller => {
  const controller = new GetAllAccountsController(makeGetAllAccountsValidation(), makeGetAllAccountUseCase(typeOrm))
  return controller
}
