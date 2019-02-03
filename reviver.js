var express = require('express');
var childProcess = require('cross-spawn');
	
var app = express();

//Need %LOCALAPPNAME%

function reviveUniZoom(req, res) {

	var LocalAppData = process.env.LOCALAPPDATA;

	//kill in sync
	//taskkill /IM "UniZoom.exe" /F
	const result = childProcess.sync('taskkill', ['/IM', 'UniZoom.exe', '/F'], { stdio: 'inherit' });

	//respawn in async
	const child = childProcess(LocalAppData + '\\UniZoom\\uniZoom.exe', [], { stdio: 'inherit' });

	res.status(200).send("reviving");
}

//Cross origin allowed
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

//Configure only two routes to display the last ping
app.get('/reviveUniZoom', reviveUniZoom);

//Begin service
var server = app.listen(4004, function(){
	var port = server.address().port;
	console.log("UniZoom Reviver on port " + port);
})