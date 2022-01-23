import { ConfirmPhoneNumberRepository } from '@/domain/protocols/repositories/account'
import { ConfirmPhoneNumber } from '@/domain/protocols/usecases/account'

export class ConfirmPhoneNumberUseCase implements ConfirmPhoneNumber {
  constructor (private readonly confirmPhoneNumberRepository: ConfirmPhoneNumberRepository) {}
  async perform (params: ConfirmPhoneNumber.Params): Promise<ConfirmPhoneNumber.Response> {
    const confirmed = await this.confirmPhoneNumberRepository.confirmPhone(params)
    return confirmed
  }
}
