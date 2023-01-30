var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SellerSchema = new Schema({
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
