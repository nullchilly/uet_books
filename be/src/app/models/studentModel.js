const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    studentID: {
      type: String,
      required: true,
      trim: true,
    }, 
    courseClass: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true, 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Students", studentSchema);
