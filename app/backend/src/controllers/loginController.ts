import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcryptjs';
import User from '../database/models/user';
import Token from '../externals/tokenHandler';

class Login {
  private token = new Token();

  user = async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const validatePassword = await compare(password, findUser.password);
    if (!validatePassword) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const user = {
      id: findUser.id,
      username: findUser.username,
      role: findUser.role,
      email,
    };

    const token = await this.token.generateToken(user.role);
    return res.status(200).json({ user, token });
  };

  validateUser = async (req: Request, res: Response, _next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const verifyToken = await this.token.verifyToken(authorization);
    return res.status(200).send(verifyToken);
  };
}

export default Login;
