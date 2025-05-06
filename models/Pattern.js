const mongoose = require("mongoose");

const PatternSchema = new mongoose.Schema({
  phrase: String,
  result: String,
});

module.exports = mongoose.model("Pattern", PatternSchema);
