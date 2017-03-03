/*jshint esversion: 6 */

import Note from '../models/note';

//Get note list.
exports.note_list = function (req, res, next){
		var note = new Note();

		note.getAllNotes(function(err, notes){
			if(err) res.send(err);
			else res.send(notes);	
	});
}

//Get note details.
exports.note_detail = function (req, res, next){
		var note = new Note();

		note.getNoteDetails(req.params.id, function(err, note){
			if(err) res.send(err);
			else res.send(note);	
	});
}

//Create a note
exports.note_create = function (req, res, next){
	
}

//Update a note
exports.note_update = function (req, res, next){
	
}

//Remove a note
exports.note_remove = function (req, res, next){
	
}

