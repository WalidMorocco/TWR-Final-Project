var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StoreSchema = new Schema({
  placeId: {
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
  driveThru: {
    type: Boolean,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  views: {
    type: Number,
    required: false,
  },
});

mongoose.model("stores", StoreSchema);
