import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
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

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UsersModel.findByEmail({ email });
      if (!user) return res.status(404).json({ error: "Could not find user" });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET ?? "", {
        expiresIn: "1h",
      });

      return res
        .status(200)
        .cookie("auth_token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
        })
        .json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error in login." });
    }
  }
}
