/*jshint esversion: 6 */

import Project from '../models/project';
import validateProject from '../validations/project_validations'; 
import isEmpty from 'lodash/isEmpty';

//Get all the projects for a user.
exports.project_list = function (req, res, next){
		
		const owner_id = req.currentUser.id;

		Project.find({owner:owner_id}, (error,projects) =>{
			if(projects){
				res.send(projects);
			}else if(error){
				res.status(500).send({error:error});
			}else{
				req.status(404).json({error:"No resource found for the user."});
			}
		});
};

//Get details of a particular project.
exports.project_detail = function (req, res, next){

		const id = req.params.id;
		const owner_id = req.currentUser.id;
		Project.findOne({'_id':id, 'owner':owner_id}, (error,project) => {
				if(project) res.send(project);
				else res.status(404).send({error:'No such project.'});
			});	
};

//Create project.
exports.project_create = function(req, res, next){

		let {errors, isValid} = validateProject(req.body);

		req.body.owner = req.currentUser._id;
		const owner_id = req.currentUser.id;

		Project.findOne({'title':req.body.title, 'owner':owner_id}, (error, project) =>{
			if(project){
				errors.title = "There is a project with such title.";
			}

			let isValid = isEmpty(errors);	

			if(!isValid) {
				res.status(400).json({errors});

			}else{
				let project = new Project(req.body);
				project.save(function(err){
					if(err){
						res.status(500).send(err);
					}else{
						res.send(project);
					}
			  });
			}
		});	
};			

//Update a project.
exports.project_update = function(req, res, next){

	let {errors, isValid} = validateProject(req.body);

	const id = req.params.id;
	const owner_id = req.currentUser.id;
	
	Project.findOne({'_id':id, 'owner':owner_id}, (error,project) => {

		// Handle any possible database errors
		if (error) {
		    res.status(505).send({error: error});
		}else if(project) {
		        	project.title = req.body.title || project.title;
				    project.donor = req.body.donor || project.donor;
				    project.status = req.body.status || project.status;
				    project.started_on = req.body.started_on || project.started_on;

				    // Save the updated document back to the database
				    project.save(function (err, project) {
				     		if (err) {
					            res.status(500).send(err);
					        }
					        res.send(project);
					        });
		}else {
			res.json(404, 'Project with given id not found.');
			}
		});	
};

//Remove a project.
exports.project_remove = function(req, res, next){

	const id = req.params.id;
	const owner_id = req.currentUser.id;

	Project.findOne({'_id':id, 'owner':owner_id}, (error,project) => {

    // Handle any possible database errors
    if (error) {
        res.status(500).send({error:error});
    } else if(project) {

	        // Remove the document.
	        project.remove(function (error) {
	            if (error) {
	                res.status(500).send({error:error});
	            }
	            res.send(project);
	        });
    } else {
    	 res.json(404, 'Project with given id not found.');
    }
  });
};
