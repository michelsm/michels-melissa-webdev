var app = require('../../express');
var foodieUserModel = require('../models/user/user.model.server');

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));

var FacebookStrategy = require('passport-facebook').Strategy;

var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/project/uploads' });

app.get    ('/api/project/register/user', findUserByUsername);
app.post   ('/api/project/register', register);
app.post   ('/api/project/login', passport.authenticate('local'), login);
app.get    ('/api/project/user/:userId', findUserById);
app.get    ('/api/project/user', findUserByCredentials);
app.post   ('/api/project/user', createUser);
app.put    ('/api/project/user/:userId', updateUser);
app.delete ('/api/project/user/:userId', isAdmin, deleteUser);
app.delete ('/api/project/unregister', unregister);
app.put    ('/api/project/addComment', addComment);


app.get    ('/api/project/checkLoggedIn', checkLoggedIn);
app.get    ('/api/project/checkAdmin', checkAdmin);
app.post   ('/api/project/logout', logout);
app.post   ("/api/project/upload", upload.single('profileImg'), uploadImage);
app.get    ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.put    ('/api/project/addToPins/:userId', addToPins);
app.delete ('/api/project/removeFromPins/:userId', removeFromPins);
app.get    ('/api/project/findUsersByFirstName/:firstName', findAllUsersByFirstName);
app.put    ('/api/project/follow/:userId', follow);
app.get    ('/api/project/findAllUsers', isAdmin, findAllUsers);



var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};


passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


function facebookStrategy(token, refreshToken, profile, done) {
    foodieUserModel
        .findUserByFacebook(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var displayName = profile.displayName;
                    var usernameParts = displayName.split(" ");
                    var newFacebookUser = {
                        username: usernameParts[0],
                        password: usernameParts[0],
                        firstName: usernameParts[0],
                        lastName: usernameParts[1],
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return foodieUserModel.createUser(newFacebookUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );

}


app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
    }));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


function localStrategy(username, password, done) {
    foodieUserModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function addComment(req, res) {
    var userId = req.user._id;
    var comment = req.body;

            foodieUserModel
                .addComment(userId, comment)
                .then(function (response) {
                    res.send(200);
                });
}


function register(req, res) {
    var user = req.body;

    var array = new Array();
    array.push("USER");
    user.roles = array;

    foodieUserModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
            req.login(user, function (status) {
                res.json(user);
            });
        });
}


function findUserByUsername(req, res) {
    var username = req.query['username'];

    foodieUserModel
        .findUserByUsername(username)
        .then(function (user) {
            if (user != null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        });
}


function checkLoggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}


function checkAdmin(req, res) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}


function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}


function findUserById(req, res) {

    var userId = req.params['userId'];

    foodieUserModel
        .findUserById(userId)
        .then(function (user) {
            console.log(user);
            res.json(user);
        });
}


function findAllUsersByFirstName(req, res) {

    var firstName = req.params['firstName'];

    foodieUserModel
        .findAllUsersByFirstName(firstName)
        .then(function (users) {
            res.json(users);
        });
}


function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    foodieUserModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if (user != null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}

function findAllUsers(req, res) {

    foodieUserModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        });
}

function createUser(req, res) {
    var user = req.body;

    foodieUserModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}


function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];

    foodieUserModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function addToPins(req, res) {
    var match = req.body;
    var userId = req.params['userId'];

    console.log("got to the user service service");

    foodieUserModel
        .addToPins(userId, match)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function follow(req, res) {
    var userId = req.params['userId'];
    var user = req.body;


    foodieUserModel
        .follow(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function removeFromPins(req, res) {
    var match = req.body;
    var userId = req.params['userId'];

    foodieUserModel
        .removeFromPins(userId, match)
        .then(function (status) {
            res.sendStatus(200);
        })
}


function deleteUser(req, res) {
    var userId = req.params['userId'];

    foodieUserModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    foodieUserModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function uploadImage(req, res) {
    var profileImg = req.file;

    var userId = req.body.userId;

    var originalname = profileImg.originalname; // file name on user's computer
    var filename = profileImg.filename;     // new file name in upload folder
    var path = profileImg.path;         // full path of uploaded file
    var destination = profileImg.destination;  // folder where file is saved to
    var size = profileImg.size;
    var mimetype = profileImg.mimetype;

    foodieUserModel
        .findUserById(userId)
        .then(function (user) {
                user.profileImg = 'uploads/' + filename;

                foodieUserModel
                    .updateUser(userId, user)
                    .then(function (user) {

                            var callbackUrl = "/project/#!/editUserSettings";
                            res.redirect(callbackUrl);
                        }
                    );
            }
        );
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}


function unregister(req, res) {

    foodieUserModel
        .deleteUser(req.user._id)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            console.log("error in the server");
        });
}