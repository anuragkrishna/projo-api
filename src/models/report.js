/*jshint esversion: 6 */

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let ReportSchema = Schema({
						 title: {type: String, required: true, max: 200},
						 file: [{type: String, required: true, max: 2000}],
						 updated_on: {type:Date, default: Date.now }
});

ReportSchema
.virtual('url')
.get(function () {
  return 'api/report/'+this._id;
});

export default mongoose.model('Report', ReportSchema);