const rentalRouter = require("express").Router();
const addRentalApi = "/addRental";
const {addRental} = require("../controller/rentalController");

rentalRouter.post(addRentalApi, addRental);



module.exports = rentalRouter;