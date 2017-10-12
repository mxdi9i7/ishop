var express = require('express');
var router = express.Router();
var db = require('../db');
var passport = require('passport')
require('../passport');



/* GET home page. */
router.get('/', function(req, res, next) {
    var flashMessage = "";
    if (req.session.flash) {
        if (req.session.flash.message) {
            flashMessage = req.session.flash.message[0]
        }
    }
    res.render('auth', { 
        title: 'Express', 
        message: flashMessage
    });
});
router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth"
}))
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth')
    })
})
router.post('/signup', passport.authenticate("local-register", {
    successRedirect: "/",
    failureRedirect: "/auth"
}))
module.exports = router;
