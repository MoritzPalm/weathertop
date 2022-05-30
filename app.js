const express = require("express");
const logger = require("./utils/logger");
const handlebars = require("express-handlebars");
const session = require("express-session");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: "This is a secret!",
    cookie: {
        maxAge: 3600000
    },
    resave: false,
    saveUninitialized: false
}));

app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

const routes = require("./routes");
app.use("/", routes);


app.listen(process.env.PORT, () => {
    console.log(`Web App listening on ${process.env.PORT}`);
});

module.exports = app;
