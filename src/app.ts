import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { HttpExceptionTransformer } from 'http-exception-transformer'
import { initializeRedis } from './services/redis'
import { initializeRedisJSON } from './services/redis/reJSON'

/** link all modules onto application */
import TeamRoutes from './modules/team/routes'
import DeviceRoutes from './modules/device/routes'
// import { cookieDecoder } from './services/cookie/decoder'

/** initialize database connections */
initializeRedis()
initializeRedisJSON()
// roleStatusCheck()

/**
 * Initialize express application to hook all middleware
 */
const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())
app.use(cookieParser())
// app.use(cookieDecoder())

app.get('', (req, res) => {
  res.json({ alive: true })
})
app.use('/team', TeamRoutes)
app.use('/device', DeviceRoutes)

app.use(HttpExceptionTransformer)
export default app
