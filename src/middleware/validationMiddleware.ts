import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";

export function validateSchema(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));
        res.status(400).json({ error: "Data is invalid", details: errors });
      } else {
        res.status(500).json({ error: "Internal server Error" });
      }
    }
  };
}
