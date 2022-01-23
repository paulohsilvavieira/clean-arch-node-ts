import { SMS } from '@/domain/protocols/messages'
import { SavePhoneNumberRepository } from '@/domain/protocols/repositories/account'
import { SavePhoneNumber } from '@/domain/protocols/usecases/account'

export class SavePhoneNumberUseCase implements SavePhoneNumber {
  constructor (private readonly savePhoneNumberRepository: SavePhoneNumberRepository, private readonly SMSSender: SMS) {}
  async perform (params: SavePhoneNumber.Params): Promise<SavePhoneNumber.Response> {
    const saved = await this.savePhoneNumberRepository.savePhone(params)
    if (saved) {
      const result = await this.SMSSender.send({
        to: params.phoneNumber,
        from: '',
        body: 'TOKEN MSG'
      })
      if (result) {
        return true
      } else {
        return false
      }
    }
    return false
  }
}
