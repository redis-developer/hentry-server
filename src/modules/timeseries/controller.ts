import { TimeRow } from './interface'
import { TimeSeriesService } from './service'

class TimeSeriesController {
  static async getAllEntriesTill(machineID: string, limit: string): Promise<Array<TimeRow>> {
    const response = await TimeSeriesService.getAllByIdTill(machineID, limit)
    return response
  }
}

export { TimeSeriesController }
