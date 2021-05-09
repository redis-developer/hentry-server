import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from "cors"
import { HttpExceptionTransformer } from 'http-exception-transformer'
import { initializeRedis } from './services/redis'
import { initializeRedisJSON } from './services/redis/reJSON'
import { initializeRedisTimeSeries } from './services/redis/timeSeries'

/** link all modules onto application */
import TeamRoutes from './modules/team/routes'
import DeviceRoutes from './modules/device/routes'
import TimeSeriesRoutes from './modules/timeseries/routes'

/** initialize database connections */
initializeRedis()
initializeRedisJSON()
initializeRedisTimeSeries()

/**
 * Initialize express application to hook all middleware
 */
const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.get('', (req, res) => {
  res.json({ alive: true })
})
app.use('/team', TeamRoutes)
app.use('/device', DeviceRoutes)
app.use('/timeseries', TimeSeriesRoutes)

app.use(HttpExceptionTransformer)
export default app
