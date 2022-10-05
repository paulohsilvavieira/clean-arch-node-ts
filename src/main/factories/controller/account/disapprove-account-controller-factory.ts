import { DisapproveAccountController } from '@/application/controllers/account'
import { Controller } from '@/application/protocols'
import { makeDbDisapproveAccount } from '@/main/factories/usecases/account'
import { makeApproveAccountAccountValidation } from '@/main/factories/validators/account'
import { TypeORMHelper } from '@/infra/postgres'

export const makeDisapproveAccountController = (typeOrm: TypeORMHelper): Controller => {
  const controller = new DisapproveAccountController(makeDbDisapproveAccount(typeOrm), makeApproveAccountAccountValidation())
  return controller
}
