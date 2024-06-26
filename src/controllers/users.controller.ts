import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UsersModel } from "../models/users.model";

export class UsersController {
  static async createUser(req: Request, res: Response) {
    const { name, lastName, email, password, roleId } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const { password: _, ...user } = await UsersModel.create({
        name,
        lastName,
        email,
        password: hashedPassword,
        roleId,
      });

      res.status(201).send(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "User could not be created" });
    }
  }
}
