import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  private service = new LoginService();

  login = async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { password, email } = req.body;
      const emailpass = await this.service.login(password, email);
      return res.status(emailpass.statusCode).json(emailpass.result);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  validateLogin = async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json('Token not found');
      }
      const validatedLogin = await this.service.loginValidate(authorization);
      return res.status(200).json(validatedLogin);
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}

export default LoginController;
