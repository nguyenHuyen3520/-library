var express = require('express');
var router = express.Router();
var db = require('../db');
const shortid = require('shortid');
var controller = require('../controllers/auth.controller');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });

router.get('/login', upload.single('avatar'),controller.login);
router.get('/create', controller.create);

router.post('/login', controller.postLogin);
router.post('/create', controller.postCreate);


module.exports = router;