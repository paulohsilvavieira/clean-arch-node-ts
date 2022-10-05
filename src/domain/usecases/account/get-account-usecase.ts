import { GetAccount } from '@/domain/protocols/usecases/account'
import { AccountModel } from '@/domain/entities/account-model'
import { GetAccountRepository } from '@/domain/protocols/repositories/account'

export class GetAccountUseCase implements GetAccount {
  constructor (private readonly getAccountRepository: GetAccountRepository) {}
  async get (accountId: string): Promise<AccountModel | undefined> {
    return await this.getAccountRepository.get(accountId)
  }
}
