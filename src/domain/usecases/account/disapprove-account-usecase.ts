import { DisapproveAccountRepository } from '@/domain/protocols/repositories/account'
import { DisapproveAccount, DisapproveModel } from '@/domain/protocols/usecases/account'

export class DisapproveAccountUseCase implements DisapproveAccount {
  constructor (private readonly disapproveAccountRepository: DisapproveAccountRepository) {}
  async disapprove (disapproveData: DisapproveModel): Promise<boolean> {
    return this.disapproveAccountRepository.disapprove(disapproveData)
  }
}
