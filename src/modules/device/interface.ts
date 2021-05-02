/**
 * Representation of each client running on the network
 */
export interface Device {
  machineID: string
  friendlyName: string
  operatingSystem: 'windows' | 'unix'
  frequency: number
  timestamp: number
}

export interface CreateDeviceInterface {
  machineID: string
  teamId: string
  friendlyName: string
  operatingSystem: 'windows' | 'unix'
  frequency: number
}
