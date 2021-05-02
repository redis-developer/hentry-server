import { CreateTeamInterface, Team } from './interface'

class TeamService {
  /** to list all teams */
  static async findAll(): Promise<Array<Team>> {
    return Promise.resolve([])
  }

  /** to find details of given Team by email */
  static async findOneById(id: string): Promise<Team> {
    return Promise.resolve({ devices: [], friendlyName: '', id: '1' })
  }

  /** to create a new Team */
  static async create(team: CreateTeamInterface): Promise<Team> {
    return Promise.resolve({ devices: [], friendlyName: '', id: '1' })
  }
}

export { TeamService }
