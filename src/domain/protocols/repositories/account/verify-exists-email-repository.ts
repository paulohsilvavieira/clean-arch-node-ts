export interface VerifyExistsEmailRepository {
  exists: (email: string) => Promise<boolean>
}
