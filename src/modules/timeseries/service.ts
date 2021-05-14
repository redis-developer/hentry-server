import { timeSeriesClient } from '../../services/redis/timeSeries'
import { TimeRow } from './interface'

class TimeSeriesService {
  static async getAllEntriesTill(slug: string, machineID: string, limit: string): Promise<Array<TimeRow>> {
    try {
      if (limit === 'now') {
        limit = `${Date.now()}`
      }
      const details = await timeSeriesClient.range(`${slug}:${machineID}`, '0', limit)
      return (details as unknown) as Promise<Array<TimeRow>>
    } catch (e) {
      return []
    }
  }

  static async getPollingEntriesFrom(slug: string, machineID: string, from: string): Promise<Array<TimeRow>> {
    try {
      const limit = `${Date.now()}`
      const details = await timeSeriesClient.range(`${slug}:${machineID}`, from, limit)
      return (details as unknown) as Promise<Array<TimeRow>>
    } catch (e) {
      return []
    }
  }
}

export { TimeSeriesService }
