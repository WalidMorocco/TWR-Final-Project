const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  storeId: {
    type: String,
    unique: true,
    required: true,
  },
});

mongoose.model("sellers", SellerSchema);
