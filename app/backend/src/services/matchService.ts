import IGoals from '../interfaces/Igoals';
import Match from '../database/models/match';
import Team from '../database/models/team';
import Token from '../externals/tokenHandler';

class MatchService {
  private token = new Token();
  getAll = async () => {
    const matches = await Match.findAll({ include:
      [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ] });
    return matches;
  };

  getInProgress = async (query: boolean) => {
    const matches = await Match.findAll({ where: { inProgress: query },
      include:
        [
          { model: Team, as: 'teamHome', attributes: ['teamName'] },
          { model: Team, as: 'teamAway', attributes: ['teamName'] },
        ],
    });
    return matches;
  };

  createNewMatch = async (auth: string, match: IGoals): Promise <IGoals> => {
    await this.token.verifyToken(auth);
    const newMatch = await Match.create(match);
    return newMatch;
  };

  updateProgressMatch = async (id: string) => {
    await Match.update({ inProgress: false }, { where: { id } });
  };

  editMatch = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };
}

export default MatchService;
