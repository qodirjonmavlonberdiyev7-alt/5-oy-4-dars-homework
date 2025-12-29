const QuoteSchema = require("../schema/iqtibos.schema");

const addQuote = async (req, res, next) => {
    try {
        const { text, book_id } = req.body;

        await QuoteSchema.create({
            text,
            book_id,
            added_by: req.user.id 
        });

        res.status(201).json({
            message: "Iqtibos added"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { addQuote };
