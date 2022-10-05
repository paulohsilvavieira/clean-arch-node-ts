export interface TwilioCredentials {
  TWILIO_ACCOUNT_SID: string
  TWILIO_AUTH_TOKEN: string
}

export interface SendgridCredentials {
  SENDGRID_API_KEY: string
}

export class Credentials {
  TWILIO_ACCOUNT_SID: string
  TWILIO_AUTH_TOKEN: string
  SENDGRID_API_KEY: string
  constructor (twilioCredentials: TwilioCredentials, sendgridCredentials: SendgridCredentials) {
    this.SENDGRID_API_KEY = sendgridCredentials.SENDGRID_API_KEY
    this.TWILIO_ACCOUNT_SID = twilioCredentials.TWILIO_ACCOUNT_SID
    this.TWILIO_AUTH_TOKEN = twilioCredentials.TWILIO_AUTH_TOKEN
  }
}
