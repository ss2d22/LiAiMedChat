import { IMessage } from "@/types";
import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema<IMessage>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "用户",
    required: true,
  },
  reciever: {
    type: Schema.Types.ObjectId,
    ref: "Textbook",
    required: true,
  },
  messageType: {
    type: String,
    enum: ["text", "file"],
    required: true,
  },
  content: {
    type: String,
    required: function (this: IMessage) {
      return this.messageType === "text";
    },
  },
  file: {
    type: String,
    required: function (this: IMessage) {
      return this.messageType === "file";
    },
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model<IMessage>("信息", messageSchema);

export default Message;
