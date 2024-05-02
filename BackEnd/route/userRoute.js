
const userRoute = require('express').Router();
const {AddFavouriteBook, DeleteFavouriteBook, getUserInfoByName, getFavouriteBooks, getUserExpense} = require('../controller/userController');
const addFavoriteBookApi = "/addFavouriteBook"
const deleteFavoriteBookApi = "/deleteFavouriteBook"
const getUserInfoByNameAPi = "/getUserInfo/:username"
const getFavouriteBooksApi = "/getFavouriteBooks/:userId"
const getUserExpenseApi = "/getUserExpense/:userId"

userRoute.post(addFavoriteBookApi, AddFavouriteBook);
userRoute.post(deleteFavoriteBookApi, DeleteFavouriteBook);
userRoute.get(getUserInfoByNameAPi, getUserInfoByName);
userRoute.get(getFavouriteBooksApi, getFavouriteBooks);
userRoute.get(getUserExpenseApi, getUserExpense);
module.exports = userRoute;