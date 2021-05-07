import express, { Request, Response } from 'express'
import { logger } from '../../services/logger/winston'
import { SuccessToResponseMapper } from '../../services/util/response.transformer'
import { TimeSeriesController } from './controller'

const router = express.Router()

/**
 * to get all entries of a particular device by id
 */
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  logger.info(`timeseries.find.${id}`)
  const data = await TimeSeriesController.getAllEntries(id)
  res.json(SuccessToResponseMapper(data))
})

export default router
