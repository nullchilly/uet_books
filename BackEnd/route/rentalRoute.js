const rentalRouter = require("express").Router();
const {addRental, addBudget, queryRentalBookByUser,returnBook} = require("../controller/rentalController");


const addRentalApi = "/addRental";
const addBudgetApi = "/addBudget";
const queryRentalBookByUserApi = "/rentingBook/:userId";
const returnBookApi = "/returnBook"

rentalRouter.post(addRentalApi, addRental);
rentalRouter.post(addBudgetApi, addBudget);
rentalRouter.post(returnBookApi, returnBook);
rentalRouter.get(queryRentalBookByUserApi, queryRentalBookByUser);



module.exports = rentalRouter;