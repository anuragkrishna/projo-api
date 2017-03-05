/*jshint esversion: 6 */

import mongoose from 'mongoose';
let ObjectID = mongoose.Types.ObjectId;

let Schema = mongoose.Schema;

let noteSchema = Schema({
						 title: {type:String, required:true, max:50},	
						 content:{type: String, required: true, max: 500},
						 owner: {type: Schema.ObjectId, required: true, ref:'User'},
						 created_on: {type:Date, default: Date.now }
});

noteSchema
.virtual('url')
.get(function () {
  return 'api/note/'+this._id;
});

noteSchema.set('toJSON', { getters: true, virtuals: true });
noteSchema.set('toObject', { getters: true, virtuals: true });

export default mongoose.model('Note', noteSchema);