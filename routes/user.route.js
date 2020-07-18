var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });
var db = require('../db');
const shortid = require('shortid');
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

router.get('/', controller.index);
router.get('/profile/index', controller.profileIndex);
router.get('/search',controller.search);
router.get('/create',controller.create);
router.get('/:id',controller.deletes);
router.post('/create', validate.postCreate , controller.postCreate);


module.exports = router;