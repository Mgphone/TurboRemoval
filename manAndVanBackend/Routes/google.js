const express = require("express");
const router = express.Router();
router.get("/review", async (req, res) => {
  try {
    // const { place_id } = req.query;
    const place_id = "ChIJRZsviwkRdkgRXvRtcyJ5ykE";
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=reviews&key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetcching place", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
