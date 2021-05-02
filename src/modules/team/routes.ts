import express, { Request, Response } from 'express'
import { logger } from '../../services/logger/winston'
import { SuccessToResponseMapper } from '../../services/util/response.transformer'
import { TeamController } from './controller'
import { CreateTeamInterface } from './interface'

const router = express.Router()

/**
 * to list all teams on the application
 */
router.get('/', async (req: Request, res: Response) => {
  logger.info('team.find.all')
  const data = await TeamController.getAllTeams()
  res.json(SuccessToResponseMapper(data))
})

/**
 * to get details of particular team
 */
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  logger.info(`team.find.one.${id}`)
  const operation = await TeamController.getTeamById(id)
  res.json(SuccessToResponseMapper(operation))
})

/**
 * to register a new team
 */
router.post('/', async (req: Request, res: Response) => {
  const teamDetails: CreateTeamInterface = req.body
  logger.info(`team.create.${teamDetails.id}.${teamDetails.friendlyName}`)
  const operation = await TeamController.registerTeam(teamDetails)
  res.json(SuccessToResponseMapper(operation))
})

export default router
