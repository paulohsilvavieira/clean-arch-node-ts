import { SavePhoneNumberUseCase } from '@/domain/usecases/account'
import { SavePhoneNumber } from '@/domain/protocols/usecases/account'
import { AccountRepository } from '@/infra/postgres/repositories'
import { TypeORMHelper } from '@/infra/postgres'
import { SMSAdapter } from '@/infra/messages/sms/sms-adapter'
import { Credentials } from '@/main/config'

export const makeSavePhoneNumberUseCase = (typeOrm: TypeORMHelper, credentials: Credentials): SavePhoneNumber => {
  const accountRepository = new AccountRepository(typeOrm)
  const smsAdapter = new SMSAdapter(credentials)
  return new SavePhoneNumberUseCase(accountRepository, smsAdapter)
}
