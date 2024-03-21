const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require('cors');
const route = require('./routes');
const logger = require('../log');
const router = express.Router()

app.use(cors());
app.use(express.json());

const PORT = 5001;

try {
    mongoose.connect(process.env.MONGODB_URL, {useUnifiedTopology: true,
        useNewUrlParser: true, });
    logger.info("Connected to MongoDB");
} catch (err) {
    logger.error('Cant connect to MongoDB');
}

route(app);


app.listen(PORT, () => {
    logger.info(`App listening at http://localhost:${PORT}`);
})