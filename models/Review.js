import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
  storeId: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
});

model("reviews", ReviewSchema);
