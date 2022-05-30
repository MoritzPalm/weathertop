const express = require("express");
const router = express.Router();
const auth = require("./utils/auth.js");


const home = require("./controllers/home.js");
const dashboard = require("./controllers/dashboard.js");
const station = require("./controllers/station.js");
const accounts = require("./controllers/accounts.js");


router.get("/", home.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get("/dashboard", auth.protected, dashboard.index);
router.get('/dashboard/deletestation/:station_id', auth.protected, dashboard.deleteStation);
router.post('/dashboard/addstation', auth.protected, dashboard.addStation);
router.get('/station/:id', auth.protected, station.index);
router.get('/station/:id/deleterecording/:recordingId', auth.protected, station.deleteRecording);
router.post('/station/:id/addrecording', auth.protected, station.addRecording);

module.exports = router;
