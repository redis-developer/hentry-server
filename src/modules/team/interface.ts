/**
 * Representation of each client running on the network
 */
export interface Device {
  machineID: string
  friendlyName: string
  operatingSystem: 'windows' | 'unix'
  frequency: number
}

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
