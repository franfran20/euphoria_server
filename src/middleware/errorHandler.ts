import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { SiweError, SiweErrorType } from "siwe";
import { CustomError } from "../errors";
import { BaseError, ContractFunctionRevertedError } from "viem";
import { formatErrorName } from "../utils";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  // SIWE error handling
  if (err instanceof SiweError)
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.type });

  // Custom error Handling
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  // Viewm contract interaction error handling
  if (err instanceof BaseError) {
    const revertError = err.walk(
      (err) => err instanceof ContractFunctionRevertedError
    );
    if (revertError instanceof ContractFunctionRevertedError) {
      console.log(revertError);
      const errorMessage = formatErrorName(revertError.data!.errorName);
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: errorMessage });
    }
  }

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong. Try again later." });
};
