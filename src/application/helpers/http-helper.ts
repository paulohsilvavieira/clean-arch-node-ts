import { ServerError } from '@/application/errors/server-error'
import { HttpResponse } from '@/application/protocols/http'

export const badRequest = (error: any): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError((error.stack != null) ? error.stack : '')
})
