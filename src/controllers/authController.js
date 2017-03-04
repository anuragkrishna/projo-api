/*jshint esversion: 6 */

import async from 'async';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import {validateSignup} from '../validations/user_validations'; 
import config from '../config';

//Create a user
exports.logIn = function (req, res, next){

	const {identifier, password} = req.body;
	
	//Check if user with same username or email exists
	User.findOne({$or : [{username:identifier}, {email:identifier}]})
		.exec()

		.then((user) => {
			if(user) {
				if(bcrypt.compareSync(password, user.password_digest)){
					const token = jwt.sign({
						id: user._id,
						username: user.username
						}, config.jwtSecret);
					res.json({token});
				}else{
					res.status(401).json({errors: {form: "Invalid Credentials."}});
				}
			}else{
				res.status(401).json({errors: {form: "Invalid Credentials."}});
			}		
	});
};
	