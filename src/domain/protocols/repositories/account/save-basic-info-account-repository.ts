import { BasicInfoData } from '@/domain/protocols/usecases/account'

export interface SaveBasicInfoAccountRepository{
  saveBasicData: (basicData: BasicInfoData) => Promise<boolean>
}
