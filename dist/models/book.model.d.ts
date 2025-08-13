import { Schema } from "mongoose";
declare const Book: import("mongoose").Model<{
    genres: string[];
    bookId: string;
    writer: string;
    name: string;
    coverImage?: string | null;
    description?: string | null;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    genres: string[];
    bookId: string;
    writer: string;
    name: string;
    coverImage?: string | null;
    description?: string | null;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    genres: string[];
    bookId: string;
    writer: string;
    name: string;
    coverImage?: string | null;
    description?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    genres: string[];
    bookId: string;
    writer: string;
    name: string;
    coverImage?: string | null;
    description?: string | null;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    genres: string[];
    bookId: string;
    writer: string;
    name: string;
    coverImage?: string | null;
    description?: string | null;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    genres: string[];
    bookId: string;
    writer: string;
    name: string;
    coverImage?: string | null;
    description?: string | null;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default Book;
//# sourceMappingURL=book.model.d.ts.map