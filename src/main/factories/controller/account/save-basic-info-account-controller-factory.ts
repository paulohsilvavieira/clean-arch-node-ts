import { TypeORMHelper } from '@/infra/postgres'
import { SaveBasicInfoAccountController } from '@/application/controllers/account'
import { Controller } from '@/application/protocols'
import { makeDbSaveBasicInfoAccount } from '@/main/factories/usecases/account'
import { makeSaveBasicInfoAccountValidation } from '@/main/factories/validators/account'

export const makeSaveBasicInfoAccountController = (typeOrm: TypeORMHelper): Controller => {
  const controller = new SaveBasicInfoAccountController(makeDbSaveBasicInfoAccount(typeOrm), makeSaveBasicInfoAccountValidation())
  return controller
}
