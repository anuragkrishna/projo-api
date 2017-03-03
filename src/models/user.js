/*jshint esversion: 6 */

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let UserSchema = Schema({
						 first_name: {type: String, required: true, max: 100},
						 last_name: {type: String, required: true, max: 100},
						 username: {type: String, required: true, max: 100},
						 email: {type: String, required: true, max: 100},
						 role: {type: String, max: 100},
						 date_of_joining: {type:Date}
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