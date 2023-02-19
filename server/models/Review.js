import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
  storeId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
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
    required: false,
  },
});

model("reviews", ReviewSchema);
