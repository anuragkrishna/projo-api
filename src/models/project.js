/*jshint esversion: 6 */

import mongoose from 'mongoose';
let ObjectID = mongoose.Types.ObjectId;

let Schema = mongoose.Schema;

const enum_Status = ['Running', 'Finished', 'Blocked'];

let projectSchema = Schema({
						 title: {type: String, required: true, max: 200},
						 description: {type: String, max: 1000},
						 status: {type: String, required: true, enum: enum_Status},
 						 notes: [{type: Schema.ObjectId, ref: 'Note'}],
						 reports: [{type: Schema.ObjectId, ref: 'Report'}],
						 members: [{type: Schema.ObjectId, ref: 'User'}],
						 started_on: {type:Date, required: true },
						 updated_on: {type:Date, default: Date.now }
});

projectSchema
.virtual('url')
.get(function () {
  return 'api/project/'+this._id;
});

projectSchema.set('toJSON', { getters: true, virtuals: true });
projectSchema.set('toObject', { getters: true, virtuals: true });


projectSchema.methods.getAllProjects = function(cb){
	return this.model("Project").find({},cb);
};

projectSchema.methods.getProjectDetails = function(id, cb){
	return this.model("Project").find({"_id":new ObjectID(id)},cb);
};

export default mongoose.model('Project', projectSchema);