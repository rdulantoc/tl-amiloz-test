import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserWithRole } from "../types/types";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token not provided" });

  const user = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!
  ) as UserWithRole;
  if (!user) return res.status(403).json({ error: "Unauthorized token" });
  req.user = user;
  next();
}
