import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/leaderBService';
import Match from '../database/models/match';
import Team from '../database/models/team';

const mess = 'algo inesperado ocorreu';
class LeaderboardController {
  public createHomeLeaderB = async (req: Request, res: Response, _next: NextFunction) => {
    const allTeams = await Team.findAll();
    const allMatches = await Match.findAll({ raw: true, where: { inProgress: false } });

    const leaderboardService = new LeaderboardService(allTeams, allMatches);
    const leaderB = await leaderboardService.createHomeLeaderB();
    if (leaderB) {
      return res.status(200).json(leaderB);
    }
    return res.status(500).json({ message: mess });
  };

  public createAwayLeaderB = async (req: Request, res: Response, _next: NextFunction) => {
    const allTeams = await Team.findAll();
    const allMatches = await Match.findAll({ raw: true, where: { inProgress: false } });

    const leaderboardService = new LeaderboardService(allTeams, allMatches);
    const leaderB = await leaderboardService.createAwayLeaderB();
    if (leaderB) {
      return res.status(200).json(leaderB);
    }
    return res.status(500).json({ message: mess });
  };

  public createLeaderboard = async (req: Request, res: Response, _next: NextFunction) => {
    const allTeams = await Team.findAll();
    const allMatches = await Match.findAll({ raw: true, where: { inProgress: false } });

    const leaderboardService = new LeaderboardService(allTeams, allMatches);
    const leaderB = await leaderboardService.createLeaderboard();
    if (leaderB) {
      return res.status(200).json(leaderB);
    }
    return res.status(500).json({ message: mess });
  };
}

export default LeaderboardController;
