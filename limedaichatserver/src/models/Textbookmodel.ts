import mongoose from "mongoose";

/**
 * schema for storing the textbook information
 * @author Sriram Sundar
 *
 * @type {mongoose.Schema}
 */
const textbookSchema: mongoose.Schema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  vectorStorePath: { type: String, required: true },
  textFilePath: { type: String, required: true },
});

/**
 * mongoose model for the textbook schema
 * @author Sriram Sundar
 *
 * @type {*}
 */
const Textbook = mongoose.model("Textbook", textbookSchema);

export default Textbook;
