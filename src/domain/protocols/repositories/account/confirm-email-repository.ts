import { ConfirmEmail } from '@/domain/protocols/usecases/account'

export interface ConfirmEmailRepository {
  confirm: (params: ConfirmEmail.Params) => Promise<boolean>
}
