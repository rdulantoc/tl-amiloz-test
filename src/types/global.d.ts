import { UserWithRole } from "./types";

// Override to include the user in the request type
declare global {
  namespace Express {
    export interface Request {
      user?: UserWithRole;
    }
  }
}
