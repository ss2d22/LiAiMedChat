import { ITextbook } from "@/types";
import mongoose, { Schema, Model } from "mongoose";

/**
 * Schema for storing the textbook information
 * @author Sriram Sundar
 *
 * @type {Schema<ITextbook>}
 */
const textbookSchema: Schema<ITextbook> = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  vectorStorePath: { type: String, required: true },
  textFilePath: { type: String, required: true },
});

/**
 * Mongoose model for the textbook schema
 * @author Sriram Sundar
 *
 * @type {Model<ITextbook>}
 */
const Textbook: Model<ITextbook> = mongoose.model<ITextbook>(
  "Textbook",
  textbookSchema
);

export default Textbook;
