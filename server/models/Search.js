const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("./Store");
StoreSchema = mongoose.model("stores").schema;

let SearchSchema = new Schema({
  location: {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  results: {
    type: [StoreSchema],
    required: true,
  },
});

mongoose.model("searches", SearchSchema);
