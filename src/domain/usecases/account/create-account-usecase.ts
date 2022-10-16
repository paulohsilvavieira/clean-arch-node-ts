import { CreateAccount } from '@/domain/protocols/usecases/account'
import { CreateAccountRepository } from '@/domain/protocols/repositories/account'
import { Account } from '@/domain/entities'

export class CreateAccountUseCase implements CreateAccount {
  constructor (private readonly createAccountRepository: CreateAccountRepository) {}

  async execute (params: CreateAccount.Params): Promise<CreateAccount.Result> {
    const account = new Account(params)
    if (!account.isValid) {
      return {
        success: false,
        errors: account.errors
      }
    }

    const result = await this.createAccountRepository.create(params)
    return {
      success: result,
      errors: result ? null : new Error('Error on Create Account')
    }
  }
}
