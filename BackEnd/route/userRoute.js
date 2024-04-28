
const userRoute = require('express').Router();
const {AddFavouriteBook, DeleteFavouriteBook} = require('../controller/userController');
const addFavoriteBookApi = "/addFavouriteBook"
const deleteFavoriteBookApi = "/deleteFavouriteBook"

userRoute.post(addFavoriteBookApi, AddFavouriteBook);
userRoute.post(deleteFavoriteBookApi, DeleteFavouriteBook);

module.exports = userRoute;