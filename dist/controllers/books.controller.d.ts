import { Request, Response } from "express";
export declare const createBook: (req: Request, res: Response) => Promise<void>;
export declare const getBook: (req: Request, res: Response) => Promise<void>;
export declare const releaseChapter: (req: Request, res: Response) => Promise<void>;
export declare const bookmark: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getBookmarks: (req: Request, res: Response) => Promise<void>;
export declare const getChapter: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const voteBook: (req: Request, res: Response) => Promise<void>;
export declare const getRandomBook: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=books.controller.d.ts.map