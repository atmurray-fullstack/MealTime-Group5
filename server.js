////Bringing in required dependencies modules for project
const express = require('express');
const app = express();


// var passport = require("./config/passport");

const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require("express-session");

// initializePassport(passport);
//assigning port
var PORT = process.env.PORT || 8080;
var db = require("./models");
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

db.sequelize.sync().then(function() {

    app.listen(PORT, function() {
      console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
  })
  .catch(err=>{
      console.log(err)
  })