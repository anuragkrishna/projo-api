/*jshint esversion: 6 */

import Project from '../models/project';

//Get all the projects for a user.
exports.project_list = function (req, res, next){
		var project = new Project();

		project.getAllProjects(function(err, projects){
			if(err) res.send(err);
			else res.send(projects);	
	});
};

//Get details of a particular project.
exports.project_detail = (req, res, next) => {
		var project = new Project();

		project.getProjectDetails(req.params.id, function(err, project){
			if(err) res.send(err);
			else res.send(project);	
	});
};

//Create project.
exports.project_create = (req, res, next) => {
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
exports.project_update = (req, res, next) => {

	Project.findById(req.params.id, function (err, project) { 

    // Handle any possible database errors
    if (err) {
        res.status(500).send(err);
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
    	 res.json(200, 'Project with given id not found.');
    }
});
};

//Remove a project.
exports.project_remove = (req, res, next) => {
	Project.findById(req.params.id, function (err, project) { 
		
    // Handle any possible database errors
    if (err) {
        res.status(500).send(err);
    } else if(project) {

	        // Save the updated document back to the database
	        project.remove(function (err, project) {
	            if (err) {
	                res.status(500).send(err);
	            }
	            res.send(project);
	        });
    } else {
    	 res.json(200, 'Project with given id not found.');
    }
  });
};
