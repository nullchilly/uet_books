const Rents = require("../models/rentModel");
const Labs = require("../models/labModel");
const Books = require("../models/bookModel");
const Students = require("../models/studentModel");
const logger = require("../../../log");

const rentCtrl = {
  getRentFromIdLab: async (req, res) => {
    try {
      const id = req.params.id;
      const rents = await Rents.find({ idLab: id });
      const lab = await Labs.findOne({ _id: id });
      const books = await Books.find();
      const students = await Students.find();
      if (rents && lab) {
        res.json({
          rents: rents,
          nameLab: lab.name,
          books: books,
          students: students,
        });
      } else {
        logger.error("Không thuê sách");
        res.json({ msg: "Not rents" });
      }
      console.log(lab.name);
      logger.info("Tìm sách thuê bằng ID lab");
    } catch (error) {
      logger.error("Lỗi khi tìm sách thuê bằng ID lab");
      return res.status(500).json({ msg: error.message });
    }
  },
  createRent: async (req, res) => {
    try {
      const {
        idLab,
        nameLab,
        studentCode,
        idBook,
      } = req.body;
      // const newStudent = new Students({
      //   name: nameStudent,
      //   sdt: sdt,
      //   address: address,
      // })

      // await newStudent.save();
      console.log(typeof(req.body.studentID));

      const student = await Students.findOne({studentID: parseInt(req.body.studentID)})

      const book = await Books.findOne({_id: idBook})
      console.log(student);


      const newRent = new Rents({
        idLab: idLab,
        nameLab: nameLab,
        idStudent: student._id,
        idBook: idBook,
        nameBook: book.name,
        // price: price,
        status: 'Chưa trả',
      })
      newRent.save();
      logger.info("Tạo một mục cho thuê");
      res.json({create: true, msg: 'Create rent'});
    } catch (error) {
      logger.error("Lỗi khi tạo một mục cho thuê");
      return res.status(500).json({ msg: error.message });
    }
  },
  updateStatusRent: async (req, res) => {
    try {
      console.log(req.body)
      const idRent = req.params.id;
      const rent = await Rents.findOne({
        _id: idRent,
      });
      req.body.status = "Đã trả";
      if (rent) {
        console.log(rent);
        await Rents.findByIdAndUpdate(
          idRent,
          req.body,
          { new: true }
        );
        logger.info("Updated Status Rent ")
        return res.json({update: true});
      }
    } catch (error) {
      logger.error("Error: Update Status Rent");
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = rentCtrl;
