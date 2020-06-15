

var db = require("../models");
const path = require("path");
const https = require("https");
require('dotenv').config();

module.exports = function (app) {
    console.log("api-routes")

    app.post("/api/createUser", (req, res) => {
       
        const user = req.body;
        db.userprofiles.findOne({
            where: {
                userName: user.userName
            }
        }).then(data => {
            if (data === null) {

                db.userprofiles.create(user)
                    .then(() => {
                        res.json({ value: false })
                    })
            } else {
                res.json({
                    value: true,
                    user: user
                })
            };
        })
    })

    app.post("/login", (req, res) => {
        console.log(req.body)
        const user = {
            userName: req.body.userName,
            passWord: req.body.passWord
        }
        console.log(req.body)
        db.userprofiles.findOne({
            where: {
                userName: user.userName,
                passWord: user.passWord
            }
        }).then(data => {
            if (data === null) {
                console.log(data)
                return res.send(false)
            } else if (data.dataValues.userName === user.userName &&
                data.dataValues.passWord === user.passWord) {
                return res.json({
                    userName: data.dataValues.userName,
                    address: data.dataValues.address
                });
            } else {
                return res.json(user);
            }

        })

    });

    app.post("/postOrder", (req, res) => {
        let orders = JSON.parse(req.body.orders);
        let dateKeys = Object.keys(orders);

        for (let i = 0; i < dateKeys.length; i++) {

            let restaurantKeys = Object.keys(orders[dateKeys[i]]);
            for (let j = 0; j < restaurantKeys.length; j++) {
                let order = orders[dateKeys[i]][restaurantKeys[j]];
                let orderObject = {};
                console.log(order);

                let orderCost = 0;
                order.forEach(element => {
                    let index = element.indexOf("$");
                    let cost = parseFloat(element.slice(index + 1))
                    console.log(cost)
                    orderCost += cost
                });

                orderObject.userName = req.body.name;
                orderObject.restaurant = restaurantKeys[j];
                orderObject.orders = orders[dateKeys[i]][restaurantKeys[j]].join();
                orderObject.total = orderCost;
                orderObject.orderDate = dateKeys[i];
                console.log(orderObject)
                db.orders.findOne({
                    where: {
                        userName: orderObject.userName,
                        orders: orderObject.orders,
                        orderDate: orderObject.orderDate
                    }
                }).then(data => {
                    if (data === null) {
                        db.orders.create(orderObject)
                    } else {
                        console.log("Order already exists")
                        db.orders.destroy(
                            {
                                where: {
                                    userName: orderObject.userName,
                                    orderDate: orderObject.orderDate
                                }
                            }
                        ).then(() => {
                            db.orders.create(orderObject)
                        })
                    }
                })

            }
        }

        res.send("Orders Created");
    })


    app.post("/api/submitMealPlan", async (req, res) => {
        const restaurants = await getRestaurants(req);
        const dayPicked = req.body.pickedday.toString();
        res.render(path.join(__dirname, '../views/member.handlebars'), { restaurants: restaurants, date: dayPicked })
    })

    app.post("/api/searchForMenu", async (req, res) => {
        const apiKey = req.body.apiKey;
        const menuItems = await getRestaurantMenuItems(apiKey);
        res.json(menuItems);

    })


};



function getRestaurants(req) {
    return new Promise((resolve, reject) => {

        const address = req.body.address;
        const userSearch = req.body.keywords;
        const dayPicked = req.body.pickedday;
        const baseURL = 'https://eatstreet.com/publicapi/v1/restaurant/search'
        const params = [
            'method=both',
            'pickup-radius=50',
            `search=${userSearch}`,
            `street-address=${address}`,
        ]
        const postObject = {
            headers: {
                "X-Access-Token": process.env.KEY,
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
                const restaurants = dataObject.restaurants.map(restaurant => { return { name: restaurant.name, apiKey: restaurant.apiKey, date: dayPicked } })

                for (let i = 0; i < restaurants.length; i++) {
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
};

function getRestaurantMenuItems(apiKey) {
    return new Promise((resolve, reject) => {
        const url = 'https://eatstreet.com/publicapi/v1/restaurant/' + apiKey + '/menu'
        const requestConfig = {
            headers: {
                "X-Access-Token": process.env.KEY,
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
};

function getRecipes(mealData) {

    const apiKeySpoon = process.env.KEYR
    let queryURL = "https://api.spoonacular.com/recipes/search?" + apiKeySpoon + "&" + keyWords + "&number=5"

    return $.ajax({
        url: queryURL,
        method: "GET",
        success: (data) => {

        }
    })
        .catch(err => {
            console.log(err)
        });
}