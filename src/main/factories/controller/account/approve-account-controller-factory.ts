import { ApproveAccountController } from '@/application/controllers/account'
import { Controller } from '@/application/protocols'
import { makeDbApproveAccount } from '@/main/factories/usecases/account'
import { makeApproveAccountAccountValidation } from '@/main/factories/validators/account'
import { TypeORMHelper } from '@/infra/postgres'

export const makeApproveAccountController = (typeOrm: TypeORMHelper): Controller => {
  const controller = new ApproveAccountController(makeDbApproveAccount(typeOrm), makeApproveAccountAccountValidation())
  return controller
}
