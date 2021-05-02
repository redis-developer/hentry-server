import express, { Request, Response } from 'express'
import { logger } from '../../services/logger/winston'
import { SuccessToResponseMapper } from '../../services/util/response.transformer'
import { DeviceController } from './controller'
import { CreateDeviceInterface } from './interface'

const router = express.Router()

/**
 * to list all devices on the application
 */
router.get('/', async (req: Request, res: Response) => {
  logger.info('devices.find.all')
  const data = await DeviceController.getAllDevices()
  res.json(SuccessToResponseMapper(data))
})

/**
 * to get details of particular device
 */
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  logger.info(`device.find.one.${id}`)
  const operation = await DeviceController.getDeviceById(id)
  res.json(SuccessToResponseMapper(operation))
})

/**
 * to register a new device
 */
router.post('/', async (req: Request, res: Response) => {
  const deviceDetails: CreateDeviceInterface = req.body
  logger.info(`device.create.${deviceDetails.machineID}.${deviceDetails.friendlyName}`)
  const operation = await DeviceController.registerDevice(deviceDetails)
  res.json(SuccessToResponseMapper(operation))
})

export default router
