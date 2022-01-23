
export interface DisapproveModel {
  accountId: string
  disapprovedInfos: string[]
}
export interface DisapproveAccount {
  disapprove: (disapproveData: DisapproveModel) => Promise<boolean>
}
