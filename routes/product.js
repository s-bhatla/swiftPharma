const {Router, application} = require('express')
const passport = require("passport")

const router = Router()
const db = require('../database')

router.get("/:id", async (req, res) => {
    try {
        db.promise().query(`USE suppliers;`)
    }
    catch(err){
        console.log(err)
    }
    queryString = `SELECT * FROM drugs WHERE barcode = '${req.params.id}'`
    var result = await db.promise().query(queryString)
    productObject = result[0]
    queryString2 = `SELECT * FROM drugs WHERE d_category='${productObject[0].d_category}' AND barcode !='${productObject[0].barcode}';`
    var likeObjects = await db.promise().query(queryString2)
    var pincode = "000000"
    var companyObject = {c_name:"polpo"}
    queryStringComp = `SELECT * FROM company WHERE c_name = '${productObject[0].c_name}'`
    var companyDetails = await db.promise().query(queryStringComp)
    if(req.isAuthenticated()){
        pincode = req.user.pincode
    }
    var wareAddress = await db.promise().query(`SELECT address FROM warehouse WHERE warehouse_id=${productObject[0].warehouse_no};`)
    var warehouseAddress = wareAddress[0]
    companyObject = companyDetails[0]
    console.log(warehouseAddress)
    warehouseAddress.push({address:"fill in the db"});
    console.log(companyObject)
    res.render("product.ejs", {product:productObject[0], likeList : likeObjects[0], pincode:pincode, company:companyObject[0], waddress: warehouseAddress[0]})
})

router.get("/:id/order", checkAuthenticated, async (req, res) => {
    try {
        db.promise().query(`USE suppliers;`)
    }
    catch(err){
        console.log(err)
    }
    queryString = `SELECT * FROM drugs WHERE barcode = '${req.params.id}'` //Implement quantity function... or not.
    var result = await db.promise().query(queryString)
    var product = result[0]
    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let fullDate = `${day}.${month}.${year}.`;
    let order_id = Date.now().toString()
    try {
        var queryString = `'${product[0].warehouse_no}', '${order_id}', '${req.user.user_id}','${product[0].barcode}','${product[0].price}','${1}','${fullDate}','${req.user.address}', 'No'`
        db.promise().query(`INSERT INTO order_hist VALUES(${queryString});`)
    }
    catch(err){
        console.log(err)
    }
    var orderDetails = await db.promise().query(`SELECT * FROM order_hist WHERE order_id = ${order_id}`)
    var orderHist = orderDetails[0];
    queryString3 = `SELECT * FROM drugs WHERE barcode = '${req.params.id}'`
    var result = await db.promise().query(queryString3)
    productObject = result[0]
    queryString2 = `SELECT * FROM drugs WHERE d_category='${productObject[0].d_category}' AND barcode !='${productObject[0].barcode}';`
    var likeObjects = await db.promise().query(queryString2)
    res.render("ordered.ejs",{likeList:likeObjects[0], order: productObject[0], orderHist: orderHist[0]})
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next()
    }
    else{
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