import { NextFunction, Request, Response } from 'express';

export function ioMiddleware(io) {
  return (request: Request, response: Response, next: NextFunction) => {
    request.io = io;
    next();
  };
}
