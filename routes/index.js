let express = require('express');
let router = express.Router();

/* GET tools page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tools' , page: 'tools' });
});


/* GET tools page. */
router.get('/tools', function (req, res, next) {
  res.render('index', { title: 'Tools', page: 'tools' });
});

/* GET AI Toolkit page. */
router.get('/aitoolkit', function (req, res, next) {
  res.render('AItoolkit', { title: 'AI Toolkit', page: 'aitoolkit' });
});

module.exports = router;
