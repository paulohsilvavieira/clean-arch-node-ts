import { AccountModel } from '@/domain/entities'
import { GetAllAccounts } from '@/domain/protocols/usecases/account'

export class GetAllAccountsUseCase implements GetAllAccounts {
  constructor (private readonly getAllAccountsRepository: any) {}
  async getAll (filters?: any): Promise<{ accounts: AccountModel[], numberOfPages: number }> {
    const { accounts, numberOfPages } = await this.getAllAccountsRepository.getAll(filters)
    return {
      accounts, numberOfPages
    }
  }
}
