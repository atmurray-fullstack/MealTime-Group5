
const sequelize = require('sequelize');
const User =  require('../models/User')
const path = require('path')
module.exports = function(app){
    console.log('html-routes');

 app.get('/',function(req, res){
    console.log(path.join(__dirname, '../views/index.handlebars'))

    res.render(path.join(__dirname, '../views/index.handlebars'))
    //  User.findAll()
    //  .then(data=>{
    //      res.json(data);
    //  })
 })
 app.get('/test', function(req, res){
    console.log(path.join(__dirname, '../views/index.handlebars'))
   let context= {
      restaurant:[
         {
            mIcon: "restaurant",
            name: "Sushi",
            fact: "Lorem ipsum dolor sit amet"
         }
      ]
   }
    res.render("login", context)
    //  User.findAll()
    //  .then(data=>{
    //      res.json(data);
    //  })
 })
};