import { CreateAccount } from "../../usecases/account";

export interface CreateAccountRepository{
  create: (basicData: CreateAccount.Params) => Promise<boolean>
}
