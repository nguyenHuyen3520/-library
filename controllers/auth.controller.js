var db = require('../db');
const bcrypt = require("bcrypt");
const shortid = require('shortid');

module.exports.login = (req, res) => {
  res.render('auth/login');
};

module.exports.postLogin = (req , res)=>{
var user = db
  .get("users")
  .find({ email: req.body.email })
  .value();
  if (!user) {
	res.render("auth/login", { errors: ["Email does not exist!!"] });
	return;
  }
   var count = +user.wrongLoginCount;
   if (count > 3 ) {
	res.render("auth/login", { errors: ["You have entered the wrong password more times than allowed!!"] });
	return;
	}
  if (!bcrypt.compareSync(req.body.password, user.password)) {
	count++;
 
	db.get("users")
	  .find({ wrongLoginCount: user.wrongLoginCount })
	  .assign({ wrongLoginCount: count })
	  .write();
	res.render("auth/login", { errors: ["Wrong password!!"] });
	console.log( user.wrongLoginCount);
	return;
  }
  res.cookie("userId", user.id ,{
	signed: true
  });
  res.redirect("/users");
};

module.exports.create = (req , res )=>{
	res.render('auth/create');
};

module.exports.postCreate = (req , res)=>{
	req.body.id = shortid.generate();
	req.body.password =  bcrypt.hashSync(req.body.password, 12);
	db.get('users').push( req.body).write();
	res.redirect('/auth/login');
};