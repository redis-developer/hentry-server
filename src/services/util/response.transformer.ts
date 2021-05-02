import { RouteResponse } from '../interface/route'

/**
 * To Transform payload into a well structured data format
 *
 * @param payload <any> Data that is to be supplied to client
 */
export const SuccessToResponseMapper = (payload: any): RouteResponse => ({
  code: 200,
  error: false,
  message: 'OK',
  payload,
})
