var app = require('./express');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: "donttellanyone" }));


app.get('/api/session', function(req, res) {
    console.log(req.session);
    res.send(req.session);
});

app.get('/api/session/:name/:value', function(req, res) {
    var name = req.params.name;
    var value = req.params.value;

    req.session[name] = value;

    console.log(req.session);
    res.send(req.session);
});


// configure a public directory to host static content
// stream it verbaten back to the client
app.use(app.express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var port = process.env.PORT || 3000;

var myApp = require('./lectures/app');
myApp(app);

require('./assignment/app');

//require('./lectures/directives/app');

app.listen(port);