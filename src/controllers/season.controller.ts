import { Request, Response } from "express";
import { SigParams } from "../types/custom";
import { ForbiddenError } from "../errors";
import { executeContractFunction } from "../utils/viem";
import { StatusCodes } from "http-status-codes";

export const pullEarnings = async (req: Request, res: Response) => {
  const { bookId, seasonId }: { bookId: number; seasonId: number } = req.body;

  await executeContractFunction({
    functionName: "pullSeasonsEarnings",
    args: [bookId, seasonId],
  });

  res.status(StatusCodes.OK).json({ msg: "Pulled Earnings", success: true });
};

export const startNewSeason = async (req: Request, res: Response) => {
  await executeContractFunction({
    functionName: "startNewSeason",
    args: [],
  });

  res.status(StatusCodes.OK).json({ msg: "New Season Started", sucess: true });
};
