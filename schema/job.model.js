import { model, Schema } from "mongoose";

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  company: {
    type: String,
    required: true,
    trim: true,
  },

  location: {
    type: String,
    required: true,
    trim: true,
  },

  salary: {
    type: Number,
    required: true,
    min: 1,
  },
});

export const jobmodel = model("Job", jobSchema);