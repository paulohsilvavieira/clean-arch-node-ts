import { DisapproveModel } from '@/domain/protocols/usecases/account'

export interface DisapproveAccountRepository {
  disapprove: (disapproveData: DisapproveModel) => Promise<boolean>
}
