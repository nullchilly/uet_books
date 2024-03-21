// //module penaltyModel để thao tác với cơ sở dữ liệu
// const Penalties = require("../models/penaltyModel");
// //đối tượng bảo hành trong web
// const penaltyCtrl = {
//   // Lấy tất cả các bảo hành từ cơ sở dữ liệu và trả về dưới dạng JSON. Nếu không có bảo hành nào thì trả về thông báo "Not labs".
//   getAllPenalties: async (req, res) => {
//     try {
//       const penalties = await Penalties.find();
//       if (penalties) {
//         res.json(penalties);
//       } else {
//         res.json({ msg: "Not labs" });
//       }
//     } catch (error) {
//       return res.status(500).json({ msg: error.message });
//     }
//   },
//   getPenaltyById: async (req, res) => {
//     try {
//       const id = req.params.id;
//       const penalty = await Penalties.findOne({_id : id});

//       if ( penalty) {
//         res.json(penalty);
//       } else {
//         res.json({ msg: "Not penalty" });
//       }
//     } catch (error) {
//       return res.status(500).json({ msg: error.message });
//     }
//   },

// };

// module.exports = penaltyCtrl;
