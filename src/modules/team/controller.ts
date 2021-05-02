import { NotFoundException, BadRequestException } from 'http-exception-transformer/exceptions'
import { Team, CreateTeamInterface } from './interface'
import { TeamService } from './service'

class TeamController {
  /** returns list of all teams in system */
  public static async getAllTeams(): Promise<Array<Team | undefined>> {
    const teams = await TeamService.findAll()
    return teams
  }

  /** to get details of particular team */
  public static async getTeamById(id: string): Promise<Team | undefined> {
    const teamDetails = await TeamService.findOneById(id)
    if (teamDetails === undefined) {
      throw new NotFoundException('team not found')
    }
    return teamDetails
  }

  /** to create a new team */
  public static async registerTeam(team: CreateTeamInterface): Promise<Team | undefined> {
    const teamData = await TeamService.findOneById(team.id)
    if (teamData !== undefined) {
      throw new BadRequestException('team already exist')
    }

    const newTeam = await TeamService.create(team)
    return newTeam
  }
}

export { TeamController }
