const {Router, application} = require('express')
const passport = require("passport")

const router = Router()
const db = require('../database')

router.get("/byquery/:query", async (req, res) => {
    try {
        db.promise().query(`USE suppliers;`)
    }
    catch(err){
        console.log(err)
    }
    queryString = `SELECT * FROM drugs WHERE d_name LIKE '%${req.params.query}%' OR d_category LIKE '%${req.params.query}'`
    var result = await db.promise().query(queryString)
    res.render("search.ejs", {list:result[0], query:req.params.query})
})

router.post("/byquery", (req, res) => {
    res.redirect("/search/byquery/" + req.body.query)
})

router.get("/bytype/:type", async (req, res) => {
    try {
        db.promise().query(`USE suppliers;`)
    }
    catch(err){
        console.log(err)
    }
    queryString = `SELECT * FROM drugs WHERE d_type LIKE '%${req.params.type}%'`
    var result = await db.promise().query(queryString)
    res.render("search.ejs", {list:result[0]})
})


function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next()
    }
    else{
        req.session.returnTo = req.originalUrl;
        res.redirect('/auths/login')
    }
}
function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

module.exports = router