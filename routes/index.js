var express = require('express');
var router = express.Router();

/* GET página de inicio. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', function(req, res) {
    res.render('index', { title: 'Quiz' });
});
router.get('/quizes/answer', function(req, res) {
  res.render('index', { title: 'Quiz' });
});


module.exports = router;
