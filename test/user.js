/*jshint esversion: 6 */

import chai from 'chai';
import chaiHTTP from 'chai-http';

import server from '../bin/www';
import User from '../src/models/user';

let should = chai.should();

chai.use(chaiHTTP);

let testUser = {
	"first_name":"test",
	"last_name":"user",
	"username":"testuser",
	"email":"testuser@email.com",
	"password":"test",
	"passwordConfirmation":"test",
	"role":""
};


describe('Empty User Collection', () => {
	it('Empty User Collection', before((done)=>{
		User.remove({},(err)=>{
			if(err){
				done(err);
			}
			done();
		});			
 	 }));
}); 


describe('Create Test User', () => {
	it('Create a test user', before((done)=>{
		chai.request(server)
			.post('/api/user')
			.set('Content-Type', 'application/json')
			.send(testUser)
			.end((error,res) => {
				if(error){
					done(error);
				}else{
					done();	
				}
			});
		}));	
  });  



describe('GET User', () => {
	it('It should GET the mentioned user detail', (done) => {
		chai.request(server)
			.get('/api/user/testuser')
			.end((err,res)=>{
				if(res){
					if(res.body.user){
						res.should.have.status(200);
						res.body.user.should.be.a('object');
						res.body.user.should.have.property('username');
					}	
						done();
				}else{
					done(err);
				}
			});
	});
});

describe('Create Valid User', () => {
	it('It should create a valid user', (done) => {
		let testUser1 = {
		"first_name":"testa",
		"last_name":"usera",
		"username":"testusera",
		"email":"testuser1@email.com",
		"password":"test1",
		"passwordConfirmation":"test1",
		"role":"Manager"
	};
		chai.request(server)
			.post('/api/user')
			.set('Content-Type', 'application/json')
			.send(testUser1)
			.end((err,res)=>{
				if(res){
					res.should.have.status(200);
					done();
				}else{
					done(err);
				}
			});
	});
});

describe('Bad request: User Signup: Empty first name', () => {
	it('It should return error text for empty first_name', (done) => {
		let testUser1 = {
		"first_name":"",
		"last_name":"userb",
		"username":"testuserc",
		"email":"testuserd@email.com",
		"password":"testd",
		"passwordConfirmation":"test1",
		"role":"Manager"
	};
		chai.request(server)
			.post('/api/user')
			.set('Content-Type', 'application/json')
			.send(testUser1)
			.end((err,res)=>{
				if(res){
					res.should.have.status(400);
					res.body.errors.should.have.property('first_name');
					done();
				}else{
					done(err);
				}
			});
	});
});

describe('Bad request: User Signup: Empty last name', () => {
	it('It should return error text for empty last name', (done) => {
		let testUser1 = {
		"first_name":"usera",
		"last_name":"",
		"username":"testuserc",
		"email":"testuserd@email.com",
		"password":"testd",
		"passwordConfirmation":"test1",
		"role":"Manager"
	};
		chai.request(server)
			.post('/api/user')
			.set('Content-Type', 'application/json')
			.send(testUser1)
			.end((err,res)=>{
				if(res){
					res.should.have.status(400);
					res.body.errors.should.have.property('last_name');
					done();
				}else{
					done(err);
				}
			});
	});
});

describe('Bad request: User Signup: Empty email', () => {
	it('It should return error text for empty email', (done) => {
		let testUser1 = {
		"first_name":"usera",
		"last_name":"userb",
		"username":"testuserc",
		"email":"",
		"password":"testd",
		"passwordConfirmation":"test1",
		"role":"Manager"
	};
		chai.request(server)
			.post('/api/user')
			.set('Content-Type', 'application/json')
			.send(testUser1)
			.end((err,res)=>{
				if(res){
					res.should.have.status(400);
					res.body.errors.should.have.property('email');
					done();
				}else{
					done(err);
				}
			});
	});
});

