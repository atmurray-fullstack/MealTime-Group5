const User = require("../models/User");
const Orders = require("../models/orders");
const path = require("path");
const https = require("https");

module.exports = function (app) {

    app.post("/api/createUser", (req, res) => {

        const user = req.body;
        user.passWord = bcrypt.hashSync(user.passWord, 10);
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


            if (data === null) {

                return res.send(false)
            } else if (data.dataValues.userName === user.userName &&
                data.dataValues.passWord === user.passWord) {
                console.log("you got the conditionals right")
                return res.json(user);
            } else {
                return console.log("something not quite right.")
            }

        })

    })


    app.post("/api/submitMealPlan", (req, res) => {
        // const url = "http://eatstreet.com/publicapi/v1/restaurant/search";
        const urlParams = [

            "method=both",
            "pickup-radius=600",
            "search=steak",
            "street-address=2029+pinnacle+point+dr+ga+30071",

        ];
        const postObject = {
            headers: { 
                "X-Access-Token": 'VBVMQCLC5B2MTTF63G73E64ILU======'
            },
            method: "GET",
        }

        const httpRequest = https.request('https://eatstreet.com/publicapi/v1/restaurant/search?method=both&pickup-radius=10&search=steak&street-address=2029+pinnacle+point+dr+ga+30071', postObject, function (response) {

            response.on('data', (data) => {
                console.log('' + data)
                res.send(data)
            })
            response.on('end', () => {
                console.log('end http request');
                res.end()
            })
        })

        httpRequest.on('error', (err) => {
            console.log(err.message);
        })
        
        httpRequest.end();
    })


};