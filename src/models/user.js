/*jshint esversion: 6 */

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let UserSchema = Schema({
						 first_name: {type: String, required: true, max: 35},
						 last_name: {type: String, required: true, max: 35},
						 username: {type: String, required: true, max: 20},
						 email: {type: String, required: true, max: 100},
						 password_digest: {type:String, required:true},
						 role: {type: String, max: 20},
						 doj: {type:Date, default: Date.now}
});

UserSchema.virtual('name').get(function(){
		return this.first_name + " " + this.last_name;
});

UserSchema
.virtual('url')
.get(function () {
  return '/user/'+this._id;
});

export default mongoose.model('User', UserSchema);