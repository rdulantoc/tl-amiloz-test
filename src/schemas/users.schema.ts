import { z } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - name
 *        - lastName
 *        - email
 *        - password
 *        - roleId
 *      properties:
 *        name:
 *          type: string
 *          default: Juan
 *        lastName:
 *          type: string
 *          default: Perez
 *        email:
 *          type: string
 *          default: juan@gmail.com
 *        password:
 *          type: string
 *          default: 1234
 *        roleId:
 *          type: string
 *          default: 76210e9a-6b9f-44c0-ae16-20e78b180677
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        lastName:
 *          type: string
 *        email:
 *          type: string
 *        roleId:
 *          type: string
 *    LoginInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: juan@gmail.com
 *        password:
 *          type: string
 *          default: 1234
 *    LoginResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 */

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(1, "Name cannot be empty"),
    lastName: z
      .string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
      })
      .min(1, "Last name cannot be empty"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(4, "Password should have at least 4 characters"),
    roleId: z
      .string({ required_error: "Role is required" })
      .uuid("Invalid role id"),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required"),
  }),
});
