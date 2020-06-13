const User = require("../models/User");
const Orders = require("../models/orders");
const path = require("path");
const bcrypt = require("bcryptjs");
const https = require("https");

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
                return res.json(user);
            }

        })

    })


    app.post("/api/submitMealPlan", async (req, res) => {
        const restaurants = await getRestaurants(req);
        res.render(path.join(__dirname, '../views/member.handlebars'), { restaurants: restaurants})
    })

    app.post("/api/searchForMenu", async (req, res) => {
        const apiKey = req.body.apiKey;
        const menuItems = await getRestaurantMenuItems(apiKey);
        res.json(menuItems);

    })
    

};


function getRestaurants(req) {
    return new Promise((resolve, reject) => {
        const address = '2029+pinnacle+point+dr+ga+30071';
        const userSearch = req.body.keywords;
        const baseURL = 'https://eatstreet.com/publicapi/v1/restaurant/search'
        const params = [
            'method=both',
            'pickup-radius=50',
            `search=${userSearch}`,
            `street-address=${address}`,
        ]
        const postObject = {
            headers: {
                "X-Access-Token": 'VBVMQCLC5B2MTTF63G73E64ILU======',
                'Content-Type': 'application/json',
            },
            method: "GET",
        }
        const request = https.request(baseURL + '?' + params.join('&'), postObject, (response) => {
            let chunks = [];
            response.on('data', (data) => {
                chunks.push(data)
            }).on('end', async () => {
                const buffer = Buffer.concat(chunks);
                const dataObject = JSON.parse(buffer.toString());
                const restaurants = dataObject.restaurants.map(restaurant => { return { name: restaurant.name, apiKey: restaurant.apiKey } })
                for (let i=0; i < restaurants.length; i++) {
                    restaurants[i].menuItems = await getRestaurantMenuItems(restaurants[i].apiKey)
                }
                resolve(restaurants);
            })
        })
        request.on('error', (err) => {
            reject(err.message);
        })
        request.end();
    })
}

function getRestaurantMenuItems(apiKey) {
        return new Promise((resolve, reject) => {
        const url = 'https://eatstreet.com/publicapi/v1/restaurant/' + apiKey + '/menu'
        const requestConfig = {
            headers: {
                "X-Access-Token": 'VBVMQCLC5B2MTTF63G73E64ILU======',
                'Content-Type': 'application/json',
            },
            method: "GET",
        }
        const request = https.request(url, requestConfig, (response) => {
            let chunks = [];
            response.on('data', (data) => {
                chunks.push(data)
            }).on('end', () => {
                const buffer = Buffer.concat(chunks);
                const dataObject = JSON.parse(buffer.toString());
                const menuItems = dataObject.reduce((accumulator, element) => {
                    const items = element.items.map((item) => { return { name: item.name, price: item.basePrice } })
                    return accumulator.concat(items)
                }, [])
                resolve(menuItems);
            })

        })
        request.on('error', (err) => {
            reject(err.message);
        })
        request.end();
    })
}