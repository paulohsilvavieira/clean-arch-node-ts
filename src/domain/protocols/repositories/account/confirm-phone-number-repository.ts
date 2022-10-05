import { ConfirmPhoneNumber } from '@/domain/protocols/usecases/account'
export interface ConfirmPhoneNumberRepository {
  confirmPhone: (params: ConfirmPhoneNumber.Params) => Promise<ConfirmPhoneNumber.Response>
}
