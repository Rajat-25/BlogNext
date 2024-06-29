import jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

interface customRequest extends Request {
  userId?: String;
}

interface AuthType {
  req: customRequest;
  res: Response;
  next: NextFunction;
}

const authMiddleware = (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const jwtSecret = process.env.JWT_SECRET!;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization failed' });
    }

    let authToken = authHeader.split(' ')[1];

    const data: any = jwt.verify(authToken, jwtSecret);

    req.userId = data.userId;

    next();
  } catch (err) {
    return res.status(501).json({ message: 'Internal server error' });
  }
};

export default authMiddleware;
