var express = require("express");
const sequelize = require('sequelize');
var router = express.Router();
var orders = require("../models/orders.js");
var user = require("../models/user.js");


router.get('/api/all',(req,res) => {
    orders.findAll({}).then((data) => {
        console.log("checking on thie" + JSON.stringify(data))
        console.log("checking on thie" + JSON.stringify(data[1].userName))
        // console.log(object);
        res.render("index",{order:JSON.parse(JSON.stringify(data))})
    }) 
});






router.post('/api/orders', (req, res)=> {
    res.status(200).json({
        message: 'Handling post method to /orders'
    });
})

module.exports = router;


