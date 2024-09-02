import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
