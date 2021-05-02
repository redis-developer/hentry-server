import express, { Request, Response } from 'express'
import { logger } from '../../services/logger/winston'
import { SuccessToResponseMapper } from '../../services/util/response.transformer'
import { TeamController } from './controller'

const router = express.Router()

/**
 * to list all teams on the application
 */
router.get('/', async (req: Request, res: Response) => {
  const data = await TeamController.getAllTeams()
  res.json(SuccessToResponseMapper(data))
})

/**
 * to get details of particular team
 */
router.get('/:id', async (req: Request, res: Response) => {
  //   const { id } = req.params
  res.json(SuccessToResponseMapper({}))
})

/**
 * to register a new team
 */
router.post('/', async (req: Request, res: Response) => {
  res.json(SuccessToResponseMapper({}))
})

export default router
