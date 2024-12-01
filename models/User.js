import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  user: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

export const User = model("User", UserSchema);

