const { Router } = require("express");

const router = Router();

const { getAllCategoriesHandler, getCategoryByIdHandler, getCategoryByNameHandler, addCategoriesHandler}= require('../Handler/categories.handler')


router
.get('/', getAllCategoriesHandler)
.post('/', addCategoriesHandler)
.get( '/:id', getCategoryByIdHandler)
.get( '/find/:name', getCategoryByNameHandler)
module.exports = router;