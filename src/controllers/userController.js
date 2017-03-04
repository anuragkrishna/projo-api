/*jshint esversion: 6 */
import async from 'async';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';

import User from '../models/user';
import {validateSignup} from '../validations/user_validations'; 


//Resources for user home page
exports.index = function (req, res, next){
	res.send("Welcome to Projo!");
};


//Create a user
exports.user_create = function (req, res, next){

	//Validate user data.
	let {errors} = validateSignup(req.body);

	//Check if user with same username or email exists
	User.findOne({$or : [{username:req.body.username}, {email:req.body.email}]})
		.exec()

		 //If found, set appropriate errors. 
		.then((user) => {
			if(user) {
				if(user.username===req.body.username){
					errors.username="There is a user with such username.";
				}
				if(user.email===req.body.email){
					errors.email="There is a user with such email.";
				}
			}

			let isValid = isEmpty(errors);	

			//Send error response if not valid
			if(!isValid) {
				res.status(400).json({errors});

			//Create and save user to db if validated.	
			}else{
				const {first_name, last_name, email, password, passwodConfirmation, role, username, doj} = req.body;

				//Encrypt password.
				const password_digest = bcrypt.hashSync(password, 10);

				let newUser = new User({first_name:first_name, username: username, last_name:last_name, email:email, password_digest:password_digest, role:role, doj:doj});
				newUser.save(err => {
							console.log(err);
							if(err){
								res.status(500).json({errors});
							}else{
								res.status(200).json({success:true});
							}
					});
			    }
		});
};
	

//Get details of a specific user
exports.user_details = function (req, res, next){
	res.send("Welcome to user_details!");
}

//Update user details
exports.user_update = function (req, res, next){
	res.send("Welcome to user_update!");
}

//Remove a user account
exports.user_remove = function (req, res, next){
	res.send("Welcome to user_remove!");
}

//Get a list of users
exports.user_list = function (req, res, next){
	res.send("Welcome to user_list!");
}