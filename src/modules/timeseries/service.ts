import { timeSeriesClient } from '../../services/redis/timeSeries'
import { TimeRow } from './interface'

class TimeSeriesService {
  static async getAllEntropyEntriesTill(machineID: string, limit: string): Promise<Array<TimeRow>> {
    try {
      if (limit === 'now') {
        limit = `${Date.now()}`
      }
      const details = await timeSeriesClient.range(`entropy:${machineID}`, '0', limit)
      return (details as unknown) as Promise<Array<TimeRow>>
    } catch (e) {
      return []
    }
  }

  static async getAllSnapshotEntriesTill(
    machineID: string,
    limit: string,
  ): Promise<Array<TimeRow>> {
    try {
      if (limit === 'now') {
        limit = `${Date.now()}`
      }
      const details = await timeSeriesClient.range(`snapshot:${machineID}`, '0', limit)
      return (details as unknown) as Promise<Array<TimeRow>>
    } catch (e) {
      return []
    }
  }
}

export { TimeSeriesService }
