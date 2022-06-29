import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teamService';

class TeamController {
  private service = new TeamService();

  getAll = async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const getAllTeams = await this.service.getAll();
      return res.status(200).json(getAllTeams);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  getById = async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { id } = req.params;
      const getTeamId = await this.service.getById(Number(id));
      return res.status(200).json(getTeamId);
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}

export default TeamController;
