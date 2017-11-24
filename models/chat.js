const mongoose = require('mongoose');

// Chat Schema
const chatSchema = mongoose.Schema({
	text:{
		type: String,
		required: true
	},
	toUser:{
		type: String,
		required: true
	},
	fromUser:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Chat = module.exports = mongoose.model('Chat', chatSchema);

// Get Chats
module.exports.getChats = (callback, limit) => {
	Chat.find(callback).limit(limit);
}

// Add Chat
module.exports.addChat = (chat, callback) => {
	Chat.create(chat, callback);
}

// Update Chat
module.exports.updateChat = (id, chat, options, callback) => {
	var query = {_id: id};
	var update = {
		text: chat.text,
		toUser:chat.toUser,
		fromUser:chat.fromUser
	}
	Chat.findOneAndUpdate(query, update, options, callback);
}


// Delete Chat
module.exports.removeChat = (id, callback) => {
	var query = {_id: id};
	Chat.remove(query, callback);
}
