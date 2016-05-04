var superagent = require('superagent');
var expect = require('chai').expect;
var port = 3000;
var domain = 'http://localhost:' + port + '/';


describe('Homepage', function(){
	it('should respond homepage',function(done){
		superagent
		.get(domain)
		.end(function(err, res){
			expect(res.status).to.equal(200);
			done();
		})
	})
}); // Homepage


describe('Register', function(){
	it('should respond "This is a register page." ',function(done){
		superagent
		.get(domain + 'register')
		.end(function(err, res){
			expect(res.text).to.equal('This is a register page.');
			done();
		})
	})
}); // Register


describe('Login', function(){
	it('should respond login',function(done){
		superagent
		.get(domain + 'login')
		.end(function(err, res){
			expect(res.status).to.equal(200);
			done();
		})
	})

	it('should respond to Post login',function(done){
		superagent
		.post(domain + 'login')
		.send({ username: 'admin', password : '1234', rememberme: 'on'})
		.end(function(err, res){
			expect(res.status).to.equal(503);
			done();
		})
	})

	it('should respond logout',function(done){
		superagent
		.get(domain + 'logout')
		.end(function(err, res){
			expect(res.status).to.equal(200);
			done();
		})
	})

}); // Login


describe('User', function(){

	it('should return user\'s data lists', function(done) {
		superagent
		.get(domain + 'users')
		.end(function(err, res) {
			expect(res.body).to.deep.equal([
			    { id: 1, username: 'admin', email : 'admin@test.com'},
			    { id: 2, username: 'test2', email : 'test2@test.com'},
			    { id: 3, username: 'test3', email : 'test3@test.com'},
			 ]);
			done();
		});
	});

	it('should return new user when post data', function(done) {
		superagent
		.post(domain + 'users/')
		.send({ username : 'test a new user', password : '1234 '})
		.end(function(err, res) {
			expect(res.body).to.deep.equal({
		    username: 'tester4',
		    email: 'test4@test.com'
			});
			done();
		});
	});

	it('should return new user data when put data match user id', function(done) {
		superagent
		.put(domain + 'users/4')
		.send({ id: 4, username : 'test a new user', password : '1234 '})
		.end(function(err, res) {
			expect(res.body).to.deep.equal({
				id : 4,
		    username: 'newUserName',
		    email: 'newEmail@test.com'
		  });
			done();
		});
	});

	it('should return user data when delete data match user id', function(done) {
		superagent
		.delete(domain + 'users/4')
		.send({ id: 4, username : 'test a new user', password : '1234 '})
		.end(function(err, res) {
			expect(res.body).to.deep.equal({
		    id: 4,
		    message: 'User has been deleted.'
		  });
			done();
		});
	});

	

	it('should respond 503 when call not my profile',function(done){
		superagent
		.get(domain + 'users/1')
		.end(function(err, res){
			expect(res.status).to.equal(503);
			done();
		})
	})
}); // User