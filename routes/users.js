const mongoose = require("mongoose");
const mongooseLocal = require("passport-local-mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique : true,
    },
    fullName: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(mongooseLocal);
const User = mongoose.model("User", userSchema);
module.exports = User;
