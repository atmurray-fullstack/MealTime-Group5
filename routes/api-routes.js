const User = require("../models/User");
const Orders = require("../models/orders");
// const bcrypt = require("bcrypt");

module.exports = function (app) {
console.log("api-routes")

app.post("/api/createUser", (req, res) => {
    console.log(req.body);
    const user = req.body;
    
    User.create(user)
    .then(()=>{
        res.redirect("/member")
    })
   
   
})






};