var express = require('express');
var router = express.Router();

/* GET página de inicio. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
