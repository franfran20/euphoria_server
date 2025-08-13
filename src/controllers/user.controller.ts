import { Request, Response } from "express";
import { SigParams } from "../types/custom";
import { ForbiddenError } from "../errors";
import { executeContractFunction } from "../utils/viem";
import { StatusCodes } from "http-status-codes";
import { Address } from "viem";

export const registerWriter = async (req: Request, res: Response) => {
  const { username, sig }: { username: string; sig: SigParams } = req.body;

  if (sig.user != req.user)
    throw new ForbiddenError("Signature does not match authenticated user.");

  await executeContractFunction({
    functionName: "registerWriterWithSig",
    args: [username, sig],
  });

  res.status(StatusCodes.OK).json({ msg: "success" });
};

export const subscribe = async (req: Request, res: Response) => {
  const { sig }: { sig: SigParams } = req.body;

  if (sig.user != req.user)
    throw new ForbiddenError("Signature does not match authenticated user.");

  await executeContractFunction({
    functionName: "subscribeWithSig",
    args: [sig],
  });

  res.status(StatusCodes.OK).json({ msg: "success" });
};

export const allocateToBook = async (req: Request, res: Response) => {
  const {
    bookId,
    amount,
    sig,
  }: { bookId: number; amount: number; sig: SigParams } = req.body;

  if (sig.user != req.user)
    throw new ForbiddenError("Signature does not match authenticated user.");

  await executeContractFunction({
    functionName: "useSpendBackWithSig",
    args: [bookId, amount, sig],
  });

  res.status(StatusCodes.OK).json({ msg: "success" });
};

export const mint = async (req: Request, res: Response) => {
  const { recipient, amount }: { recipient: Address; amount: number } =
    req.body;

  await executeContractFunction({
    functionName: "mintTokensIntoBalance",
    args: [amount, recipient],
  });

  res.status(StatusCodes.OK).json({ msg: "success" });
};
