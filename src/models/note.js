/*jshint esversion: 6 */

import mongoose from 'mongoose';
let ObjectID = mongoose.Types.ObjectId;

let Schema = mongoose.Schema;

let noteSchema = Schema({
						 content:{type: String, required: true, max: 500},
						 created_on: {type:Date, default: Date.now }
});

noteSchema
.virtual('url')
.get(function () {
  return 'api/note/'+this._id;
});

noteSchema.methods.getAllNotes = function(cb){
	return this.model('Note').find({},cb);
};

noteSchema.methods.getNoteDetails = function(id, cb){
	return this.model('Note').find({'_id':new ObjectID(id)},cb);
};

export default mongoose.model('Note', noteSchema);