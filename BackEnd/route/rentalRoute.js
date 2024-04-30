const rentalRouter = require("express").Router();
const {addRental, addBudget} = require("../controller/rentalController");


const addRentalApi = "/addRental";
const addBudgetApi = "/addBudget";

rentalRouter.post(addRentalApi, addRental);
rentalRouter.post(addBudgetApi, addBudget);



module.exports = rentalRouter;