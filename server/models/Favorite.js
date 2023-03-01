import { Schema, model } from "mongoose";

const FavoriteSchema = new Schema({
  storeId: {
    type: String,
    unique: true,
    required: true,
  },
  users: {
    type: [String],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    address: { type: String, required: true },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  image: {
    type: String,
    required: false,
  },
});

model("favorites", FavoriteSchema);
