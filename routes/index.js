var express = require('express');
var router = express.Router();


var isCookieNotExpireThenRedirectToProfile = function(req, res, next) {
	if( req.cookies.name ) 
		res.redirect('/users/1');
	else
		next();
}


/* GET home page. */
router.get('/', isCookieNotExpireThenRedirectToProfile, function(req, res, next) {

  res.render('index', { title: 'Express' });
});


router.get('/register', function(req, res) {
  res.send('This is a register page.');
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'StoryLog Login' });
});

router.post('/login', function(req, res) {
  isNotMemberThenRedirectToRigsterPage(req, res);
  hasInDatabaseThenWriteCookieAndRedirectToProfilePage(req, res);
});

router.get('/logout', function(req, res) {
	res.clearCookie('name');
	res.clearCookie('rememberme');
	res.redirect('/');
});


var isNotMemberThenRedirectToRigsterPage = function(req, res)
{
	if( req.body.username != 'admin' )
	{
		res.redirect('/register');
	} 
}

var hasInDatabaseThenWriteCookieAndRedirectToProfilePage = function(req, res)
{
	if( req.body.username == 'admin' )
	{
		res.cookie('name', 'admin',  { expires: new Date(Date.now() + 900000), httpOnly: true });
		res.redirect('/users/1');
	} 
}

module.exports = router;

