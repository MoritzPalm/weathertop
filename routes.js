const express = require("express");
const router = express.Router();

const home = require("./controllers/home.js");
const dashboard = require("./controllers/dashboard.js");
const station = require("./controllers/station.js");
const accounts = require("./controllers/accounts.js");


router.get("/", home.index);
router.get("/dashboard", dashboard.index);
router.get('/station/:id', station.index);
router.get('/station/:id/deleterecording/:recordingId', station.deleteRecording);
router.get('/dashboard/deletestation/:station_id', dashboard.deleteStation);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);


router.post('/station/:id/addrecording', station.addRecording);
router.post('/dashboard/addstation', dashboard.addStation);

module.exports = router;
