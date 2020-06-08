const User = require("../models/User");
const Orders = require("../models/orders");
const bcrypt = require("bcryptjs");

module.exports = function (app) {
console.log("api-routes")

app.post("/api/createUser", (req, res) => {
    console.log(req.body);
    const user = req.body;
    user.passWord = bcrypt.hashSync(user.passWord,10);
    User.create(user)
    .then(()=>{
        res.redirect("/register")
    })
   
   
})






};