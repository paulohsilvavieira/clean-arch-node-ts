import { TypeORMHelper } from '@/infra/postgres'
import { SaveAddressAccountController } from '@/application/controllers/account'
import { Controller } from '@/application/protocols'
import { makeDbSaveAddressAccount } from '@/main/factories/usecases/account'
import { makeSaveAddressAccountValidation } from '@/main/factories/validators/account'

export const makeSaveAddressAccountController = (typeOrm: TypeORMHelper): Controller => {
  const controller = new SaveAddressAccountController(makeDbSaveAddressAccount(typeOrm), makeSaveAddressAccountValidation())
  return controller
}
