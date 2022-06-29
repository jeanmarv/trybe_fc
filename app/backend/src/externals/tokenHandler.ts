import * as fs from 'fs/promises';
import { sign, verify } from 'jsonwebtoken';

class Token {
  generateToken = async (received: string) => {
    const token = await fs.readFile('jwt.evaluation.key', 'utf-8');
    const receivedToken = sign({ received }, token, { expiresIn: '8h', algorithm: 'HS256' });
    return receivedToken;
  };

  verifyToken = async (authorization: string) => {
    const token = await fs.readFile('jwt.evaluation.key', 'utf-8');
    const verified = verify(authorization, token);
    const findRole = Object.values(verified);
    const role = findRole.find((item) => (typeof item) === 'string');
    return role;
  };
}

export default Token;
