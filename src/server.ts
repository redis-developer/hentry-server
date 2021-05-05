import config from 'config'
import app from './app'
import { logger } from './services/logger/winston'

const port = config.get('server.port') || 3000

/**
 * Listen on port for requests
 */
app.listen(port, () => {
  logger.info(`Listening in port http://localhost:${port}`)
})
