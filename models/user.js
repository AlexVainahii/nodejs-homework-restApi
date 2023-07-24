const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const { schemas } = require("../schemas");
const userShema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: schemas.emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: { type: String, default: null },
  },
  { versionKey: false, timestamps: true }
);

userShema.post("save", handleMongooseError);

const User = model("user", userShema);

module.exports = { User };
