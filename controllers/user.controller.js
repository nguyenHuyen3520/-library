var db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
	res.render('index',{users: db.get('users').value()});
};
module.exports.profileIndex = (req , res)=>{
	res.render('users/profile/index',{user: db.get('users').find({email: req.body.email}).value()});
};

module.exports.search = ( req , res)=>{
	let q = req.query.q;
	let matchedUsers = db.get('users').value().filter((user)=>{
		return (user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
	});
	res.render('users',{
	users: matchedUsers
	});
};

module.exports.create = (req , res)=>{
	res.render('users/create');
};
module.exports.postCreate = (req , res)=>{
	req.body.id = shortid.generate();
	req.body.avatar = 'uploads/'+req.file.filename;
	db.get('users').push( req.body).write();
	res.redirect('/users/index');
};

module.exports.deletes = (req , res)=>{
	let id = req.params.id;
	let user = db.get('users').find({id: id}).value();
	let newData = db.get('users').splice(db.get('users').value().indexOf(user),1).value();
	db.get('users')
	.remove({ newData })
	.write();
	res.redirect('/users');
};

