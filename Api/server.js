const express = require('express');
const csv = require('csvtojson');
const { spawn } = require('child_process');
const app = express();
const bodyParser = require("body-parser");
let username = "";
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/../public"));
const port = process.env.port || 3000;
//* GET Routes
app.get('/', (req, res) => {
	res.render('index.ejs');
});

app.get('/about', (req, res) => {
	res.render('about-us.ejs');
});
app.get('/instagram/result',(req,res)=>{
	console.log('username is',username);
		const python = spawn('python', [
		'D:\\Web Development\\OSINT-Tool\\Python_Scripts\\instagram\\main.py'
	]);
		python.on('close', (code) => {
		console.log(`child process close all stdio with code ${code}`);
		// send data to browser
	});
	python.stdout.on('data', function (data) {
		console.log('Pipe data from python script ...');
		dataToSend = data.toString();
		res.send(dataToSend);
	});
});
// app.get('/api', (req, res) => {
// 	var dataToSend;
// 	// spawn new child process to call the python script

// 	// collect data from script

// 	// in close event we are sure that stream from child process is closed
// 	python.on('close', (code) => {
// 		console.log(`child process close all stdio with code ${code}`);
// 		// send data to browser
// 	});
// });

// app.get('/result', (req, res) => {
// 	const csv = require('csvtojson');
// 	// Invoking csv returns a promise

// 	const converter = csv()
// 		.fromFile(__dirname + '/../demo_result/result.csv')
// 		.then((json) => {
// 			console.log(json);
// 			res.send(json);
// 		});
// });
//*POST
app.post('/instagram/:username',(req,res)=>{
  username = req.params.username;//saving username in the current session storage
	res.redirect('/instagram/result');//redircting to send basic result
})

const server = app.listen(port, () =>
	console.log(`Example app listening on port 
${port}!`)
);

server.timeout = 48000;