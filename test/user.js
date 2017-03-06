/*jshint esversion: 6 */

import chai from 'chai';
import chaiHTTP from 'chai-http';

import server from '../bin/www';

let should = chai.should();

chai.use(chaiHTTP);

describe('GET User', () => {
	it('It should GET the mentioned user detail', (done) => {
		chai.request(server)
			.get('/api/user/anurag.bits18@gmail.com')
			.end((err,res)=>{
				res.should.have.status(200);
				res.body.user.should.be.a('object');
				res.body.user.should.have.property('username');
				done();
			});
	});
});