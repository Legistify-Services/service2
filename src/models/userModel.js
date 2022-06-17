const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	userName: {
		type: String,
		trim: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'email required'],
	},
	userType: {
		type: String,
	},
});

module.exports = mongoose.model('User', userSchema);
