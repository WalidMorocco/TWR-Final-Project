import { Schema, model } from "mongoose";

const RatingSchema = new Schema({
  storeId: {
    type: String,
    unique: true,
    required: true,
  },
  ratingSum: {
    type: Number,
    required: true,
  },
  ratingCount: {
    type: Number,
    required: true,
  },
});

model("ratings", RatingSchema);
