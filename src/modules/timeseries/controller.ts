import { TimeRow } from './interface'
import { TimeSeriesService } from './service'

class TimeSeriesController {
  static async getAllEntries(machineID: string): Promise<Array<TimeRow>> {
    const response = await TimeSeriesService.getAllById(machineID)
    return response
  }
}

export { TimeSeriesController }
