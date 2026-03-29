import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt.js";
import { UnauthorizedError, ForbiddenError } from "../lib/errors.js";

export interface AuthRequest extends Request {
  user?: { userId: string; roles: string[] };
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    next(new UnauthorizedError("Missing or invalid authorization header"));
    return;
  }
  const token = authHeader.slice(7);
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    next(new UnauthorizedError("Invalid or expired token"));
  }
}

export function requireRoles(...roles: string[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new UnauthorizedError());
      return;
    }
    const hasRole = roles.some((r) => req.user!.roles.includes(r));
    if (!hasRole) {
      next(new ForbiddenError("Insufficient permissions"));
      return;
    }
    next();
  };
}
