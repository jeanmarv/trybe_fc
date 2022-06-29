import Team from '../database/models/team';
import IError from '../externals/errorHandler';

class TeamService {
  public getAll = async () => {
    const getTeams = await Team.findAll();
    return getTeams;
  };

  public getById = async (id: number) => {
    const getTeamId = await Team.findByPk(id);
    if (!getTeamId) throw new IError(404, 'Team not found');
    return getTeamId;
  };
}

export default TeamService;
