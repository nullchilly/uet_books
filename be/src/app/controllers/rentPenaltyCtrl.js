const RentPenalties = require("../models/rentPenaltyModel");
const Rents = require("../models/rentModel");
const Students = require("../models/studentModel");
const Books = require("../models/bookModel");
const logger = require("../../../log");


const rentPenaltyCtrl = {
  getAllRentPenalties: async (req, res) => {
    try {
      const rentPenalties = await RentPenalties.find();
      if (rentPenalties) {
        res.json(rentPenalties);
      } else {
        res.json({ msg: "Not labs" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // getPenaltyById: async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     const penalty = await RentPenalties.findOne({_id : id});

  //     if ( penalty) {
  //       res.json(penalty);
  //     } else {
  //       res.json({ msg: "Not penalty" });
  //     }
  //   } catch (error) {
  //     return res.status(500).json({ msg: error.message });
  //   }
  // },

  createRentPenalty: async (req, res) => {
    try {
      const { idRent, error, idLab, status } = req.body;
      console.log(req.body);
      const rent = await Rents.findOne({ _id: idRent });
      if (!rent) {
        logger.error("Lỗi khi tạo");
        return res.json({
          msg: "Failure Create new Penalty Rent",
          create: true,
        });
      }
      await Rents.findByIdAndUpdate(
        idRent,
        { status: "penalty" },
        { new: true }
      );
      const newRentPenalty = new RentPenalties({
        idRent: idRent,
        error: error,
        idLab: idLab,
        status: status,
      });
      await newRentPenalty.save();
      logger.info("Create new Penalty Rent");
      res.json({ msg: "Create new Penalty Rent", create: true });
    } catch (error) {
      logger.error("Error: Create new Penalty Rent");
      return res.status(500).json({ msg: error.message });
    }
  },
  updateNotRentPenalty: async (req, res) => {
    try {
      const idRentPenalty = req.params.id;
      console.log(idRentPenalty);
      // const rentPenalty = await RentPenalties.findOne({
      //   _id: idRentPenalty,
      // });
      // const rent = await Rents.findOne({ _id: rentPenalty.idRent });
      // if (!rent) {
      //   return res.json({
      //     msg: "Failure update new Penalty Rent",
      //     update: true,
      //   });
      // }
      // if (!rentPenalty) {
      //   return res.json({
      //     msg: "Failure update new Penalty Rent",
      //     update: true,
      //   });
      // }
      // await Rents.findByIdAndUpdate(
      //   rent._id,
      //   { status: "not penalty" },
      //   { new: true }
      // );
      await RentPenalties.findByIdAndDelete(idRentPenalty);
      logger.info("Update new Penalty Rent");
      res.json({ msg: "Update", update: true });
    } catch (error) {
      logger.error("Lỗi catch");
      return res.status(500).json({ msg: error.message });
    }
  },

  getRentPenaltyByIdLab: async (req, res) => {
    try {
      const id = req.params.id;
      const rentPenalties = await RentPenalties.find({
        idLab: id,
        // status: "lab",
      });

      if (rentPenalties) {
        let rents = await Promise.all(
          rentPenalties.map(async (rentPenalty) => {
            return await Rents.findOne({ _id: rentPenalty.idRent });
          })
        );

        let students = await Promise.all(
          rents.map(async (rent) => {
            return await Students.findOne({ _id: rent.idStudent});
          })
        );
        let books = await Promise.all(
          rents.map(async (rent) => {
            return await Books.findOne({ _id: rent.idBook});
          })
        );
        logger.info("get RentPenalty by ID Lab");

        res.json({
          rents: rents,
          rentPenalties: rentPenalties,
          students:students,
          books: books,
        });
      } else {
        logger.error("Not RentPenalty");
        res.json({ msg: "Not rentPenalties" });
      }
    } catch (error) {
      logger.error("Error: get RentPenalty by ID Lab");
      return res.status(500).json({ msg: error.message });
    }
  },

  // getRentPenaltyByIdPenalty: async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     const rentPenalties = await RentPenalties.find({
  //       idRentPenalty: id,
  //       status: "penalty",
  //     });

  //     if (rentPenalties) {
  //       let bookRentPenalties = await Promise.all(
  //         rentPenalties.map(async (rentPenalty) => {
  //           return await Rents.findOne({ _id: rentPenalty.idRent });
  //         })
  //       );
  //       res.json({
  //         bookRentPenalties: bookRentPenalties,
  //         rentPenalties: rentPenalties,
  //       });
  //     } else {
  //       res.json({ msg: "Not rentPenalties" });
  //     }
  //   } catch (error) {
  //     return res.status(500).json({ msg: error.message });
  //   }
  // },

  getRentPenaltyByIdLib: async (req, res) => {
    try {
      const id = req.params.id;
      const rentPenalties = await RentPenalties.find({
        idLib: id,
        status: "lib",
      });

      if (rentPenalties) {
        // let bookRentPenalties = await Promise.all(
        //   rentPenalties.map(async (rentPenalty) => {
        //     return await Rents.findOne({ _id: rentPenalty.idRent });
        //   })
        // );
        logger.info("get RentPenalty by ID Lib");
        res.json({
          // bookRentPenalties: bookRentPenalties,
          rentPenalties: rentPenalties,
        });
      } else {
        logger.error("Not rentPenalties");
        res.json({ msg: "Not rentPenalties" });
      }
    } catch (error) {
      logger.error("Error: get RentPenalty by ID Lib");
      return res.status(500).json({ msg: error.message });
    }
  },

  updateStatusPenalty: async (req, res) => {
    try {
      const idRentPenalty = req.params.id;
      const rentPenalty = await RentPenalties.findOne({
        _id: idRentPenalty,
      });
      req.body.status = "Đã đền bù";
      if (rentPenalty) {
        console.log(rentPenalty);
        await RentPenalties.findByIdAndUpdate(
          idRentPenalty,
          req.body,
          { new: true }
        );
        logger.info("Updated Status Penalty ")
        return res.json({update: true});
      }
    } catch (error) {
      logger.error("Error: Update Status Penalty");
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = rentPenaltyCtrl;
