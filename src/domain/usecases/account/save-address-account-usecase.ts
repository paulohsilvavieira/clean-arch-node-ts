import { AddressData, SaveAddressAccount } from '@/domain/protocols/usecases/account'
import { SaveAddressAccountRepository } from '@/domain/protocols/repositories/account'

export class SaveAddressAccountUseCase implements SaveAddressAccount {
  constructor (private readonly saveAddresAccountRepository: SaveAddressAccountRepository) {}
  async saveAddress (addressData: AddressData): Promise<boolean> {
    return await this.saveAddresAccountRepository.saveAddress(addressData)
  }
}
