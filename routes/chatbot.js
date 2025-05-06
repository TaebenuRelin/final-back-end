const express = require("express");
const router = express.Router();
const Pattern = require("../models/Pattern");
const Response = require("../models/Response");

router.get("/patterns", async (req, res) => {
  try {
    const patterns = await Pattern.find();
    res.json(patterns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/responses", async (req, res) => {
  try {
    const responses = await Response.find();
    res.json(responses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
