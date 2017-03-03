/*jshint esversion: 6 */

import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export const validateSignup = (data) => {
	let errors = {};

	if(Validator.isEmpty(data.first_name)){
		errors.first_name = "This field is isRequired.";	
	}

	if(!Validator.isAlpha(data.first_name)){
		errors.first_name = "Only Alphabets allowed.";
	}

	if(!Validator.isLength(data.first_name, { min:0, max:35})){
		errors.first_name = "Limit: 35 characters.";
	}	



	if(Validator.isEmpty(data.last_name)){
		errors.username = "This field is isRequired.";
	}

	if(!Validator.isAlpha(data.last_name)){
		errors.last_name = "Only Alphabets allowed.";
	}

	if(!Validator.isLength(data.last_name, { min:0, max:35})){
		errors.last_name = "Limit: 35 characters.";
	}	



	if(Validator.isEmpty(data.username)){
		errors.username = "This field is isRequired.";
	}

	if(!Validator.isAlpha(data.username)){
		errors.username = "Only Alphabets allowed.";
	}

	if(!Validator.isLength(data.username, { min:0, max:20})){
		errors.username = "Limit: 20 characters.";
	}	



	if(Validator.isEmpty(data.email)){
		errors.email = "This field is isRequired.";
	}

	if(!Validator.isEmail(data.email)){
		errors.email = "Invalid Email";
	}


	if(Validator.isEmpty(data.password)){
		errors.password = "This field is isRequired.";
	}

	if(Validator.isEmpty(data.passwordConfirmation)){
		errors.passwordConfirmation = "This field is isRequired.";
	}

	if(!Validator.equals(data.password, data.passwordConfirmation)){
		errors.passwordConfirmation = "Passwords must match.";
	}


	if(!Validator.isAlpha(data.role)){
		errors.role = "Only Alphabets allowed.";	
	}

	if(!Validator.isAlpha(data.role)){
		errors.role = "Only Alphabets allowed.";
	}

	if(!Validator.isLength(data.role, { min:0, max:20})){
		errors.role = "Limit: 20 characters.";
	}	

	return {
		errors,
		isValid: isEmpty(errors)
	};
};