const mongoose = require("mongoose");
const sqlConnection = require("../util/sql.connection");
const redis = require("../util/redis.connection");
const logger = require('../util/log');

const bookSchema = new mongoose.Schema({
  ID: { type: Number },
  Title: { type: String },
  VolumeInfo: { type: String },
  // Series: { type: String },
  // Periodical: { type: String },
  Author: { type: String },
  Year: { type: String },
  Edition: { type: String },
  Publisher: { type: String },
  // City: { type: String },
  // Pages: { type: String },
  PagesInFile: { type: Number },
  Language: { type: String },
  Topic: { type: String },
  Library: { type: String },
  Issue: { type: String },
  // Identifier: { type: String },
  // ISSN: { type: String },
  // ASIN: { type: String },
  // UDC: { type: String },
  // LBC: { type: String },
  // DDC: { type: String },
  // LCC: { type: String },
  // Doi: { type: String },
  // Googlebookid: { type: String },
  // OpenLibraryID: { type: String },
  // Commentary: { type: String },
  // DPI: { type: Number },
  // Color: { type: String },
  // Cleaned: { type: String },
  // Orientation: { type: String },
  // Paginated: { type: String },
  // Scanned: { type: String },
  // Bookmarked: { type: String },
  // Searchable: { type: String },
  Filesize: { type: Number },
  // Extension: { type: String },
  MD5: { type: String },
  // Generic: { type: String },
  // Visible: { type: String },
  // Locator: { type: String },
  // Local: { type: Number },
  TimeAdded: { type: Date },
  TimeLastModified: { type: Date },
  Coverurl: { type: String },
  // Tags: { type: String },
  // IdentifierWODash: { type: String }
});

const Books = mongoose.model("books", bookSchema, "updated");
// const Books = mongoose.model("updated", bookSchema);

// const topicSchema = new mongoose.Schema({
//   topic_descr: { type: String },
//   lang: { type: String },
//   kolxoz_code: { type: String },
//   topic_id: { type: Number },
//   topic_id_hl: { type: Number }
// });

// const Topics = mongoose.model("books", topicSchema, "topics");
// const Topics = mongoose.model("topics", topicSchema);

