
const { Router } = require("express");
const authorization = require("../middleware/authorization");
const { addQuote } = require("../controller/iqtibos.controller");


const router = Router();

router.post("/add_quote", authorization, addQuote);

module.exports = router;
