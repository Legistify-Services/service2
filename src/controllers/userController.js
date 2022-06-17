const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModal = require('../models/userModel');

exports.signIn = async (req, res) => {
	const {email} = req.body;
	try {
		const existingUser = await UserModal.findOne({email});
		if (!existingUser)
			return res.status(404).json({status: false, message: "User doesn't exist"});

		const token = jwt.sign(
			{
				id: existingUser._id,
				email: existingUser.email,
				userType: existingUser.userType,
			},
			process.env.JWT_PRIVATE_KEY,
			{
				expiresIn: '24h',
			}
		);

		res.status(200).json({
			staus: true,
			message: 'Service 2 Sign In Success',
			token: token,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({status: false, message: 'Something went wrong'});
	}
};

exports.signUp = async (req, res) => {
	const {email, password, userName, userType} = req.body;

	if (!email || !password || !userName || !userType) {
		return res.status(400).json({
			status: false,
			message: 'userName, email, password, userType required',
		});
	}

	try {
		const existingUser = await UserModal.findOne({email});
		if (existingUser)
			return res.status(400).json({status: false, message: 'User already exists'});

		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = await UserModal.create({
			userName: userName,
			email: email,
			password: hashedPassword,
			userType: userType,
		});

		const payload = {
			id: newUser._id,
			email: newUser.email,
			userType: newUser.userType,
		};

		const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
			expiresIn: '1h',
		});

		res.status(201).json({
			status: true,
			message: 'Service 2 Sign Up success',
			token: token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: false,
			message: 'Something went wrong',
		});
	}
};

exports.findRole = async (req, res) => {
	res.status(200).json({status: true, data: req.user});
};
