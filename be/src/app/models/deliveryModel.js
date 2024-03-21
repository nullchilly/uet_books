const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema (
  {
    from: {
      type: String,
    },
    nameFrom: {
      type: String,
    },
    to: {
      type: String,
    },
    nameTo: {
      type: String,
    },
    nameBook: {
      type: String,
    },
    idBook: {
      type: String,
    },
    idRentPenalty: {
      type: String,
    },
    amount: {
      type: Number,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: 'Đang giao hàng'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Deliveries", deliverySchema);
