var app = require('./express');
var passport      = require('passport');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: "donttellanyone",
    resave: true,
    saveUninitialized: true}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


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



//var myApp = require('./lectures/app');
//myApp(app);


// The assignment is commented out because passport is unable to
// be run in two instances.
//require('./assignment/app');



require('./project/app');



app.listen(process.env.PORT || 3000);