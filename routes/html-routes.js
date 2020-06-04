
const sequelize = require('sequelize');
const User =  require('../models/User')

module.exports = function(app){
    console.log('html-routes');
 app.get('/',function(req, res){
     User.findAll()
     .then(data=>{
         res.json(data);
     })
 })
};