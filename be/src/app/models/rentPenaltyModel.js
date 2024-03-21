const mongoose = require("mongoose");

const rentPenaltyModel = new mongoose.Schema (
  {
    idRent: {
      type: String,
    },   
    error: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RentPenalties", rentPenaltyModel);
