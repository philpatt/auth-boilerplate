var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();


//get login form
router.get('/login', function(req, res){
	res.render('auth/login');
});
//post login info on form 
router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile', 
	successFlash: 'Login Successful!',
	failureRedirect: '/auth/login',
	failureFlash : 'Invalid Credentials'
}));
//get sign up form
router.get('/signup', function(req, res){
	res.render('auth/signup');
});
// post signup info on form
router.post('/signup', function(req, res, next){
	console.log('req.body is', req.body);
	db.user.findOrCreate({
		where: { email: req.body.email },
		defaults: {
			username: req.body.username,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			password: req.body.password
		}
	}).spread(function(user, wasCreated){
		if(wasCreated){
			//goodjob, you didnt make a duplicate!
			passport.authenticate('local', {
				successRedirect: '/profile',
				successFlash: 'successfuly logged in'
			})(req, res, next);
		}
		else{
			//badnews you tried to sign up when you should have logged in
			req.flash('error', 'email already exists');
			res.redirect('/auth/login');
		}
	}).catch(function(err){
		req.flash('error', err.message)
		res.redirect('/auth/signup');
	});
});

// logout
router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'successfuly logged out');
	res.redirect('/');
});

//-----------------// OAUTH routes------------------
// calls the passport-facebook strategy (located in passport config)
router.get('/facebook', passport.authenticate('facebook', {
	//scope says what you want to request from facebook
	scope:['public_profile', 'email']
}));


//handle the response from Facebook {logic located in passport config}
router.get('/callback/facebook', passport.authenticate('facebook', {
	successRedirect: '/profile',
	successFlash:'You successfuly logged in via Facebook',
	failureRedirect:'/auth/login',
	failureFlash:'You tried to login with FB, but FB doesnt like you'
}));


module.exports = router;















