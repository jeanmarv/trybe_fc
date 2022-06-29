import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teamService';

class MatchMiddleware {
  static async validateTeams(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    const modelTeam = new TeamService();
    const getAll = await modelTeam.getAll();

    if (homeTeam === awayTeam) {
      return res
        .status(401).json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (homeTeam < 1 || homeTeam > getAll.length) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    if (awayTeam < 1 || awayTeam > getAll.length) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  }
}

export default MatchMiddleware;
