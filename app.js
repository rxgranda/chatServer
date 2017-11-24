const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Chat =require('./models/chat');
User =require('./models/user');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/chatservice');
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/users or /api/chats');
});

app.get('/api/chats', (req, res) => {
	Chat.getChats((err, chats) => {
		if(err){
			throw err;
		}
		res.json(chats);
	});
});

app.post('/api/chats', (req, res) => {
	var chat = req.body;
	Chat.addChat(chat, (err, chat) => {
		if(err){
			throw err;
		}
		res.json(chat);
	});
});

app.put('/api/chats/:_id', (req, res) => {
	var id = req.params._id;
	var chat = req.body;
	Chat.updateChat(id, chat, {}, (err, chat) => {
		if(err){
			throw err;
		}
		res.json(chat);
	});
});

app.delete('/api/chats/:_id', (req, res) => {
	var id = req.params._id;
	Chat.removeChat(id, (err, chat) => {
		if(err){
			throw err;
		}
		res.json(chat);
	});
});

app.get('/api/users', (req, res) => {
	User.getUsers((err, users) => {
		if(err){
			throw err;
		}
		res.json(users);
	});
});

app.get('/api/users/:_id', (req, res) => {
	User.getUserById(req.params._id, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.post('/api/users', (req, res) => {
	var user = req.body;

	console.log(req);
	User.addUser(user, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.put('/api/users/:_id', (req, res) => {
	var id = req.params._id;
	var user = req.body;
	User.updateUser(id, user, {}, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.delete('/api/users/:_id', (req, res) => {
	var id = req.params._id;
	User.removeUser(id, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.listen(3000);
console.log('Running on port 3000...');
