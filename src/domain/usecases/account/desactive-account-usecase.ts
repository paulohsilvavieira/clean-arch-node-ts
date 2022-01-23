import { DesactiveAccount } from '@/domain/protocols/usecases/account'
import { DesactiveAccountRepository } from '@/domain/protocols/repositories/account'

export class DesactiveAccountUseCase implements DesactiveAccount {
  constructor (private readonly desactiveAccountRepository: DesactiveAccountRepository) {}
  async desactive (accountId: string): Promise<boolean> {
    return await this.desactiveAccountRepository.desactive(accountId)
  }
}
