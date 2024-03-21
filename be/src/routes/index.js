const userRouter = require('./userRouter');
const bookRouter = require('./bookRouter');
const libRouter = require('./libRouter');
const labRouter = require('./labRouter');
const deliveryRouter = require('./deliveryRouter');
const rentPenaltyRouter = require('./rentPenaltyRouter');


function route(app) {
    app.use('/user', userRouter);
    app.use('/book', bookRouter);
    app.use('/lib', libRouter);
    app.use('/lab', labRouter);
    app.use('/delivery', deliveryRouter);
    app.use('/rentPenalty', rentPenaltyRouter);
}

module.exports = route;