const bookCtrl = {
  autocomplete: async (req, res) => {
    try {
      const keyword = req.query.searchValue;
      const books = await Books.find({
        $or: [
          { code: { $regex: keyword, $options: "i" } },
          { name: { $regex: keyword, $options: "i" } },
        ],
      }).limit(5);
      if (books) {
        res.json(books);
      } else {
        const books = await Books.aggregate([
          {
            $search: {
              autocomplete: {
                query: keyword,
                path: ["name", "code"],
                fuzzy: {
                  maxEdits: 2,
                  prefixLength: 2,
                },
              },
            },
          },
        ]).limit(5);
        if (books) {
          res.json(books);
        } else {
          res.json({ msg: "No books found" });
        }
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
create: async (req, res) => {
  try {
    const { Title, Coverurl, Author, Topic, Language, Year } = req.body

    // Invalidate redis cache cho keyword
    const keys = await redisKeysAsync('KEYWORD*');
    if (keys.length > 0) {
      keys.forEach(key => {
        redis.del(key, (err, response) => {
          if (err) {
            console.error(`Error deleting key ${key}:`, err);
          } else {
            console.log(`Deleted key ${key}:`, response);
          }
        });
      });
    }

    const n = await Books.estimatedDocumentCount();
    const code = Number(n) + 1;
    await new Promise((resolve, reject) => {
      sqlConnection.query(
        "INSERT IGNORE INTO book (mongoId) VALUES (?)",
        [code],
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });
    const book = await Books.findOne({ code: code });
    if (book) {
      console.log(book)
      logger.info("Code book already registered")
      return res.json({ msg: "Code book already registered", create: false });
    }
    const newBook = new Books({Title, Coverurl, Author, Topic, Language, Year});

    // Save mongodb
    await newBook.save();
    logger.info("Created book successfully")
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
    await new Promise((resolve, reject) => {
      sqlConnection.query(
        "DELETE FROM book WHERE mongoId = ?",
        [id],
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });
    if (!book) {
      return res.json({ msg: "Book not found" });
    }
    await Books.findByIdAndDelete(id);
    logger.info("Book deleted")
    res.json({ msg: "Book deleted", delete: true });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
},

  upload: async (title, filePath) => {
    try {
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        console.error("File not found");
        return;
      }

      // Read file from system path
      const fileBuffer = fs.readFileSync(filePath);

      // Upload PDF file to GridFS
      const uploadStream = bucket.openUploadStream(title);
      uploadStream.end(fileBuffer);

      // Save book details to MongoDB
      uploadStream.on("finish", async () => {
        const book = new Book({ title: title, pdfFile: title });
        await book.save();
        console.log("Book uploaded successfully");
      });

      console.log("Book uploading...");
    } catch (err) {
      console.error(err);
    }
  },
  getBookPDF: async (title) => {
    try {
      // Find the book by title
      const book = await Book.findOne({ title: title }).exec();
      if (!book) {
        console.error("Book not found");
        return;
      }

      // Retrieve PDF file from GridFS
      const downloadStream = bucket.openDownloadStreamByName(book.pdfFile);

      // Create a write stream to save the PDF file
      const writeStream = fs.createWriteStream(`${title}.pdf`);
      downloadStream.pipe(writeStream);

      // Handle download completion
      writeStream.on("finish", () => {
        console.log("Book PDF retrieved successfully");
      });

      console.log("Book PDF retrieving");
    } catch (err) {
      console.error(err);
    }
  },

  getAllBooks: async (req, res) => {
    let { pageSize, pageNumber, limit } = req.query;
    // console.log(pageSize, pageNumber, limit)
    try {
      let books = null
      if (pageSize && pageNumber) {
        books = await Books.find().limit(pageSize).skip(pageNumber * pageSize)
      } else {
        limit = limit || 30
        books = await Books.find().limit(limit)
      }
      logger.info("Get all books")
      // console.log(books);
      if (books) {
        res.json(books);
      } else {
        res.json({ msg: "No books found" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getBooksCount: async (req, res) => {
    try {
      const count = await Books.estimatedDocumentCount();
      if (count) {
        res.json(count);
      } else {
        res.json({ msg: "No book with such id" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // getBookById: async (req, res) => {
  //   try {
  //     const { id } = req.body;
  //     const book = await Books.findOne({ ID: id });
  //     if (book) {
  //       res.json(book);
  //     } else {
  //       res.json({ msg: "No book with such id" });
  //     }
  //   } catch (error) {
  //     return res.status(500).json({ msg: error.message });
  //   }
  // },
  getMD5ById: async (req, res) => {
    try {
      const { id } = req.query;
      console.log(id)
      const book = await Books.findOne({ ID: id });
      if (book) {
        res.json(book['MD5']);
      } else {
        res.json({ msg: "No book with such id" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getTopicName: async (req, res) => {
    try {
      const { id } = req.body;
      console.log(Topics.find().limit(10));
      const topic = await Topics.findOne({ topic_id: id });
      if (topic) {
        res.json(topic);
      } else {
        res.json({ msg: "No topic with such id" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllBooksBySearch: async (req, res) => {
    try {
      let { id, keyword, topic, limit } = req.query;
      if (id) logger.info(`Searched for id ${id}`)
      if (keyword) logger.info(`Searched for keyword ${keyword}`)
      limit = limit ?? 50;
      if (id) {
        const cachedValue = await redis.get('ID' + id.toString());
        if (cachedValue) {
          res.json(JSON.parse(cachedValue));
          return;
        }
        const book = await Books.findOne({ ID: id });
        if (book) {
          await redis.set('ID' + id.toString(), JSON.stringify(book));
          res.json(book);
        } else {
          res.json({ msg: "No book with such id" });
        }
        return;
      }
      if (topic > 0 && keyword) {
        const booksByTopicAndKeyword = await Books.find({
          Topic: topic,
          Title: { $regex: keyword, $options: "i" }
        });
        if (booksByTopicAndKeyword.length > 0) {
          res.json(booksByTopicAndKeyword);
        } else {
          res.json({ msg: "No books found for the specified topic and keyword" });
        }
        return;
      }
      if (topic > 0) {
        const booksByTopic = await Books.find({ Topic: topic });
        if (booksByTopic.length > 0) {
          res.json(booksByTopic);
        } else {
          res.json({ msg: "No books found for the specified topic" });
        }
        return;
      }
      if (keyword) {
        const booksByKeyword = await Books.find({
          Title: { $regex: keyword, $options: "i" }
        }).limit(limit);
        const cachedValue = await redis.get('KEYWORD' + keyword);
        if (cachedValue) {
          res.json(JSON.parse(cachedValue));
          return;
        }
        await redis.set('KEYWORD' + keyword, JSON.stringify(booksByKeyword));
        if (booksByKeyword.length > 0) {
          res.json(booksByKeyword);
        } else {
          res.json({ msg: "No books found for the specified keyword" });
        }
        return;
      }
      res.json({ msg: "Please provide a valid search parameter" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  syncWithMysql: async (req, res) => {
    try {
      const totalCount = await Books.countDocuments()
      let processedCount = 0;
      let offset = 0;
      const batchSize = 1000;
      
      while (offset < totalCount) {
        const books = await Books.find().limit(batchSize).skip(offset);
        
        await new Promise((resolve, reject) => {
          const queries = books.map(book => {
            return new Promise((resolve, reject) => {
              sqlConnection.query(
                "INSERT IGNORE INTO book (mongoId) VALUES (?)",
                [book['ID']],
                (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                }
              );
            });
          });
  
          Promise.all(queries)
            .then(() => {
              processedCount += books.length;
              const progress = Math.min(processedCount, totalCount);
              console.log("Progress:", progress, "out of", totalCount);
              resolve();
            })
            .catch(error => reject(error));
        });
  
        offset += batchSize;
      }
  
      // If all queries succeed, send a success response
      res.status(200).send("Sync with MySQL successful");
    } catch (error) {
      // If any error occurs during the process, send an error response
      console.error("Error during sync with MySQL:", error);
      res.status(500).send("Error during sync with MySQL");
    }
  }
};

module.exports = bookCtrl;
