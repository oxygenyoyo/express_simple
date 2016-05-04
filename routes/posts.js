var express = require('express');
var router = express.Router();


// auth middleware
var isOwner = function(req, res, next) {
  console.log(req.cookies.name);
  if( req.cookies.name == 'admin')
    next();
  else
    res.json({ error: 503, errorMessage: 'You\'re not permission to do this.'});
}

router.delete('/:id', isOwner, function(req, res, next) {
	res.json({
		postId: req.params.id,
		message: 'Post has been deleted.'
	});
});

module.exports = router;