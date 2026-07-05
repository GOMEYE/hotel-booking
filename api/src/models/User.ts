import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  image: string;
  role: "user" | "hotelOwner";
  recentSearchedCities: string[];
}

const userSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "hotelOwner"],
      default: "user",
    },
    recentSearchedCities: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
