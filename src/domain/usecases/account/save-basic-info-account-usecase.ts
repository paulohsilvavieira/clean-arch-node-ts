import { SaveBasicInfoAccount } from '@/domain/protocols/usecases/account'
import { SaveBasicInfoAccountRepository } from '@/domain/protocols/repositories/account'

export class SaveBasicInfoAccountUseCase implements SaveBasicInfoAccount {
  constructor (private readonly saveBasicInfoAccountRepository: SaveBasicInfoAccountRepository) {}
  async saveBasicData (basicData: SaveBasicInfoAccount.Params): Promise<SaveBasicInfoAccount.Response> {
    return await this.saveBasicInfoAccountRepository.saveBasicData(basicData)
  }
}
