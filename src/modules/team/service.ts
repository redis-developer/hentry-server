import { CreateTeamInterface, Team } from './interface'
import { jsonClient } from '../../services/redis/reJSON'
import { client } from '../../services/redis'
import { logger } from '../../services/logger/winston'

class TeamService {
  /**
   * to return a list of all teams in the system
   */
  static async findAll(): Promise<Array<Team | undefined>> {
    /**
     * return a promise to allow callers to wait for execution chain to end
     */
    return new Promise((resolve) => {
      /** query for all keys which have team namespace */
      client.keys('team*', (err: any, data: Array<string>) => {
        /** if error, return an empty list to client */
        if (err !== null) {
          logger.error(err)
          resolve([])
        }

        /** find details of each key in O(n) time */
        const teams: Array<Promise<Team | undefined>> = []
        data.forEach((id) => {
          teams.push(this.findOneById(id, true))
        })

        /** return data only when all promises have been resolved */
        Promise.all(teams)
          .then((x) => {
            resolve(x)
          })
          .catch((e) => {
            logger.error(e)
            resolve([])
          })
      })
    })
  }

  /**
   * To fetch details of any given team
   * @param id <string> of team to get details
   */
  static async findOneById(id: string, skipHeader = false): Promise<Team | undefined> {
    /**
     * simple check to allow using inside other services which
     * directly provide key
     */
    let teamId = id
    if (skipHeader === false) {
      teamId = `team:${teamId}`
    }

    /**
     * query for given KEY and return data after parsing into JSON
     */
    const query = await jsonClient.get(teamId)
    const result = JSON.parse(query)
    if (result !== null) {
      return (result as unknown) as Team
    }

    return undefined
  }

  /**
   * To create a new team entry in database
   * @param team <CreateTeamInterface> details of new team created
   */
  static async create(team: CreateTeamInterface): Promise<Team | undefined> {
    const { friendlyName, id } = team
    const document = { friendlyName, id, devices: [] }
    const query = await jsonClient.set(`team:${team.id}`, '.', JSON.stringify(document))
    if (query === 'OK') {
      return document
    }

    return undefined
  }
}

export { TeamService }
