import type { IUser } from "./user.interface.js"; // adjust to your actual user type/interface

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
      auth?: {
        userId?: string;
      };
    }
  }
}

export {};


