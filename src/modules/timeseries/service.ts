import { timeSeriesClient } from '../../services/redis/timeSeries'
import { TimeRow } from './interface'

class TimeSeriesService {
  static async getAllById(machineID: string): Promise<Array<TimeRow>> {
    try {
      const details = await timeSeriesClient.range(machineID, '0', `${Date.now()}`)
      return (details as unknown) as Promise<Array<TimeRow>>
    } catch (e) {
      return []
    }
  }
}

export { TimeSeriesService }
