
export interface ExistsEmail {
  exists: (email: string) => Promise<boolean>
}
