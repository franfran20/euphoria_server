import { Request, Response } from "express";
import { BookReturnType, SigParams } from "../types/custom";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../errors";
import { executeContractFunction, publicClient } from "../utils/viem";
import Book from "../models/book.model";
import {
  EUPHORIA_FACTORY_ABI,
  EUPHORIA_FACTORY_ADDRESS,
} from "../utils/constants";
import { StatusCodes } from "http-status-codes";
import Chapter from "../models/chapter.model";
import Bookmark from "../models/bookmark.model";

export const createBook = async (req: Request, res: Response) => {
  const {
    chapterLock,
    name,
    coverImageURI,
    genres,
    sig,
    description,
  }: {
    chapterLock: number;
    name: string;
    coverImageURI: string;
    genres: number[];
    sig: SigParams;
    description: string;
  } = req.body;

  console.log(req.body);

  if (sig.user != req.user)
    throw new ForbiddenError("Signature does not match authenticated user.");

  console.log("111111");

  const bookId: bigint = await executeContractFunction({
    functionName: "createEuphoriaBookWithSig",
    args: [chapterLock, name, coverImageURI, genres, sig],
  });

  console.log("22222");

  const [bookInfo, bookName, bookWriter, bookCoverImage] =
    (await publicClient.readContract({
      address: EUPHORIA_FACTORY_ADDRESS,
      abi: EUPHORIA_FACTORY_ABI,
      functionName: "getBook",
      args: [bookId],
    })) as BookReturnType;

  console.log("333333");

  const book = await Book.create({
    bookId: bookId.toString(),
    name: bookName,
    writer: bookWriter,
    description,
    coverImage: bookCoverImage,
    genres: bookInfo.genres.map((num) => num.toString()),
  });

  console.log("44444");

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Created book succesfully", book });
};

export const getBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const book = await Book.findOne({ bookId });

  res.status(StatusCodes.OK).json({ msg: "Fetched Book", success: true, book });
};

export const releaseChapter = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const {
    title,
    finale,
    gatedURI,
    content,
    sig,
  }: {
    title: string;
    finale: boolean;
    gatedURI: string;
    content: string;
    sig: SigParams;
  } = req.body;

  console.log(bookId);
  console.log(req.body);

  if (sig.user != req.user)
    throw new ForbiddenError("Signature does not match authenticated user.");

  const chapterId: bigint = await executeContractFunction({
    functionName: "releaseChapterWithSig",
    args: [bookId, title, gatedURI, finale, sig],
  });

  const chapter = await Chapter.create({
    bookId: bookId,
    chapterId: chapterId.toString(),
    content,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Chapter Stored Successfully", chapter });
};

// modify for only one book mark function,, if bookmark exist delete and then send response that would be used in the client toast
export const bookmark = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const bookmark = await Bookmark.findOne({
    bookId: bookId,
    user: req.user,
  });

  if (bookmark) {
    await Bookmark.deleteOne({ bookId: bookId, user: req.user });
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Unbookmarked", success: true });
  }

  await Bookmark.create({
    bookId: bookId,
    user: req.user,
  });
  return res
    .status(StatusCodes.CREATED)
    .json({ msg: "Bookmarked", success: true });
};

export const getBookmarks = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const bookmarks = await Bookmark.find({
    bookId: bookId,
  });

  res.status(StatusCodes.OK).json({
    msg: "Fetched bookmarks",
    success: true,
    bookmarks: bookmarks.length,
  });
};

export const getChapter = async (req: Request, res: Response) => {
  const { bookId, chapterId } = req.params;

  const hasAccess = (await publicClient.readContract({
    address: EUPHORIA_FACTORY_ADDRESS,
    abi: EUPHORIA_FACTORY_ABI,
    functionName: "hasAccess",
    args: [bookId, req.user, chapterId],
  })) as boolean;

  const chapter = await Chapter.findOne({
    chapterId: chapterId,
    bookId: bookId,
  });
  if (!chapter) throw new NotFoundError("Invalid chapter");

  if (hasAccess)
    return res
      .status(StatusCodes.OK)
      .json({ msg: "success", content: chapter.content });

  res.status(StatusCodes.OK).json({ msg: "no access", content: "" });
};

export const voteBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { votes, sig }: { votes: number; sig: SigParams } = req.body;

  if (sig.user != req.user)
    throw new ForbiddenError("Signature does not match authenticated user.");

  await executeContractFunction({
    functionName: "voteEuphoriaBookWithSig",
    args: [bookId, votes, sig],
  });

  res.status(StatusCodes.OK).json({ msg: "success" });
};

export const getRandomBook = async (req: Request, res: Response) => {
  const [randomBook] = await Book.aggregate([
    {
      $match: {
        description: { $exists: true, $ne: "" },
      },
    },
    {
      $sample: { size: 1 },
    },
  ]);

  if (randomBook.length == 0)
    throw new NotFoundError("No random book with description found");

  res
    .status(StatusCodes.OK)
    .json({ msg: "Random book retrieved", book: randomBook });
};
