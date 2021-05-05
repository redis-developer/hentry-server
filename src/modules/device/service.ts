import { CreateDeviceInterface, Device } from './interface'
import { jsonClient } from '../../services/redis/reJSON'
import { client } from '../../services/redis'
import { logger } from '../../services/logger/winston'
import { TeamService } from '../team/service'

class DeviceService {
  /**
   * to return a list of all teams in the system
   */
  static async findAll(): Promise<Array<Device | undefined>> {
    /**
     * return a promise to allow callers to wait for execution chain to end
     */
    return new Promise((resolve) => {
      /** query for all keys which have device namespace */
      client.keys('device*', (err: any, data: Array<string>) => {
        /** if error, return an empty list to client */
        if (err !== null) {
          logger.error(err)
          resolve([])
        }

        /** find details of each key in O(n) time */
        const devices: Array<Promise<Device | undefined>> = []
        data.forEach((id) => {
          devices.push(this.findOneById(id, true))
        })

        /** return data only when all promises have been resolved */
        Promise.all(devices)
          .then((x) => {
            resolve(x)
          })
          .catch((e) => {
            logger.error(e)
            resolve([])
          })
      })
    })
  }

  /**
   * To fetch details of any given device
   * @param id <string> of device to get details
   */
  static async findOneById(id: string, skipHeader = false): Promise<Device | undefined> {
    /**
     * simple check to allow using inside other services which
     * directly provide key
     */
    let deviceId = id
    if (skipHeader === false) {
      deviceId = `device:${deviceId}`
    }

    /**
     * query for given KEY and return data after parsing into JSON
     */
    const query = await jsonClient.get(deviceId)
    const result = JSON.parse(query)
    if (result !== null) {
      return (result as unknown) as Device
    }

    return undefined
  }

  /**
   * To register a new device entry in database
   */
  static async create(device: CreateDeviceInterface): Promise<Device | undefined> {
    const { frequency, friendlyName, machineID, operatingSystem, teamId } = device

    /** ensure that given team exists */
    const teamDetails = await TeamService.findOneById(teamId)
    if (teamDetails === undefined) {
      return undefined
    }

    const document: Device = {
      frequency,
      friendlyName,
      machineID,
      operatingSystem,
      timestamp: Date.now(),
    }
    const deviceQuery = await jsonClient.set(`device:${machineID}`, '.', JSON.stringify(document))
    if (deviceQuery === 'OK') {
      /** append information into team */
      const teamQuery = await jsonClient.arrappend(
        `team:${teamId}`,
        [JSON.stringify(document)],
        'devices',
      )
      return document
    }

    return undefined
  }
}

export { DeviceService }
