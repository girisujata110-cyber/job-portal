import { model, Schema } from "mongoose";

const jobSchema = new Schema({
  title: {
    type: String,
    required: [true, "Job title is required"],
    trim: true,
    minlength: [2, "Job title must be at least 2 characters"],
    maxlength: [100, "Job title cannot exceed 100 characters"],
  },

  company: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
    minlength: [2, "Company name must be at least 2 characters"],
    maxlength: [100, "Company name cannot exceed 100 characters"],
  },

  location: {
    type: String,
    required: [true, "Job location is required"],
    trim: true,
    minlength: [2, "Location must be at least 2 characters"],
    maxlength: [100, "Location cannot exceed 100 characters"],
  },

  salary: {
    type: Number,
    required: [true, "Salary is required"],
    min: [1, "Salary must be greater than 0"],
    max: [10000000, "Salary cannot exceed 10,000,000"],
    validate: {
      validator: function (value) {
        return value > 0;
      },
      message: "Salary must be greater than 0",
    },
  },
});

export const jobmodel = model("user", jobSchema);