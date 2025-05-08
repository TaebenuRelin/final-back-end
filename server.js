const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/User"); // Import User model

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// =======================
// MongoDB Models
// =======================
const patternSchema = new mongoose.Schema({
  phrase: String,
  label: String,
});
const responseSchema = new mongoose.Schema({}, { strict: false });

const Pattern = mongoose.model("Pattern", patternSchema);
const Response = mongoose.model("Response", responseSchema);

// =======================
// CHATBOT ROUTES
// =======================
const router = express.Router();

// GET all patterns
router.get("/patterns", async (req, res) => {
  try {
    const patterns = await Pattern.find();
    res.json(patterns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all responses
router.get("/responses", async (req, res) => {
  try {
    const responses = await Response.find();
    res.json(responses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use("/api/chatbot", router);

// =======================
// CHAT ENDPOINT
// =======================
app.post("/api/chat", async (req, res) => {
  const { userInput } = req.body;

  try {
    const pattern = await Pattern.findOne({
      phrase: { $regex: new RegExp(`^${userInput}$`, "i") },
    });

    if (!pattern) {
      return res.json({
        botResponse: "Maaf, saya tidak mengerti pertanyaan Anda.",
      });
    }

    const responseDocs = await Response.find();
    let botResponse = null;

    for (const doc of responseDocs) {
      if (doc[pattern.label]) {
        botResponse = doc[pattern.label];
        break;
      }
    }

    if (!botResponse) {
      return res.json({
        botResponse: "Jawaban belum tersedia untuk label ini.",
      });
    }

    return res.json({ botResponse });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Terjadi kesalahan di server." });
  }
});

// =======================
// USER AUTH / INSERT / UPDATE
// =======================
app.post("/api/users", async (req, res) => {
  const { name, email, uid, photo } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { name, email, photo },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log("User inserted/updated:", updatedUser);
    res.status(200).json({ message: "User inserted or updated!" });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// =======================
// CONNECT TO DB & START SERVER
// =======================
mongoose
  .connect("mongodb://localhost:27017/toko_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("DB connection error:", err));

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
