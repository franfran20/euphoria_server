import { Schema } from "mongoose";
declare const Bookmark: import("mongoose").Model<{
    user: string;
    bookId: string;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    user: string;
    bookId: string;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    user: string;
    bookId: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    user: string;
    bookId: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    user: string;
    bookId: string;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    user: string;
    bookId: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default Bookmark;
//# sourceMappingURL=bookmark.model.d.ts.map