const LocalStrategy =  require('passport-local').Strategy
const bcrypt = require("bcrypt")

function initialize(passport, getUserbyEmail, getUserbyId){
    const authenticateUser = async (email, password, done) => {
        const user = await getUserbyEmail(email)
        if (user == null){
            return done(null, false, {message: "No user with that email"})
        }
        try {
            if(await bcrypt.compare(password, user.passw)){
                return done(null, user)
            }
            else{
                return done(null, false, {message: "Password incorrect"})
            }
        }catch(e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.user_id))
    passport.deserializeUser(async (id, done) => {
        var getUserbyidvar = await getUserbyId(id);
        return done(null, getUserbyidvar);
    })
}

module.exports = initialize