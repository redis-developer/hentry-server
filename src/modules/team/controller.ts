import { NotFoundException, BadRequestException } from 'http-exception-transformer/exceptions'
import { Team, CreateTeamInterface } from './interface'
import { TeamService } from './service'

class TeamController {
  /** returns list of all teams in system */
  public static getAllTeams(): Promise<Array<Team>> | any {
    return []
  }

  /** to get details of particular team */
  public static async getTeamById(id: string): Promise<Team> {
    const teamDetails = await TeamService.findOneById(id)
    if (teamDetails === null) {
      throw new NotFoundException('team not found')
    }
    return teamDetails
  }

  /** to create a new team */
  public static async registerTeam(team: CreateTeamInterface): Promise<Team> {
    const teamData = await TeamService.findOneById(team.id)
    if (teamData !== null) {
      throw new BadRequestException('team already exist')
    }

    const newTeam = await TeamService.create(team)
    return newTeam
  }
}

export { TeamController }
