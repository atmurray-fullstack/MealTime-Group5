const User = require("../models/User");
const Orders = require("../models/orders");
const path = require("path");
const bcrypt = require("bcryptjs");

module.exports = function (app) {

    app.post("/api/createUser", (req, res) => {

        const user = req.body;
        User.create(user)
            .then(() => {
                res.redirect("/")
            })
    })

    app.post("/login", (req, res) => {

        const user = {
            userName: req.body.userName,
            passWord: req.body.passWord
        }

        User.findOne({
            where: {
                userName: user.userName,
                passWord: user.passWord
            }
        }).then(data => {
            console.log(data);
            if (data === null) {
                return res.send(false)
            } else if (data.dataValues.userName === user.userName &&
                data.dataValues.passWord === user.passWord) {
                console.log("you got the conditionals right")
                return res.json({
                    userName: data.dataValues.userName,
                    address: data.dataValues.address
                });
            } else {
                return console.log("somethings not quite right.")
            }

        })

    })






};