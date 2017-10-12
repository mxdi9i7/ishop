const mongojs = require('mongojs')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const db = mongojs('mongodb://admin:admin@ds117615.mlab.com:17615/ishop', ['users'])
const userCollection = db.collection('users')
passport.use(new LocalStrategy({passReqToCallback: true},authenticate))
passport.use("local-register", new LocalStrategy({passReqToCallback: true},register))

function authenticate(req, email, password, done) {
    
    userCollection.findOne({email, password}, (err, user) => {
        if (!user) {
            return done(null, false, req.flash('message', 'User does not exist'))
        } 
        if (user) {
            if (user.password !== password) {
                return done(null, false, req.flash('message', 'Password incorrect!'))
            }
        }
        done(null, user)
    })
}

function register(req, email, password, done) {
    userCollection.findOne({email}, (err, user) => {
        if (user) {
            return done(null, false,  req.flash('message', 'username existed'))
        }
        if (password !== req.body.password2) {
            return done(null, false, req.flash('message', 'passwords don\'t match'))
        }
        const newUser = {
            email,
            password,
            username: "huahai"
        }
        userCollection.save(newUser, (err, newUser) => {
            done(null, newUser)
        })
    })
}

passport.serializeUser((user, done)=> {
    done(null, user._id)
})
passport.deserializeUser((id, done)=> {
    userCollection.findOne({_id: id}, (err, user)=> {
        done(null, user)
    })
})