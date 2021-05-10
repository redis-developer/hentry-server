import { TimeRow } from './interface'
import { TimeSeriesService } from './service'

class TimeSeriesController {
  static async getAllEntropyEntriesTill(machineID: string, limit: string): Promise<Array<TimeRow>> {
    const response = await TimeSeriesService.getAllEntropyEntriesTill(machineID, limit)
    return response
  }

  static async getAllSnapshotEntriesTill(machineID: string, limit: string): Promise<Array<TimeRow>> {
    const response = await TimeSeriesService.getAllSnapshotEntriesTill(machineID, limit)
    return response
  }
}

export { TimeSeriesController }
