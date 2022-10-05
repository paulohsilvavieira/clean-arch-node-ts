import { ApproveAccountRepository } from '@/domain/protocols/repositories/account'
import { ApproveAccount } from '@/domain/protocols/usecases/account'

export class ApproveAccountUseCase implements ApproveAccount {
  constructor (private readonly approveAccountRepository: ApproveAccountRepository) {}
  async approve (accountId: string): Promise<boolean> {
    return await this.approveAccountRepository.approve(accountId)
  }
}
