import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request, response: Response, next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'No token provided' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ error: 'Token malformatted' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error: Error, decoded: IPayload) => {
    if (error) {
      return response.status(401).json({ error: 'Invalid token' });
    }
    const { sub } = decoded;
    request.user_id = sub;
  });

  next();
}
