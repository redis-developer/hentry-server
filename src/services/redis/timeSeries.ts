import config from 'config'
import { RedisTimeSeries } from 'redis-modules-sdk'
import { logger } from '../logger/winston'

const timeSeriesClient = new RedisTimeSeries({
  host: config.get('cache.host'),
  port: config.get('cache.port'),
})

/**
 * check if time-series exists
 *
 * if time series by given name does not exist, then the variable
 * timeSeriesAlreadyExists will remain false as the command
 * timeSeriesClient.get('...') will throw error
 */
const timeSeriesExists = async (name: string) => {
  try {
    const result = await timeSeriesClient.get(name)
    if (result !== null && result !== undefined) {
      return true
    }
  } catch (e) {
    return false
  }

  return true
}

/**
 * To initialize redis connection with timeseries module
 */
const initializeRedisTimeSeries = async () => {
  try {
    await timeSeriesClient.connect()
    const exists = await timeSeriesExists('system:traffic')
    if (exists) {
      logger.info('connection.redis.timeseries.success')
    } else {
      await timeSeriesClient.create('system:traffic')
      logger.info('connection.redis.timeSeries')
    }
  } catch (e) {
    logger.error('connection.redis.timeSeries.failure')
  }
}

export { timeSeriesClient, initializeRedisTimeSeries, timeSeriesExists }
