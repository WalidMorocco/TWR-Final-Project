import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
  storeId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

model("reviews", ReviewSchema);
