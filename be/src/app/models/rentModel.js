// const mongoose = require("mongoose");

// const rentModel = new mongoose.Schema (
//   {
//     idLab: {
//       type: String,
//     },
//     nameLab: {
//       type: String,
//     },
//     idStudent: {
//       type: String,
//     },
//     idBook: {
//       type: String,
//     },
//     nameBook: {
//       type: String,
//     },
//     price: {
//       type: Number,
//     },
//     status: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Rents", rentModel);


const mongoose = require("mongoose");

const rentModel = new mongoose.Schema (
  {
    idLab: {
      type: String,
    },
    idStudent: {
      type: String,
    },
    idBook: {
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

module.exports = mongoose.model("Rents", rentModel);
