import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  private service = new MatchService();

  getAll = async (req: Request, res: Response, _next: NextFunction) => {
    try {
      let match = [];
      const { inProgress } = req.query;

      if (inProgress) {
        const query = inProgress !== 'false';
        match = await this.service.getMatchesInProgress(query);
      } else {
        match = await this.service.getAll();
      }

      return res.status(200).json(match);
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}

export default MatchController;
