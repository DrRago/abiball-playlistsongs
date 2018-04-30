/* Dependencies */
const log = require('./util/log.js');
const constants = require('./constants.js');
const mysql = require('mysql');

const express = require('express');
const session = require('express-session');
const ejs = require('ejs');

const routes = require('./routes/routing.js');

const body_parser = require('body-parser');
const path = require('path');


const MYSQL_HOST = process.env.MYSQL_HOST || "127.0.0.1";
const MYSQL_USERNAME = process.env.MYSQL_USERNAME || "";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "";

/* Variables */
const app = express();
const PORT = process.env.PORT || 8888;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';


/*constants.CONNECTIONS.MYSQL = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
});

constants.CONNECTIONS.MYSQL.connect((error) => {
    if (error) {
        log.crit(error)
    }
    else {
        log.info(`Connected to MySQL at ${MYSQL_HOST}.`);
    }
});*/

/* Middleware */
// Set the view engine to 'ejs'
app.set('view engine', 'ejs');
// Set the views directory where ejs gets the templates from
app.set('views', path.join(__dirname + "/../", 'views'));

// Middleware BodyParser
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));


// Set the static directory for the client resources like css, client js, ...
app.use(express.static(path.join(__dirname, '..', 'public')));
// Configure the sessions
app.use(session({resave: false, saveUninitialized: true, secret: "ajs123lmsad9123möl9undj"}));

// Add listening
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}.`);
});

// Adding all routes
routes(app);

