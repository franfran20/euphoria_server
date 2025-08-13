import { Address } from "viem";
export type bytes32 = `0x${string}`;
export type SigParams = {
    deadline: bigint;
    nonce: bigint;
    r: bytes32;
    s: bytes32;
    user: Address;
    v: bigint;
};
type BookType = {
    owner: Address;
    createdAt: bigint;
    chapterLock: bigint;
    chaptersWritten: bigint;
    genres: bigint[];
    completed: boolean;
    lastPulledSeasonId: bigint;
    earnings: bigint;
};
export type BookReturnType = [BookType, string, string, string, bigint];
export {};
//# sourceMappingURL=custom.d.ts.map