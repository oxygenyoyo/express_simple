var express = require('express');
var router = express.Router();

// auth middleware
var isOwner = function(req, res, next) {
  if( req.cookies.name == 'admin')
    next();
  else
    res.status(503).json({ error: 503, errorMessage: 'You\'re not permission to do this.'});
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    { id: 1, username: 'admin', email : 'admin@test.com'},
    { id: 2, username: 'test2', email : 'test2@test.com'},
    { id: 3, username: 'test3', email : 'test3@test.com'},
  ]);
});


router.get('/:id', isOwner, function(req, res) {
  
  res.json(
    { username: 'admin', email : 'admin@test.com'}
  );
});


router.get('/:id/posts', isOwner, function(req, res) {
  
  res.json({ 
    username: 'admin', 
    email : 'admin@test.com',
    posts: [
      {
        id: 1,
        title: 'title 1',
        body: 'content 1',
        userId: 1
      },
      {
        id: 2,
        title: 'title 2',
        body: 'content 2',
        userId: 1
      },
      {
        id: 3,
        title: 'title 3',
        body: 'content 3',
        userId: 1
      },
    ]
  });
});

 
router.post('/', function(req, res, next) {
  res.json({
    username: 'tester4',
    email: 'test4@test.com'
  });
});

router.put('/:id', function(req, res, next) {
  res.json({
    id: parseInt(req.params.id),
    username: 'newUserName',
    email: 'newEmail@test.com'
  });
});

router.delete('/:id', function(req, res, next) {
  res.json({
    id: parseInt(req.params.id),
    message: 'User has been deleted.'
  });
});




module.exports = router;
