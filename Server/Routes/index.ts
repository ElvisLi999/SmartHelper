
import express from 'express';
const router = express.Router();
export default router;


/* GET tools page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tools' , page: 'tools' });
});

/* GET tools page. */
router.get('/tools', function (req, res, next) {
  res.render('index', { title: 'Tools', page: 'tools' });
});

/* GET AI Toolkit page. */
router.get('/ailinks', function (req, res, next) {
  res.render('index', { title: 'AI Links', page: 'ailinks' });
});

/* GET News page. */
router.get('/news', function (req, res, next) {
  res.render('index', { title: 'News', page: 'news' });
});

/* GET Blog page. */
router.get('/blog', function (req, res, next) {
  res.render('index', { title: 'Blog', page: 'blog' });
});

