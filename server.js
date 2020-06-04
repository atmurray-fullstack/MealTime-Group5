////Bringing in required dependencies modules for project
const express = require('express');
const app = express();

const connection = require('./config/connection');
const exphbs = require('express-handlebars');

//assigning port
var PORT = process.env.PORT ||8080;

///serving up static files and parsing incoming req.body as JSON Obj
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

///setting up express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);


app.listen(PORT,console.log(`Listening on ${PORT}`));