var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
// stream it verbaten back to the client
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var port = process.env.PORT || 3000;

var myApp = require('./lectures/app');
//console.log(myApp);
//myApp.sayHello();

myApp(app);

app.listen(port);