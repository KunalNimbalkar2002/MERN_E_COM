const { kMaxLength } = require("buffer");
const mongoose = require("mongoose");

const productSchema = mongoose.schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [7, "Price can not exceed 7 Characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
});
