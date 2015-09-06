//These socket.io events fire whenever the page is loaded or reloaded or are sent an event from a client?
var app = require('express')();
var http = require('http').Server(app);
//initialises a new instance of socket.io by passing the http object
var io = require('socket.io')(http);

// set the port of our application
// process.env.PORT lets the port be set by Heroku -> not needed?
//var port = process.env.PORT || 8080;

//add static route in server that fetches files from ./node_modules/bootstrap/dist/
var express = require("express");
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
	//res.send('<h1>My first message with socket.io!</h1>');
});

//send an event to EVERYONE
//io.emit('some event', { for: 'everyone' });

//listen on the connection event for incoming sockets, and log to console
io.on('connection', function(socket){

	
	//display connection information
	console.log('a user connected');
	//disconnect event
	socket.on('disconnect', function(){
	    console.log('user disconnected');
	  });

	//display chat message on console and to webpage
    socket.on('chat message', function(msg){
      	console.log('message: ' + msg);
		//send event to everyone except a certain socket i.e. yourself. 'broadcast'
		io.emit('chat message', msg);
    });

	//send event to everyone except a certain socket
	//socket.broadcast.emit('hi');

});

//this might be causing error with heroku deployment? use only for local testing

http.listen(process.env.PORT || 3000, function(){
	console.log('listening on port');
});
