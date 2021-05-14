import { TimeRow } from './interface'
import { TimeSeriesService } from './service'

class TimeSeriesController {
  static async getAllEntropyEntriesTill(machineID: string, limit: string): Promise<Array<TimeRow>> {
    const response = await TimeSeriesService.getAllEntriesTill('entropy', machineID, limit)
    return response
  }

  static async getAllSnapshotEntriesTill(machineID: string, limit: string): Promise<Array<TimeRow>> {
    const response = await TimeSeriesService.getAllEntriesTill('snapshot', machineID, limit)
    return response
  }

  /** these are used to poll for updates */
  static async getEntropyPollingEntriesFrom(machineID: string, from: string): Promise<Array<TimeRow>> {
    const response = await TimeSeriesService.getPollingEntriesFrom('entropy', machineID, from)
    return response
  }

  static async getSnapshotPollingEntriesFrom(machineID: string, from: string): Promise<Array<TimeRow>> {
    const response = await TimeSeriesService.getPollingEntriesFrom('snapshot', machineID, from)
    return response
  }
}

export { TimeSeriesController }
