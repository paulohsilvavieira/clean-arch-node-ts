import { SMS } from '@/domain/protocols/messages'
import { Credentials } from '@/main/config'
import twilio from 'twilio'
export class SMSAdapter implements SMS {
  constructor (private readonly credentials: Credentials) {}

  async send (params: SMS.Params): Promise<SMS.Response> {
    const client = twilio(this.credentials.TWILIO_ACCOUNT_SID, this.credentials.TWILIO_AUTH_TOKEN)
    const response = await client.messages.create(params)
    return response.status !== 'failed'
  }
}
