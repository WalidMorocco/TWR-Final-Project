import { Schema, model } from "mongoose";

const StoreSchema = new Schema({
  createdAt: {
    type: Date,
    required: false,
  },
  storeId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  location: {
    address: { type: String, required: true },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  images: {
    type: [String],
    required: false,
  },
  openingHours: {
    type: [String],
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  delivery: {
    type: Boolean,
    required: false,
  },
  curbsidePickup: {
    type: Boolean,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  ratingsCount: {
    type: Number,
    required: false,
  },
  views: {
    type: Number,
    required: false,
  },
  distance: {
    type: Number,
    required: false,
  },
  reviews: [
    {
      user: {
        username: { type: String, required: true },
        picture: { type: String, required: false },
      },
      rating: { type: Number, required: true },
      text: { type: String, required: false },
      timestamp: { type: Number, required: true },
    },
  ],
  users: {
    type: [String],
    required: false,
  },
});

model("stores", StoreSchema);
