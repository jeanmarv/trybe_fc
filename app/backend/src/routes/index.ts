import { Application as App } from 'express';
import loginRoutes from './loginRoutes';
import matchRoutes from './matchRoutes';
import teamRoutes from './teamRoutes';
import leaderBRoutes from './leaderBRoutes';

const Routes = (app:App) => {
  app.get('/', (_req, res) => res.status(200).json('appworking'));
  app.use('/login', loginRoutes);
  app.use('/teams', teamRoutes);
  app.use('/matches', matchRoutes);
  app.use('/leaderboard', leaderBRoutes);
};

export default Routes;
