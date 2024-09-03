import mongoose, { CallbackError } from "mongoose";
import { genSalt, hash } from "bcrypt";
import { IUserSchema } from "@/types";

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
userSchema.pre<IUserSchema>("save", async function (next) {
  try {
    const salt = await genSalt(10);
    this.password = await hash(this.password as string, salt);
    next();
  } catch (error) {
    next(error as CallbackError); // Handle errors
  }
});

/**
 * defines the user model for the mongoDb database
 * @author Sriram Sundar
 *
 * @type {mongoose.Model<IUser>}
 */
const User: mongoose.Model<IUserSchema> = mongoose.model<IUserSchema>(
  "用户",
  userSchema
);

// Exclude password from query results
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default User;
