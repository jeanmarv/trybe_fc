import { NextFunction, Request, Response } from 'express';
import IGoals from '../interfaces/Igoals';
import MatchService from '../services/matchService';

class MatchController {
  private service = new MatchService();

  getInProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let matches = [];
      const { inProgress } = req.query;
      if (!inProgress) {
        matches = await this.service.getAll();
      } else {
        const query = inProgress !== 'false';
        matches = await this.service.getInProgress(query);
      }
      return res.status(200).json(matches);
    } catch (err) {
      next(err);
    }
  };

  createNewMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      if (!authorization) {
        return res.status(404).json({ message: 'Token not found' });
      }
      const newMatch: IGoals = {
        homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
      };
      const create = await this.service.createNewMatch(authorization, newMatch);

      return res.status(201).json(create);
    } catch (err) {
      next(err);
    }
  };

  updateProgressMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.service.updateProgressMatch(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (err) {
      next(err);
    }
  };

  editMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await this.service.editMatch(id, homeTeamGoals, awayTeamGoals);
      return res.status(200).json({ message: 'Updated match' });
    } catch (err) {
      next(err);
    }
  };
}

export default MatchController;
