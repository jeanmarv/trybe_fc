import errorNotFound from '../externals/errorNotFound';
import Team from '../database/models/team';

class TeamService {
  getAll = async (): Promise<Team[]> => {
    const getAllTeams = await Team.findAll({ raw: true });
    if (!getAllTeams) { throw errorNotFound('Teams not found'); }

    return getAllTeams;
  };

  getById = async (id: number): Promise<Team> => {
    const getTeamById = await Team.findByPk(id);

    if (!getTeamById) throw errorNotFound('Team not found');

    return getTeamById as Team;
  };
}

export default TeamService;
