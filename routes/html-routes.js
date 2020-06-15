
const sequelize = require('sequelize');
const User = require('../models/User')
const path = require('path')
module.exports = function (app) {
   console.log('html-routes');

   app.get('/', function (req, res) {
      res.render(path.join(__dirname, '../views/index.handlebars'))
   });


   app.get('/:string', function (req, res) {

      if (req.params.string === "register") {
         res.render(path.join(__dirname, '../views/signup.handlebars'))
      } else if (req.params.string === "member") {
         res.render(path.join(__dirname, '../views/member.handlebars'))
      } else if (req.params.string === "mealplan") {
         
         res.render(path.join(__dirname, '../views/mealplans.handlebars'))
      } else {
         res.render(path.join(__dirname, '../views/index.handlebars'))

      }
   })
               
}

