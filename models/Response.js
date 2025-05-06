const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("Response", ResponseSchema);
