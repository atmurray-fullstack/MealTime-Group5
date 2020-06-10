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
        const address = '2029+pinnacle+point+dr+ga+30071';
        const userSearch = req.body.keywords;
        const mealBudget = "10"

        const httpRequest = makeEatStreetRequest(userSearch, address, res);

        httpRequest.on('error', (err) => {
            console.log(err.message);
        })
        
        httpRequest.end();
    })

    app.post("/api/searchForMenu", (req, res) => {
        const apiKey = req.body.apiKey;
        console.log(apiKey);
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
            response.on('data', (data) =>{
                chunks.push(data)
            }).on('end', () => {
                const buffer = Buffer.concat(chunks);
                const dataObject = JSON.parse(buffer.toString());
                // console.log(JSON.stringify(dataObject));
                const menuItem = dataObject.items.map(item => {return { name: item.name, basePrice: item.basePrice}});
                res.json(JSON.stringify(menuItem));
            })
        })

        httpRequest.on('error', (err) => {
            console.log(err.message);
        })
        
        httpRequest.end();
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
        response.on('data', (data) =>{
            chunks.push(data)
        }).on('end', () => {
            const buffer = Buffer.concat(chunks);
            const dataObject = JSON.parse(buffer.toString());
            console.log(dataObject);
            const restaurants = dataObject.restaurants.map(restaurant => {return { name: restaurant.name,  apiKey: restaurant.apiKey }})
            res.render(path.join(__dirname, '../views/member.handlebars'), { restaurants: restaurants})
        })
    })
}