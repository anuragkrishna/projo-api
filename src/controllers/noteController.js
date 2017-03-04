/*jshint esversion: 6 */

import Note from '../models/Note';

//Get all the Notes for a user.
exports.note_list = function (req, res, next){

		const owner_id = req.currentUser.id;

		Note.find({owner:owner_id})
		.exec()
		.then((notes) => {
			if(notes){
				res.send(notes);
			}else{
				req.status(404).json({error:"No resource found for the user."});
			}
		});
};

//Get details of a particular Note.
exports.note_detail = function (req, res, next){

		const id = req.params.id;
		const owner_id = req.currentUser.id;
		Note.findOne({'_id':id, 'owner':owner_id}, (error,note) => {
				if(note) res.send(note);
				else res.status(404).send({error:'No such Note.'});
			});	
};

//Create Note.
exports.note_create = function(req, res, next){

		req.body.owner = req.currentUser._id;
		var newNote = new Note(req.body);
		newNote.save(function(err){
			if(err){
				res.status(500).send(err);
			}else{
				res.send(newNote);
			}
		});
};

//Update a Note.
exports.note_update = function(req, res, next){

	const id = req.params.id;
	const owner_id = req.currentUser.id;

	Note.findOne({'_id':id, 'owner':owner_id}, (error,note) => {

    // Handle any possible database errors
    if (error) {
        res.status(505).send({error: error});
    } else if(note) {
	        note.title = req.body.title || note.title;
	        note.content = req.body.content || note.content;

	        // Save the updated document back to the database
	        note.save(function (err, note) {
	            if (err) {
	                res.status(500).send(err);
	            }
	            res.send(note);
	        });
    } else {
    	 res.json(404, 'Note with given id not found.');
    }
  });
};

//Remove a Note.
exports.note_remove = function(req, res, next){

	const id = req.params.id;
	const owner_id = req.currentUser.id;

	Note.findOne({'_id':id, 'owner':owner_id}, (error,note) => {

	console.log("note", note);	
	console.log("error", error);	
    // Handle any possible database errors
    if (error) {
        res.status(500).send({error:error});
    } else if(note) {

	        // Remove the document.
	        Note.remove(function (error) {
	            if (error) {
	                res.status(500).send({error:error});
	            }
	            res.send(note);
	        });
    } else {
    	 res.json(404, 'Note with given id not found.');
    }
  });
};
