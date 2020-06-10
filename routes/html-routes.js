
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
      } else {
         res.render(path.join(__dirname, '../views/index.handlebars'))

      }
   })

<<<<<<< HEAD
   res.render(path.join(__dirname, '../views/signup.handlebars'))
});

app.get('/member',function(req, res){

   res.render(path.join(__dirname, '../views/member.handlebars'))

});

app.get('/mealplans',function(req, res){

   res.render(path.join(__dirname, '../views/mealplans.handlebars'))

})
};
=======
}
>>>>>>> ac9c41c490e6d4eb9decfe8912f8e4d2d5bd33df

