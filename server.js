const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   FUNCTIONS (TESTABLE)
========================= */
function formatAstronaut(data) {
  return data.people.length;
}

/* =========================
   ROUTES
========================= */
app.get("/api/astros", async (req, res) => {
  try {
    const response = await axios.get("http://api.open-notify.org/astros.json");
    res.set("Cache-Control", "no-store");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch astronauts" });
  }
});

app.get("/api/iss", async (req, res) => {
  try {
    const response = await axios.get("http://api.open-notify.org/iss-now.json");
    res.set("Cache-Control", "no-store");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ISS" });
  }
});

/* =========================
   EXPORTS (IMPORTANT)
========================= */
module.exports = {
  app,
  formatAstronaut
};

/* =========================
   START SERVER (ONLY MANUAL RUN)
========================= */
const PORT = 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}