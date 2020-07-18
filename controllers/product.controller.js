var db = require('../db');
module.exports.index = (req , res )=>{
	var page = parseInt(req.query.page) || 1 ; // n
	var perPage = 8 ; //x

	var start = (page - 1 )* perPage;
	var end =  page * perPage;
	res.render('product/index',{
		products: db.get('product').value().slice(start , end)
	});
};