import config from 'config'
import { ReJSON } from 'redis-modules-sdk/lib/modules/rejson'
import { logger } from '../logger/winston'

const jsonClient = new ReJSON({
  host: config.get('cache.host'),
  port: config.get('cache.port'),
})

const initializeRedisJSON = async () => {
  try {
    await jsonClient.connect()
    const response = await jsonClient.set('json_status', '.', '{"alive":true}')
    if (response === 'OK') {
      logger.info('connection.redis.json.success')
    } else {
      logger.error('connection.redis.json.failure')
    }
  } catch (e) {
    logger.error('connection.redis.json.failure')
  }
}

export { jsonClient, initializeRedisJSON }
