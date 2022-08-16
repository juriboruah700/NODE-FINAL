// Peer Server
var ExpressPeerServer = require("peer").ExpressPeerServer;
var peerExpress = require("express");
var peerApp = peerExpress();
var peerServer = require("http").createServer(peerApp);
var options = { debug: true };
var peerPort = 443;
peerApp.use("/peerjs", ExpressPeerServer(peerServer, options));
peerServer.listen(peerPort);
