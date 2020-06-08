
const sequelize = require('sequelize');
const User =  require('../models/User')
const path = require('path')
module.exports = function(app){
    console.log('html-routes');

 app.get('/',function(req, res){

    console.log(path.join(__dirname, '../views/index.handlebars'))

    res.render(path.join(__dirname, '../views/index.handlebars'))

 })

 app.get('/test', function(req, res){

   let context= {
      restaurant:[
         {
            mIcon: "restaurant",
            name: "Sushi",
            fact: "Lorem ipsum dolor sit amet"
         },
         {
            mIcon: "restaurant",
            name: "Americana",
            fact: "YUM!"
         }
      ]
   }
    res.render("login", context)

 })

 app.get('/register',function(req, res){
   console.log(path.join(__dirname, '../views/signup.handlebars'))


   res.render(path.join(__dirname, '../views/signup.handlebars'))
});

app.get('/member',function(req, res){
   console.log(path.join(__dirname, '../views/member.handlebars'))

   res.render(path.join(__dirname, '../views/member.handlebars'))

})
};

