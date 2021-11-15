const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false

}))

app.use(passport.initialize())
app.use(passport.session())

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(methodOverride('_method'))

app.use('/images',express.static('public/images'));
app.use('/js',express.static('public/js'));
app.use('/css',express.static('public/css'));

const authsRoute = require('./routes/auths')
const searchRoute = require('./routes/search')
const productRoute = require('./routes/product')
app.use('/auths', authsRoute);
app.use('/search', searchRoute);
app.use('/product', productRoute);


const db = require('./database')


const { request } = require("express")

app.get("/", async (req, res) => {
    username = ""
    likeList = ["flag"]
    if(req.user != null){
        username = req.user.username
    }
    if(req.isAuthenticated()){
        try {
            db.promise().query(`USE suppliers;`)
        }
        catch(err){
            console.log(err)
        }
        //see mysql wb for 2 queries
        var queryLikeType = `SELECT d.d_type, COUNT(d.d_type)FROM suppliers.order_hist AS h, suppliers.drugs as d
        WHERE d.barcode = h.barcode AND user_id = ${req.user.user_id}
        GROUP BY d.d_type
        ORDER BY COUNT(d.d_type) DESC LIMIT 1;`
        var likeType = await db.promise().query(queryLikeType)
        var queryLikeCategory = `SELECT d.d_category, COUNT(d.d_category)FROM suppliers.order_hist AS h, suppliers.drugs as d
        WHERE d.barcode = h.barcode AND user_id = ${req.user.user_id}
        GROUP BY d.d_category
        ORDER BY COUNT(d.d_category) DESC LIMIT 1;`
        var likeCategory = await db.promise().query(queryLikeCategory)
        if(likeCategory[0].length === 0){
            likeList = ["flag"]
        }else{
            var likeQuery = `SELECT * FROM drugs
            WHERE d_type = "${likeType[0][0].d_type}" OR d_category = "${likeCategory[0][0].d_category}"`
            var likeList = await db.promise().query(likeQuery)
        }
    }
    res.render('index.ejs', {name: username, likeList:likeList[0]})
})

app.delete("/logout", (req, res) => {
    req.logOut()
    res.redirect("/")
})

app.get("/user", checkAuthenticated, async (req, res) => {
    console.log(req.user)
    try {
        db.promise().query(`USE suppliers;`)
    }
    catch(err){
        console.log(err)
    }
    queryString = `SELECT * FROM order_hist WHERE user_id = ${req.user.user_id}`
    var prevOrders = await db.promise().query(queryString)
    res.render("user.ejs", {user:req.user, orderList:prevOrders[0]})
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

app.listen(3000, () => {
    console.log("Running on port 3000")
})