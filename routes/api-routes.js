const User = require("../models/User");
const Orders = require("../models/orders");
const path = require("path");
const bcrypt = require("bcryptjs");
const https = require("https");

module.exports = function (app) {

    app.post("/api/createUser", (req, res) => {

        const user = req.body;
        User.findOne({
            where: {
                userName: user.userName
            }
        }).then(data => {
            if (data === null) {
                
                User.create(user)
                    .then(() => {
                        res.json({value:false})
                    })
            } else {
                res.json({value:true,
                user:user})
            };
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
                return res.json({
                    userName: data.dataValues.userName,
                    address: data.dataValues.address
                });
            } else {
                return res.json(user);
            }

        })

    })


    app.post("/api/submitMealPlan", async (req, res) => {
        const restaurants = await getRestaurants(req);
        const dayPicked = req.body.pickedday;
        res.render(path.join(__dirname, '../views/member.handlebars'), { restaurants: restaurants, date: dayPicked })
    })

    app.post("/api/searchForMenu", async (req, res) => {
        const apiKey = req.body.apiKey;
        const menuItems = await getRestaurantMenuItems(apiKey);
        res.json(menuItems);

    })


};

function makeEatStreetRequest(userSearch, address, res) {
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
    return https.request(baseURL + '?' + params.join('&'), postObject, (response) => {
        let chunks = [];
        response.on('data', (data) => {
            chunks.push(data)
        }).on('end', () => {
            const buffer = Buffer.concat(chunks);
            const dataObject = JSON.parse(buffer.toString());
            const restaurants = dataObject.restaurants.map(restaurant => { return { name: restaurant.name, apiKey: restaurant.apiKey } })

            const apiKey = restaurants.map(restaurant => restaurant.apiKey)

            const menuItemsArray = []
            for (i = 0; i < apiKey.length; i++) {
                let oneItem = getMenuItem(apiKey[i]);
                return menuItemsArray.push(oneItem)
            }
            res.render(path.join(__dirname, '../views/member.handlebars'), { restaurants: restaurants }, { menuItems: menuItemsArray })
        })
    })
};

function getMenuItem(apiKey) {

    const url = 'https://eatstreet.com/publicapi/v1/restaurant/' + apiKey + '/menu'
    const requestConfig = {
        headers: {
            "X-Access-Token": 'VBVMQCLC5B2MTTF63G73E64ILU======',
            'Content-Type': 'application/json',
        },
        method: "GET",
    }
    const httpRequest = https.request(url, requestConfig, (response) => {
        let chunks = [];
        response.on('data', (data) => {
            chunks.push(data)
        }).on('end', () => {

            const buffer = Buffer.concat(chunks);
            const dataObject = JSON.parse(buffer.toString());
            const categoryItems = dataObject.map(category => { return category.items });
            const menuItems = dataObject.reduce((accumulator, element) => {
                const items = element.items.map((item) => { return { name: item.name, price: item.basePrice } })
                return accumulator.concat(items)
            }, [])

        })

    })
};


function getRestaurants(req) {
    return new Promise((resolve, reject) => {
        const address = '2029+pinnacle+point+dr+ga+30071';
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
};

function getRecipes(mealData) {

    const apiKeySpoon = "apiKey=2829f625e48b49fdb3cbc14c2bd99794"
    let queryURL = "https://api.spoonacular.com/recipes/search?" + apiKeySpoon + "&"+keyWords+"&number=5"

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