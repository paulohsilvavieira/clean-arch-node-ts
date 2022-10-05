import { GetAllPendingAccount } from '@/domain/protocols/usecases/account'
import { GetAllPendingAccountRepository } from '@/domain/protocols/repositories/account'
import { AccountModel } from '@/domain/entities/account-model'

export class GetAllPendingAccountUsecase implements GetAllPendingAccount {
  constructor (private readonly getAllPendingAccount: GetAllPendingAccountRepository) {}
  async getAllPending (filters?: any): Promise<{ accounts: AccountModel[], numberOfPages: number }> {
    return await this.getAllPendingAccount.getAllPending(filters)
  }
}
