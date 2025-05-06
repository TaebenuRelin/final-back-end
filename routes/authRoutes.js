const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Pastikan punya model User
const router = express.Router();

const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

// Google Login Endpoint
router.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    // Verifikasi token Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "YOUR_GOOGLE_CLIENT_ID",
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Cek apakah user sudah ada di DB
    let user = await User.findOne({ email });
    if (!user) {
      // Buat user baru kalau belum ada
      user = new User({
        username: name,
        email: email,
        provider: "google",
      });
      await user.save();
    }

    // Buat JWT token
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      "YOUR_JWT_SECRET",
      {
        expiresIn: "1d",
      }
    );

    res.json({ token: jwtToken });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google authentication failed" });
  }
});

module.exports = router;
