
const { Router } = require("express");
const authorization = require("../middleware/authorization");
const { addQuote } = require("../controller/iqtibos.controller");


const quoteRouter = Router();

quoteRouter.post("/add_quote", authorization, addQuote);

module.exports = quoteRouter;
