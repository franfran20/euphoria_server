import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Unauthenticated } from "../errors";
import config from "../config";
import { Address } from "viem";

const authenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const token = req.cookies.authToken;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) throw new Unauthenticated("Authentication Invalid");

  try {
    const { user } = jwt.verify(token, config.jwtSecret) as { user: Address };
    req.user = user;
    next();
  } catch (err) {
    throw new Unauthenticated("Authentication Invalid");
  }
};

export default authenticatedMiddleware;

// deal with bookmarking
// book chapters that were deployed outside of your backend etc
