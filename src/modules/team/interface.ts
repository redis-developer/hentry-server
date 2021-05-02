import { Device } from '../device/interface'

/**
 * Grouping of devices running together
 */
export interface Team {
  id: string
  friendlyName: string
  devices: Array<Device>
}

export interface CreateTeamInterface {
  id: string
  friendlyName: string
}
