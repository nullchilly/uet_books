const Deliveries = require("../models/deliveryModel");
const Books = require("../models/bookModel.js");
const RentPenalties = require("../models/rentPenaltyModel");
const logger = require("../../../log");

const deliveryCtrl = {
  createDeliveryByLib: async (req, res) => {
    try {
      const {
        from,
        // nameFrom,
        to,
        // nameTo,
        idBook,
        amount,
        description,
        status,
      } = req.body;
      console.log(
        from + " " + to + " " + idBook + " " + amount + " " + description
      );
      const book = await Books.findOne({ _id: idBook });
      console.log(book.code);
      logger.info(" Tạo delivery cho sách");
      const newDelivery = new Deliveries({
        from: from,
        // nameFrom: nameFrom,
        to: to,
        // nameTo: nameTo,
        // nameBook: book.code,
        idBook: idBook,
        amount: amount,
        description: description,
        status: status,
      });
      // Save mongodb
      await newDelivery.save();
      res.json({ msg: "Delivery book successfully", create: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // createDeliveryByLab: async (req, res) => {
  //   try {
  //     // const { from, nameFrom, to, nameTo, idRentPenalty, status } = req.body;
  //     const { from, to, idRentPenalty, status } = req.body;

  //     // console.log(
  //     //   from + " " + nameFrom + " " + to + " " + idRentPenalty + " " + status
  //     // );
  //     const rentPenalty = await RentPenalties.findOne({
  //       _id: idRentPenalty,
  //     });
  //     if (rentPenalty) {
  //       console.log(rentPenalty);
  //       await RentPenalties.findByIdAndUpdate(
  //         idRentPenalty,
  //         { 
  //           idPenalty: to, 
  //           status: "",
  //         },
  //         { new: true }
  //       );
  //     }
  //     const newDelivery = new Deliveries({
  //       from: from,
  //       to: to,
  //       idRentPenalty: idRentPenalty,
  //       status: status,
  //     });
  //     // Save mongodb
  //     await newDelivery.save();
  //     res.json({ msg: "Delivery book successfully", create: true });
  //   } catch (error) {
  //     return res.status(500).json({ msg: error.message });
  //   }
  // },

  getDeliveriesFromId: async (req, res) => {
    try {
      const id = req.params.id;
      const deliveries = await Deliveries.find({ from: id });
      if (!deliveries) {
        logger.error("Không tồn tại delivery như yêu cầu");
        return res.json("Not delivery");
      }
      return res.json(deliveries);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getDeliveriesToId: async (req, res) => {
    try {
      const id = req.params.id;
      const deliveries = await Deliveries.find({ to: id });
      if (!deliveries) {
        return res.json("Not books");
      }
      return res.json(deliveries);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const id = req.params.id;
      const delivery = await Deliveries.findOne({ _id: id });
      if (!delivery) {
      logger.error("Không tồn tại delivery");
       return res.json({ msg: "Delivery not found" });
      }
      await Deliveries.findByIdAndUpdate(id, req.body, { new: true });
      logger.info("Update thành công");
      res.json({ msg: "Delivery update", update: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = deliveryCtrl;
