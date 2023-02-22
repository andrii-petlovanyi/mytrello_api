import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    accessToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
};

userSchema.methods.setToken = function (token) {
  this.accessToken = token;
};

userSchema.methods.comparePassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);
export { User };
