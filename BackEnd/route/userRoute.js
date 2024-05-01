
const userRoute = require('express').Router();
const {AddFavouriteBook, DeleteFavouriteBook, getUserInfoByName} = require('../controller/userController');
const addFavoriteBookApi = "/addFavouriteBook"
const deleteFavoriteBookApi = "/deleteFavouriteBook"
const getUserInfoByNameAPi = "/getUserInfo/:username"

userRoute.post(addFavoriteBookApi, AddFavouriteBook);
userRoute.post(deleteFavoriteBookApi, DeleteFavouriteBook);
userRoute.get(getUserInfoByNameAPi, getUserInfoByName);
module.exports = userRoute;