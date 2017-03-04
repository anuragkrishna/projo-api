/*jshint esversion: 6 */

import Project from '../models/project';

//Get all the projects for a user.
exports.project_list = function (req, res, next){

		var project = new Project();
		const owner_id = req.currentUser.id;

		project.find({owner:owner_id})
		.exec()
		.then((projects) => {
			if(projects){
				res.send(projects);
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

		req.body.owner = req.currentUser._id;
		var project = new Project(req.body);
		project.save(function(err){
			if(err){
				res.status(500).send(err);
			}else{
				res.send(project);
			}
		});
};

//Update a project.
exports.project_update = function(req, res, next){

	const id = req.params.id;
	const owner_id = req.currentUser.id;

	Project.findOne({'_id':id, 'owner':owner_id}, (error,project) => {

    // Handle any possible database errors
    if (error) {
        res.status(505).send({error: error});
    } else if(project) {
	        project.title = req.body.title || project.title;
	        project.description = req.body.description || project.description;
	        project.status = req.body.status || project.status;
	        project.started_on = req.body.started_on || project.started_on;

	        // Save the updated document back to the database
	        project.save(function (err, project) {
	            if (err) {
	                res.status(500).send(err);
	            }
	            res.send(project);
	        });
    } else {
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
	        project.remove(function (error, project) {
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
