var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StoreSchema = new Schema({
  placeId: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Date,
    required: true,
  },
  opening: {
    type: Date,
    required: true,
  },
  closing: {
    type: Date,
    required: true,
  },
  phone: {
    type: Date,
    required: false,
  },
  location: {
    type: Date,
    required: true,
  },
  delivery: {
    type: Boolean,
    required: true,
  },
  drive_thru: {
    type: Boolean,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
});

mongoose.model("stores", StoreSchema);
