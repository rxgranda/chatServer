const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	nombre:{
		type: String,
		required: true
	},
	departamento:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const User = module.exports = mongoose.model('User', userSchema);

// Get Users
module.exports.getUsers = (callback, limit) => {
	User.find(callback).limit(limit);
}

// Get User
module.exports.getUserById = (id, callback) => {
	User.findById(id, callback);
}

// Add User
module.exports.addUser = (user, callback) => {
	User.create(user, callback);
}

// Update User
module.exports.updateUser = (id, user, options, callback) => {
	var query = {_id: id};
	var update = {
		username: user.username,
		nombre: user.nombre,
		departamento: user.departamento,
	}
	User.findOneAndUpdate(query, update, options, callback);
}

// Delete User
module.exports.removeUser = (id, callback) => {
	var query = {_id: id};
	User.remove(query, callback);
}
