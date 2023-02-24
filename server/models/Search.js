import { Schema, model } from "mongoose";

const SearchSchema = new Schema({
  location: {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  radius: {
    type: Number,
    required: true,
  },
  results: {
    type: String,
    required: true,
  },
});

model("searches", SearchSchema);
