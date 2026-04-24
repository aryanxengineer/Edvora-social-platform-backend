import { type IMessage } from "./message.types.js";
declare const MessageModel: import("mongoose").Model<IMessage, {}, {}, {}, import("mongoose").Document<unknown, {}, IMessage, {}, import("mongoose").DefaultSchemaOptions> & IMessage & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IMessage>;
export default MessageModel;
//# sourceMappingURL=message.model.d.ts.map