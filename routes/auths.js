const {Router, application} = require('express')
const bcrypt = require("bcrypt")
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")


const router = Router()
const db = require('../database')

const initializePassport = require("../passport-config")
initializePassport(passport, async email => {
    try {
        db.promise().query(`USE suppliers;`)
    }
    catch(err){
        console.log(err)
    }
    var resUser = await db.promise().query(`SELECT * FROM users WHERE email = '${email}'`)
    return resUser[0][0]
}, 
async id => {
    try {
        db.promise().query(`USE suppliers;`)
    }
    catch(err){
        console.log(err)
    }
    var resUser = await db.promise().query(`SELECT * FROM users WHERE user_id = '${id}'`)
    return resUser[0][0]
}) 

router.get('/', (req, res) => {
    console.log(req.user)
    res.redirect('/')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successReturnToOrRedirect: "/",
    failureRedirect: '/auths/login',
    // failureFlash: true WORKS FOR NOW
}))

router.get("/login",checkNotAuthenticated, async (req, res) => {
    res.render("login.ejs")
})

router.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})

router.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        try {
            console.log("here")
            db.promise().query(`USE suppliers;`)
            console.log(`'${Date.now().toString()}', '${req.body.name}','${req.body.dob}','${req.body.sex}','${req.body.phone_no}', '${hashedPassword}', '${req.body.address}', '${req.body.city}', '${req.body.state}', '${req.body.email}', '${req.body.pincode}'`)
        }
        catch(err){
            console.log(err)
        }
        try {
            var queryString = `'${Date.now().toString()}', '${req.body.name}','${req.body.dob}','${req.body.sex}','${req.body.phone_no}', '${hashedPassword}', '${req.body.address}', '${req.body.city}', '${req.body.state}', '${req.body.email}', '${req.body.pincode}'`
            db.promise().query(`INSERT INTO users VALUES(${queryString});`)
            res.redirect("/auths/login")
        }
        catch(err){
            console.log(err)
            res.redirect("/auths/register")
        }
    }
    catch{

    }
    
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
        return res.redirect('/user')
    }
    next()
}


module.exports = router