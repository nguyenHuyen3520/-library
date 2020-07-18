var express = require('express');
var router = express.Router();
var db = require('../db');
const shortid = require('shortid');
var controller = require('../controllers/product.controller');


router.get('/index', controller.index);

module.exports = router;