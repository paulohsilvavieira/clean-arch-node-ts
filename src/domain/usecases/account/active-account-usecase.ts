import { ActiveAccount } from '@/domain/protocols/usecases/account'
import { ActiveAccountRepository } from '@/domain/protocols/repositories/account'

export class ActiveAccountUseCase implements ActiveAccount {
  constructor (private readonly activeAccountRepository: ActiveAccountRepository) {}
  async active (accountId: string): Promise<boolean> {
    return await this.activeAccountRepository.active(accountId)
  }
}
