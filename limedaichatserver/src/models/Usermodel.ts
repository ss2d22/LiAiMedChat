import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";
/**
 * defines the user schema for the mongoDb database
 * @author Sriram Sundar
 *
 * @type {mongoose.Schema}
 */
const userSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "需要电子邮件"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "需要密码"],
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  theme: {
    type: Number,
    required: false,
  },
  configuredProfile: {
    type: Boolean,
    required: false,
  },
});

//TODO: make it more securre
userSchema.pre("save", async function (next) {
  const salt = await genSalt();
  this.password = await hash(this.password as string, salt);
  next();
});

/**
 * defines the user model for the mongoDb database
 * @author Sriram Sundar
 *
 * @type {*}
 */
const User: mongoose.Model<mongoose.Document> =
  mongoose.model<mongoose.Document>("用户", userSchema);

export default User;
