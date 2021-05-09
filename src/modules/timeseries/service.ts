import { timeSeriesClient } from '../../services/redis/timeSeries'
import { TimeRow } from './interface'

class TimeSeriesService {
  static async getAllByIdTill(machineID: string, limit: string): Promise<Array<TimeRow>> {
    try {
      if (limit === 'now') {
        limit = `${Date.now()}`
      }
      const details = await timeSeriesClient.range(machineID, '0', limit)
      return (details as unknown) as Promise<Array<TimeRow>>
    } catch (e) {
      return []
    }
  }
}

export { TimeSeriesService }
