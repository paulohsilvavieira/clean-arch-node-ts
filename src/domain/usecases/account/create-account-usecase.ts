import { CreateAccount, CreateAccountModel } from '@/domain/protocols/usecases/account'
import { CreateAccountRepository } from '@/domain/protocols/repositories/account'
import { Mail } from '@/domain/protocols/messages'

export class CreateAccountUseCase implements CreateAccount {
  constructor (private readonly createAccountRepository: CreateAccountRepository, private readonly mailer: Mail) {}

  async create (createAccountModel: CreateAccountModel): Promise<boolean> {
    const result = await this.createAccountRepository.create(createAccountModel)
    const generateHash = () => {}
    await this.mailer.send({
      destination: createAccountModel.email,
      locale: 'pt-BR',
      typeEmail: 'CONFIRM_EMAIL',
      contentToSend: {
        payload: {
          hashConfirmation: generateHash()
        }
      }
    })
    return result.accountId !== undefined
  }
}
