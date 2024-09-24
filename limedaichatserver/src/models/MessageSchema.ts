import { IMessage } from "@/types";
import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema<IMessage>({
  sender: {
    type: Schema.Types.ObjectId,
    refPath: "senderModel",
    required: false,
  },
  senderModel: {
    type: String,
    required: true,
    enum: ["User", "Textbook"],
  },
  receiver: {
    type: Schema.Types.ObjectId,
    refPath: "receiverModel",
    required: true,
  },
  receiverModel: {
    type: String,
    required: true,
    enum: ["User", "Textbook"],
  },
  isAI: {
    type: Boolean,
    default: false,
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

const Message = mongoose.model<IMessage>("messages", messageSchema);

export default Message;
