/*jshint esversion: 6 */

import mongoose from 'mongoose';
let ObjectID = mongoose.Types.ObjectId;

let Schema = mongoose.Schema;

let enum_Status = ['Running', 'Finished', 'Blocked'];

let projectSchema = Schema({
						 title: {type: String, required: true, max: 50},
						 donor: {type: String, max: 50},
						 status: {type: String, required: true, enum: enum_Status},
						 owner: {type: Schema.ObjectId, required: true, ref:'User'},
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

export default mongoose.model('Project', projectSchema);