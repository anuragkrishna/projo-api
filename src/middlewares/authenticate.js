/*jshint esversion: 6 */
import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../models/user';

export default (req, res, next) => {
	const authorizationHeader = req.headers.authorization;
	let token;

	if(authorizationHeader) {
		token = authorizationHeader.split(' ')[1];
	}

	if(token){
		jwt.verify(token, config.jwtSecret, (error, decoded) => {
			if(error){
				res.status(401).json({
					error: 'Failed to authenticate.'
				});
			}else{
				User.findOne({username: decoded.username})
				.exec().
				then((user) =>{
					if(!user){
						res.status(404).json({
							error: 'No such user'
						});
					}else{
						req.currentUser = user;
						next();
					}
				});
			}
		});
	}else{
		res.status(403).json({
			error: 'No token provided.'
			});
	}
};	