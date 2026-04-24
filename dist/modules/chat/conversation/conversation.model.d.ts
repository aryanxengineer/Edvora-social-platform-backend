import mongoose from "mongoose";
import { type IConversation } from "./conversation.types.js";
declare const ConversationModel: mongoose.Model<IConversation, {}, {}, {}, mongoose.Document<unknown, {}, IConversation, {}, mongoose.DefaultSchemaOptions> & IConversation & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IConversation>;
export default ConversationModel;
//# sourceMappingURL=conversation.model.d.ts.map