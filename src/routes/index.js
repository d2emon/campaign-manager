import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  throw new Error('Test Error');
  // res.render('index', { title: 'Express' });
});

export default router;
