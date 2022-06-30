import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teamService';

export default class TeamsController {
  public service = new TeamsService();

  public getAll = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    try {
      const getTeams = await this.service.getAll();
      return res.status(200).json(getTeams);
    } catch (err: any) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id, 10);
      const getTeamId = await this.service.getById(id);
      return res.status(200).json(getTeamId);
    } catch (err: any) {
      return res.status(err.status).json({ message: err.message });
    }
  };
}
