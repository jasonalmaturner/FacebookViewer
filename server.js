var express = require('express'),
	app = express(),
	session = require('express-session'),
	passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;


app.use(session({secret: 'i made a huge mistake'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(obj, done){
	done(null, obj);
});

passport.use(new FacebookStrategy({
	clientID: '1539163349651600',
	clientSecret: '6b04459f12de726d1b45d35e5ca7d379',
	callbackURL: 'http://localhost:9005/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
	return done(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/me',
	failureRedirect: '/login'
}), function(req, res){
	console.log(req.session);
	// res.status(200).send(req.body);
});

app.get('/me', function(req, res){
	if(req.user){
		res.status(200).send(JSON.stringify(req.user));
	} else {
		res.send('Please Login');
	}
});

app.listen(9005);