const mongoose = require("mongoose");

const libSchema = new mongoose.Schema (
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    storage: {
      type: Array,
    },
    account: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Libs", libSchema);
