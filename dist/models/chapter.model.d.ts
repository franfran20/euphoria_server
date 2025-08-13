import { Schema } from "mongoose";
declare const Chapter: import("mongoose").Model<{
    bookId: string;
    chapterId: string;
    content: string;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    bookId: string;
    chapterId: string;
    content: string;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    bookId: string;
    chapterId: string;
    content: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    bookId: string;
    chapterId: string;
    content: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    bookId: string;
    chapterId: string;
    content: string;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    bookId: string;
    chapterId: string;
    content: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default Chapter;
//# sourceMappingURL=chapter.model.d.ts.map