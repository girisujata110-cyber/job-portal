import { model, Schema } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
    },
  }
);

export const jobmodel= model("user", jobSchema)