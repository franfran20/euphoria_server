import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SiweMessage, generateNonce } from "siwe";
import jwt from "jsonwebtoken";
import config from "../config";

export const getNonce = (req: Request, res: Response) => {
  const nonce = generateNonce();
  res.status(StatusCodes.OK).json({ nonce });
};

export const verifySignature = async (req: Request, res: Response) => {
  const { message, signature } = req.body;
  let siweMessage = new SiweMessage(message);

  const {
    success,
    error,
    data: signedMessage,
  } = await siweMessage.verify({ signature });

  // if (!success) {
  //   console.error(error);
  //   throw new BadRequestError("Invalid Signature");
  // }

  // const oneDay = 60 * 60 * 24 * 1000;
  const token = jwt.sign({ user: signedMessage.address }, config.jwtSecret, {
    expiresIn: "1d",
  });

  res.status(StatusCodes.OK).json({
    msg: "Authentication successful",
    user: signedMessage.address,
    token,
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("authToken");
  res.status(StatusCodes.OK).json({ msg: "User logged out successfully" });
};

export const checkAuth = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
