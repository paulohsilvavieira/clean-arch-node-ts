import { VerifyExistsEmailRepository } from '@/domain/protocols/repositories/account'
import { ExistsEmail } from '@/domain/protocols/usecases/account'

export class ExistsEmailUseCase implements ExistsEmail {
  constructor (private readonly verifyExistsEmailRepository: VerifyExistsEmailRepository) {}
  async exists (email: string): Promise<boolean> {
    const exists = await this.verifyExistsEmailRepository.exists(email)
    return exists
  }
}
