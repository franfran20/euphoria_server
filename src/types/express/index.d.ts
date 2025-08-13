import { Address } from "viem";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: Address;
    }
  }
}
