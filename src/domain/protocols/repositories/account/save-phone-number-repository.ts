import { SavePhoneNumber } from '@/domain/protocols/usecases/account'
export interface SavePhoneNumberRepository {
  savePhone: (params: SavePhoneNumber.Params) => Promise<SavePhoneNumber.Response>
}
