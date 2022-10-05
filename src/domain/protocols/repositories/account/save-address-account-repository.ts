import { AddressData } from '@/domain/protocols/usecases/account'
export interface SaveAddressAccountRepository {
  saveAddress: (AddressData: AddressData) => Promise<boolean>
}
