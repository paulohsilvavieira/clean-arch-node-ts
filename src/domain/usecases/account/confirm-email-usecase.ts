import { ConfirmEmailRepository } from '@/domain/protocols/repositories/account'
import { ConfirmEmail } from '@/domain/protocols/usecases/account'

export class ConfirmEmailUseCase implements ConfirmEmail {
  constructor (private readonly confirmEmailRepository: ConfirmEmailRepository) {}
  async perfom (params: ConfirmEmail.Params): Promise<boolean> {
    const result = await this.confirmEmailRepository.confirm(params)
    return result
  };
}
