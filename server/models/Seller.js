import { Schema, model } from "mongoose";

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

model("sellers", SellerSchema);
