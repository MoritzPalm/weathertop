const express = require("express");
const router = express.Router();

const home = require("./controllers/home.js");
const dashboard = require("./controllers/dashboard.js");
const station = require("./controllers/station.js");

router.get("/", home.index);
router.get("/dashboard", dashboard.index);
router.get('/station/:id', station.index);
router.get('/station/:id/deleterecording/:recordingId', station.deleteRecording);
router.get('/dashboard/deletestation/:station_id', dashboard.deleteStation);

module.exports = router;
