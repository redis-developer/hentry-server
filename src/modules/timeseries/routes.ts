import express, { Request, Response } from 'express'
import { logger } from '../../services/logger/winston'
import { SuccessToResponseMapper } from '../../services/util/response.transformer'
import { TimeSeriesController } from './controller'

const router = express.Router()

/**
 * to get all entries of a particular device by id
 */
router.get('entropy/:id/:limit', async (req: Request, res: Response) => {
  const { id, limit } = req.params
  logger.info(`entropy.find.${id}.till.${limit}`)
  const data = await TimeSeriesController.getAllEntropyEntriesTill(id, limit)
  res.json(SuccessToResponseMapper(data))
})

router.get('snapshot/:id/:limit', async (req: Request, res: Response) => {
  const { id, limit } = req.params
  logger.info(`timeseries.find.${id}.till.${limit}`)
  const data = await TimeSeriesController.getAllSnapshotEntriesTill(id, limit)
  res.json(SuccessToResponseMapper(data))
})
export default router
