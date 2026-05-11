/*
 * Proiect 10 - Cine este in spatiu?
 * Tehnologii Web - 2025/2026
 * Echipa:
 *   - Alina   : Backend (server.js) - configurare Express, rute API, functii testabile
 *   - Nicoleta: Frontend (index.html) - interfata web, logica JS, stilizare CSS
 */
 
const express = require("express");
const cors = require("cors");
const axios = require("axios");
 
const app = express();
 
/* Alina: Activare CORS pentru a permite cererile din frontend (Vercel) */
app.use(cors());
 
/* Alina: Middleware pentru parsarea cererilor JSON */
app.use(express.json());
 
/* =========================
   ALINA: FUNCTII TESTABILE
   Functiile de mai jos sunt exportate si testate cu Jest (test/app.test.js)
========================= */
 
/*
 * Alina: formatAstronaut(data)
 * Primeste obiectul JSON de la Open Notify API si returneaza
 * numarul total de astronauti aflati in spatiu.
 * Folosita in teste Jest pentru a valida raspunsul API.
 */
function formatAstronaut(data) {
  return data.people.length;
}
 
/* =========================
   ALINA: RUTE API
   Backend-ul expune doua rute GET care preiau date live
   din API-ul extern Open Notify (fara cache local).
========================= */
 
/*
 * Alina: GET /api/astros
 * Preia lista de astronauti aflati in spatiu de la Open Notify API.
 * Cache-Control: no-store asigura ca datele sunt intotdeauna live,
 * conform cerintei din enunt (nu se face cache local).
 */
app.get("/api/astros", async (req, res) => {
  try {
    const response = await axios.get("http://api.open-notify.org/astros.json");
    res.set("Cache-Control", "no-store");
    res.json(response.data);
  } catch (err) {
    /* Alina: In caz de eroare la API extern, returnam status 500 */
    res.status(500).json({ error: "Failed to fetch astronauts" });
  }
});
 
/*
 * Alina: GET /api/iss
 * Preia pozitia curenta a Statiei Spatiale Internationale (ISS)
 * (latitudine si longitudine) de la Open Notify API.
 * Cache-Control: no-store asigura pozitia in timp real.
 */
app.get("/api/iss", async (req, res) => {
  try {
    const response = await axios.get("http://api.open-notify.org/iss-now.json");
    res.set("Cache-Control", "no-store");
    res.json(response.data);
  } catch (err) {
    /* Alina: In caz de eroare la API extern, returnam status 500 */
    res.status(500).json({ error: "Failed to fetch ISS" });
  }
});
 
/* =========================
   ALINA: EXPORTURI
   app si formatAstronaut sunt exportate pentru a putea fi
   importate si testate in test/app.test.js cu Jest.
========================= */
module.exports = {
  app,
  formatAstronaut
};
 
/* =========================
   ALINA: PORNIRE SERVER
   Serverul porneste doar cand fisierul este rulat direct (node server.js),
   nu si cand este importat in teste (require.main === module).
========================= */
const PORT = process.env.PORT || 5000;
 
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
