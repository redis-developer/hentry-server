import redis from 'redis'
import config from 'config'
import { logger } from '../logger/winston'

const client = redis.createClient(config.get('cache.port'), config.get('cache.host'))

/**
 * Initializes Redis connection using configs and logs status
 */
const initializeRedis = () => {
  client.set('status', 'server up')
  client.get('status', (err: any) => {
    if (err) {
      logger.error('connection.redis.generic.failed')
    } else {
      logger.info('connection.redis.generic.success')
    }
  })
}

export { initializeRedis, client }
