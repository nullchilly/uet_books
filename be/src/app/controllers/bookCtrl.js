const Books = require("../models/bookModel.js");
const logger = require("../../../log");
const { error } = require("winston");

const bookCtrl = {
  autocomplete: async (req, res) => {
    try {
      const keyword = req.query.searchValue;
      const books = await Books.find({
        $or: [
          { code: { $regex: keyword, $options: 'i' } },
          { name: { $regex: keyword, $options: 'i' } },
        ]
      }).limit(5);
      if (books) {
        res.json(books);
      } else {
        const books = await Books.aggregate([
          {
            $search: {
              "autocomplete": {
                "query": keyword,
                "path": ["name", "code"],
                "fuzzy": {
                  "maxEdits": 2,
                  "prefixLength": 2
                }
              }
            }
          },
        ]).limit(5);
        if (books) {
          res.json(books);
        } else {
          res.json({ msg: "Not found books" });
        }
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const { code, name, description, image, price, author, category, language, publishYear } = req.body;

      const book = await Books.findOne({ code: code });
      if (book) {
        logger.error("Mã sách đã tồn tại");
        return res.json({ msg: "Code book registered", create: false });
      }
      const newBook = new Books({
        code,
        name,
        description,
        image,
        price,
        author, 
        category, 
        language, 
        publishYear, 
        lab: [],
        lib: ["63832d6b3006d5bf09fc6fe8","63832ea46d987083f9ccb576"],

      });
      logger.info("Tạo mới một quyển sách");
      // Save mongodb
      await newBook.save();
      res.json({ msg: "Create book successfully", create: true });
    } catch (error) {
      logger.error("Lỗi khi tạo mới sách");
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.body;
      const book = await Books.findOne({ _id: id });
      if (!book) {
        logger.error("Không tìm thấy sách muốn update");
        return res.status(400).json({ msg: "Book not found" });
      }
      logger.info("Update thành công sách");
      await Books.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ msg: "Book updated", update: true });
    } catch (error) {
      logger.error("Lỗi khi update sách");
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.body;
      const book = await Books.findOne({ _id: id });
      if (!book) {
        logger.error("Không tìm thấy sách định xoá");
        return res.json({ msg: "Book not found" });
      }
      await Books.findByIdAndDelete(id);
      logger.info("Xoá thành công sách");
      res.json({ msg: "Book deleted", delete: true });
    } catch (error) {
      logger.error("Lỗi khi xoá sách");
      return res.status(500).json({ msg: error.message });
    }
  },

  getAllBooks: async (req, res) => {
    try {
      const books = await Books.find();
      if (books) {
        res.json(books);
      } else {
        res.json({ msg: "Not books" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllBooksBySearch: async (req, res) => {
    try {
      const keyword = req.query.searchValue;
      const books = await Books.find({
        $or: [
          { code: { $regex: keyword, $options: 'i' } },
          { name: { $regex: keyword, $options: 'i' } },
        ]
      });
      if (books) {
        res.json(books);
      } else {
        res.json({ msg: "Not found products" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

};

module.exports = bookCtrl;
