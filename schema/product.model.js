import { model, Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minlength: [2, "Product name must be at least 2 characters"],
    maxlength: [50, "Product name cannot exceed 50 characters"],
  },

  benefit: {
    type: String,
    required: [true, "Product benefit is required"],
    trim: true,
    minlength: [5, "Benefit must be at least 5 characters"],
    maxlength: [200, "Benefit cannot exceed 200 characters"],
  },

  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters"],
    maxlength: [500, "Description cannot exceed 500 characters"],
  },

  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [1, "Price must be greater than 0"],
    max: [1000000, "Price cannot exceed 1,000,000"],
    validate: {
      validator: function (value) {
        return value > 0;
      },
      message: "Price must be greater than 0",
    },
  },

  image: {
    type: String,
    trim: true,
  },

  category: {
    type: String,
    required: [true, "Product category is required"],
    trim: true,
    enum: {
      values: ["Beauty", "Food", "Electronics", "Clothing", "Medicine"],
      message: "Invalid product category",
    },
  },

  stock: {
    type: Number,
    default: 0,
    min: [0, "Stock cannot be negative"],
    max: [100000, "Stock cannot exceed 100,000"],
    validate: {
      validator: Number.isInteger,
      message: "Stock must be a whole number",
    },
  },
});

export const productmodel = model("fyp", productSchema);