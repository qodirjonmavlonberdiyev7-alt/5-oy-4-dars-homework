const {Router} = require("express")
const { getAllAuthors, addAuthor, getOneAuthor, updateAuthor, deleteAuthor } = require("../controller/author.controller")
const { search } = require("./auth.routes")
const authorValidationMiddleware = require("../middleware/author-validation.middleware")
const authorization = require("../middleware/authorization")

authorRouter = Router()

authorRouter.get("/get_all_authors", getAllAuthors)
authorRouter.get("/search", search)
authorRouter.post("/add_author", authorValidationMiddleware, authorization, addAuthor)
authorRouter.get("/get_one_author/:id", getOneAuthor)
authorRouter.put("/update_author/:id", updateAuthor)
authorRouter.delete("/delete_author", deleteAuthor)



module.exports = authorRouter