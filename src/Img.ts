import mongoose from "mongoose";
import { Schema } from "mongoose";

export const ImgSchema = new Schema(
  {
    url: { type: String, require: true },
    roomId: { type: String, require: true },
  },
  {
    timestamps: true,
  },
);

const Img = mongoose.model("Img", ImgSchema);
export default Img;
