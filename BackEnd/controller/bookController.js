const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema (
  {
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      trim: true
    },
    publishYear: {
      type: Number,
    },
    category: {
      type: String,
      require: true,
      trim: true,
    },
    author: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Books = mongoose.model("Books", bookSchema);

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
      });
      // Save mongodb
      await newBook.save();
      res.json({ msg: "Created book successfully", create: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.body;
      const book = await Books.findOne({ _id: id });
      if (!book) {
        return res.status(400).json({ msg: "Book not found" });
      }
      await Books.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ msg: "Book updated", update: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.body;
      const book = await Books.findOne({ _id: id });
      if (!book) {
        return res.json({ msg: "Book not found" });
      }
      await Books.findByIdAndDelete(id);
      res.json({ msg: "Book deleted", delete: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  upload: async (title, filePath) => {
    try {
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        console.error('File not found');
        return;
      }

      // Read file from system path
      const fileBuffer = fs.readFileSync(filePath);

      // Upload PDF file to GridFS
      const uploadStream = bucket.openUploadStream(title);
      uploadStream.end(fileBuffer);

      // Save book details to MongoDB
      uploadStream.on('finish', async () => {
        const book = new Book({ title: title, pdfFile: title });
        await book.save();
        console.log('Book uploaded successfully');
      });

      console.log('Book uploading...');
    } catch (err) {
      console.error(err);
    }
  },
  getBookPDF: async (title) => {
    try {
      // Find the book by title
      const book = await Book.findOne({ title: title }).exec();
      if (!book) {
        console.error('Book not found');
        return;
      }

      // Retrieve PDF file from GridFS
      const downloadStream = bucket.openDownloadStreamByName(book.pdfFile);

      // Create a write stream to save the PDF file
      const writeStream = fs.createWriteStream(`${title}.pdf`);
      downloadStream.pipe(writeStream);

      // Handle download completion
      writeStream.on('finish', () => {
        console.log('Book PDF retrieved successfully');
      });

      console.log('Book PDF retrieving');
    } catch (err) {
      console.error(err);
    }
  },

  getAllBooks: async (req, res) => {
    try {
      const books = await Books.find();
      if (books) {
        res.json(books);
      } else {
        res.json({ msg: "No books found" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getBookById: async (req, res) => {
    try {
      const { id } = req.body;
      const book = await Books.findOne({ _id: id });
      if (book) {
        res.json(book);
      } else {
        res.json({ msg: "No book with such id"});
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllBooksBySearch: async (req, res) => {
    try {
      const keyword = req.query.value;
      const books = await Books.find({
        $or: [
          { code: { $regex: keyword, $options: 'i' } },
          { name: { $regex: keyword, $options: 'i' } },
        ]
      });
      if (books) {
        res.json(books);
      } else {
        res.json({ msg: "No such book" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = bookCtrl;