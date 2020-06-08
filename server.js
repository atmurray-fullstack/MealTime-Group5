////Bringing in required dependencies modules for project
const express = require('express');
const app = express();


// var passport = require("./config/passport");

const connection = require('./config/connection');
const exphbs = require('express-handlebars');
const passport = require('passport');
const LocalStategy = require("passport-local").Strategy;
const session = require("express-session");
const initializePassport = require("./config/passport-config");
initializePassport(passport);
//assigning port
var PORT = process.env.PORT ||8080;

///serving up static files and parsing incoming req.body as JSON Obj
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



///setting up express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({ secret: "destiny junkie", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


require("./routes/api-routes")(app);
require("./routes/html-routes")(app);


app.listen(PORT,console.log(`Listening on ${PORT}`));