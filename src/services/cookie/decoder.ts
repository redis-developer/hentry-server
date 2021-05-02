// import { NextFunction, Request, Response } from 'express'
// import config from 'config'
// import { decode, verify } from 'jsonwebtoken'
// import { BadRequestException } from 'http-exception-transformer/exceptions'
// import { logger } from '../logger/winston'
// // import { LoginTokenData } from '../../modules/auth/interface'

// /**
//  * Express Middleware to read cookie data and identify tht user
//  */
// export const cookieDecoder = () => {
//   /**
//    * @param req Request : Express request Object
//    * @param res Response: Express Response object
//    * @param next Next() calls next middleware layer
//    */
//   const middleware = async (req: Request, res: Response, next: NextFunction) => {
//     const cookieName: string = config.get('login_token.cookie')
//     const token: string = req.cookies[cookieName]
//     if (token === undefined) {
//       logger.info('cookie.set.false')
//       req.body = {
//         payload: req.body,
//         cookie: false,
//       }
//       return next()
//     }

//     try {
//       const isValidToken = await verify(token, config.get('login_token.secret'), {
//         issuer: config.get('login_token.issuer'),
//       })

//       if (!isValidToken) {
//         throw new BadRequestException('Invalid token')
//       }

//       const decodedData = (await decode(token)) as LoginTokenData
//       logger.info(`cookie.data.${decodedData.email}.${decodedData.role}`)
//       req.body = {
//         payload: req.body,
//         cookie: decodedData,
//       }
//     } catch (e) {
//       req.body = {
//         payload: req.body,
//         cookie: false,
//       }
//     }

//     return next()
//   }

//   return middleware
// }
