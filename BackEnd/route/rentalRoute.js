const rentalRouter = require("express").Router();
const {addRental, addBudget, queryRentalBookByUser} = require("../controller/rentalController");


const addRentalApi = "/addRental";
const addBudgetApi = "/addBudget";
const queryRentalBookByUserApi = "/rentaledBookByUser/:userId";

rentalRouter.post(addRentalApi, addRental);
rentalRouter.post(addBudgetApi, addBudget);
rentalRouter.get(queryRentalBookByUserApi, queryRentalBookByUser);



module.exports = rentalRouter;