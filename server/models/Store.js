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
    required: false,
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
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  opening: {
    type: Date,
    required: false,
  },
  closing: {
    type: Date,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  delivery: {
    type: Boolean,
    required: false,
  },
  drive_thru: {
    type: Boolean,
    required: false,
  },
  views: {
    type: Number,
    required: false,
  },
});

mongoose.model("stores", StoreSchema);
