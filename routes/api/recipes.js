/* ||  TODO recipe api routes */
const express = require('express')
const router = express.Router()
const passport = require('passport')
const recipeController = require('../../controllers/recipeController')

router.use(passport.authenticate("jwt", {session: false}))

// basic route, /api/recipes
router.route('/')
        .get(recipeController.getAllRecipes)
        .post(recipeController.createRecipe)

// This route makes it so that you can access req.params.id: path /api/recipes/id
router.route('/:id')
        .get(recipeController.getSingleRecipe)
        .delete(recipeController.deleteRecipe)
        .patch(recipeController.updateRecipe)

module.exports = router