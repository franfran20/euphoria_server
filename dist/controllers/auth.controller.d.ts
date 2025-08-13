import { Request, Response } from "express";
export declare const getNonce: (req: Request, res: Response) => void;
export declare const verifySignature: (req: Request, res: Response) => Promise<void>;
export declare const logout: (req: Request, res: Response) => void;
export declare const checkAuth: (req: Request, res: Response) => void;
//# sourceMappingURL=auth.controller.d.ts.map