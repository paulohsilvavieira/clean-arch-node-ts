import { Mail } from '@/domain/protocols/messages'

export class MailAdapter implements Mail {
  constructor (private readonly configMailer: any) {}
  async send (params: Mail.Params): Promise<boolean> {
    return true
  }
}
