/*jshint esversion: 6 */

import User from '../models/user';
import Project from '../models/project';
import Note from '../models/note';
import async from 'async';

//Resources for user home page
exports.index = function (req, res, next){
	
	async.parallel ({
		projects: function (callback) {
			Project.find({}, callback);
		},
		notes: function (callback) {
			Note.find({}, callback);
		},
	},
	
	function(err, results){
		res.render('index', {title: 'Projo Home Page', error:err, data: results});
	});
};



//Create a user
exports.user_create = function (req, res, next){
	res.send("Welcome to user_create!");
}

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