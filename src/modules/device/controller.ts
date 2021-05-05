import { NotFoundException, BadRequestException } from 'http-exception-transformer/exceptions'
import { TeamService } from '../team/service'
import { Device, CreateDeviceInterface } from './interface'
import { DeviceService } from './service'

class DeviceController {
  /** returns list of all devices in system */
  public static async getAllDevices(): Promise<Array<Device | undefined>> {
    const devices = await DeviceService.findAll()
    return devices
  }

  /** to get details of particular device */
  public static async getDeviceById(id: string): Promise<Device | undefined> {
    const deviceDetails = await DeviceService.findOneById(id)
    if (deviceDetails === undefined) {
      throw new NotFoundException('device not found')
    }
    return deviceDetails
  }

  /** to register a new device */
  public static async registerDevice(register: CreateDeviceInterface): Promise<Device | undefined> {
    const { machineID, teamId } = register
    const teamDetails = await TeamService.findOneById(teamId)
    if (teamDetails === undefined) {
      throw new NotFoundException('team does not exist')
    }

    const deviceDetails = await DeviceService.findOneById(machineID)
    if (deviceDetails !== undefined) {
      throw new BadRequestException('device already registered')
    }

    const newDevice = await DeviceService.create(register)
    return newDevice
  }
}

export { DeviceController }
