import { NextFunction, Request, Response } from "express";

export function validateRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const userRole = user?.role.name;
    if (userRole !== role)
      return res.status(403).json({
        error:
          "Cannot perform this action. User does not have required permissions",
      });

    next();
  };
}
