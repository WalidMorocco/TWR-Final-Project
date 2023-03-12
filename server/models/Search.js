import { Schema, model } from "mongoose";

const SearchSchema = new Schema({
  createdAt: {
    type: Date,
    required: true,
  },
  location: {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  radius: {
    type: Number,
    required: true,
  },
  pageToken: {
    type: String,
    required: false,
  },
  results: {
    type: String,
    required: true,
  },
});

model("searches", SearchSchema);