describe('Bad request: User Signup: Empty password', () => {
	it('It should return error text for empty password', (done) => {
		let testUser1 = {
		"first_name":"usera",
		"last_name":"userb",
		"username":"testuserc",
		"email":"test@email.com",
		"password":"",
		"passwordConfirmation":"test1",
		"role":"Manager"
	};
		chai.request(server)
			.post('/api/user')
			.set('Content-Type', 'application/json')
			.send(testUser1)
			.end((err,res)=>{
				if(res){
					res.should.have.status(400);
					res.body.errors.should.have.property('password');
					done();
				}else{
					done(err);
				}
			});
	});
});

describe('Bad request: User Signup: Empty password confirmation', () => {
	it('It should return error text for empty password confirmation', (done) => {
		let testUser1 = {
		"first_name":"usera",
		"last_name":"userb",
		"username":"testuserc",
		"email":"test@email.com",
		"password":"test",
		"passwordConfirmation":"",
		"role":"Manager"
	};
		chai.request(server)
			.post('/api/user')
			.set('Content-Type', 'application/json')
			.send(testUser1)
			.end((err,res)=>{
				if(res){
					res.should.have.status(400);
					res.body.errors.should.have.property('passwordConfirmation');
					done();
				}else{
					done(err);
				}
			});
	});
});

describe('Bad request: User Signup: Passwords do not match', () => {
	it('It should return error text for password confrimation.', (done) => {
		let testUser1 = {
		"first_name":"usera",
		"last_name":"userb",
		"username":"testuserc",
		"email":"test@email.com",
		"password":"test",
		"passwordConfirmation":"test1",
		"role":"Manager"
	};
		chai.request(server)
			.post('/api/user')
			.set('Content-Type', 'application/json')
			.send(testUser1)
			.end((err,res)=>{
				if(res){
					res.should.have.status(400);
					res.body.errors.should.have.property('passwordConfirmation');
					done();
				}else{
					done(err);
				}
			});
	});
});

describe('Bad request: User Signup: alpha-numeric first name', () => {
	it('It should return error text for alpha-numeric first_name', (done) => {
		let testUser1 = {
		"first_name":"test12",
		"last_name":"userb",
		"username":"testuserc",
		"email":"testuserd@email.com",
		"password":"testd",
		"passwordConfirmation":"test1",
		"role":"Manager"
	};
		chai.request(server)
			.post('/api/user')
			.set('Content-Type', 'application/json')
			.send(testUser1)
			.end((err,res)=>{
				if(res){
					res.should.have.status(400);
					res.body.errors.should.have.property('first_name');
					done();
				}else{
					done(err);
				}
			});
	});
});

describe('Bad request: User Signup: alpha-numeric last name', () => {
	it('It should return error text for alpha-numeric last name', (done) => {
		let testUser1 = {
		"first_name":"usera",
		"last_name":"test12",
		"username":"testuserc",
		"email":"testuserd@email.com",
		"password":"testd",
		"passwordConfirmation":"test1",
		"role":"Manager"
	};
		chai.request(server)
			.post('/api/user')
			.set('Content-Type', 'application/json')
			.send(testUser1)
			.end((err,res)=>{
				if(res){
					res.should.have.status(400);
					res.body.errors.should.have.property('last_name');
					done();
				}else{
					done(err);
				}
			});
	});
});

describe('Bad request: User Signup: Invalid email', () => {
	it('It should return error text for invalid email', (done) => {
		let testUser1 = {
		"first_name":"usera",
		"last_name":"userb",
		"username":"testuserc",
		"email":"test@email",
		"password":"testd",
		"passwordConfirmation":"test1",
		"role":"Manager"
	};
		chai.request(server)
			.post('/api/user')
			.set('Content-Type', 'application/json')
			.send(testUser1)
			.end((err,res)=>{
				if(res){
					res.should.have.status(400);
					res.body.errors.should.have.property('email');
					done();
				}else{
					done(err);
				}
			});
	});
});

