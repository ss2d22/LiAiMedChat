import { IMessage } from "@/types";
import mongoose, { Schema, Model } from "mongoose";

/**
 * Schema for storing the message information
 * @author Sriram Sundar
 *
 * @type {Schema}
 */
const messageSchema: Schema = new Schema<IMessage>({
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
    enum: ["text", "file", "context"],
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

/**
 * Mongoose model for the message schema
 * @author Sriram Sundar
 *
 * @type {Model<IMessage>}
 */
const Message: Model<IMessage> = mongoose.model<IMessage>(
  "messages",
  messageSchema
);

export default Message;
