import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  username_lower: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

model("users", UserSchema);
