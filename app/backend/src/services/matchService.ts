import IMatch from '../interfaces/IMatch';
import errorNotFound from '../externals/errorNotFound';

import Team from '../database/models/team';
import Match from '../database/models/match';

class MatchService {
  getAll = async (): Promise<IMatch[]> => {
    const allMatches = await Match.findAll({
      attributes: ['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress'],
      include:
        [
          { model: Team, as: 'teamHome', attributes: ['teamName'] },
          { model: Team, as: 'teamAway', attributes: ['teamName'] },
        ],
    });

    if (!allMatches) {
      throw errorNotFound('Matches not found');
    }

    return allMatches as IMatch[];
  };

  getMatchesInProgress = async (query: boolean): Promise<IMatch[]> => {
    const matchesInProgress = await Match.findAll({
      where: { inProgress: query },
      attributes: ['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress'],
      include:
        [
          { model: Team, as: 'teamHome', attributes: ['teamName'] },
          { model: Team, as: 'teamAway', attributes: ['teamName'] },
        ],
    });

    if (!matchesInProgress) {
      throw errorNotFound('Matches not found');
    }

    return matchesInProgress as IMatch[];
  };
}

export default MatchService;
