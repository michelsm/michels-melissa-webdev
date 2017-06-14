var app = require('../../express');
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

var widgetModel = require('../models/widget/widget.model.server');

app.post("/api/assignment/page/:pageId/widget", createWidget);
app.get("/api/assignment/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/assignment/widget/:widgetId", findWidgetById);
app.put("/api/assignment/widget/:widgetId", updateWidget);
app.delete("/api/assignment/widget/:widgetId", deleteWidget);
app.post ("/api/assignment/upload", upload.single('myFile'), uploadImage);
app.put('/api/assignment/page/:pageId/widget', sortWidget);

/*
var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>"}
];
*/

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;

    widget._page = pageId;

    console.log("we got to the server");

    widgetModel
        .createWidget(widget)
        .then(function (widget) {
            res.send(widget);
        });
}


function findAllWidgetsForPage(req, res) {

    widgetModel
        .findAllWidgetsForPage(req.params.pageId)
        .then(function (widgets) {
            res.json(widgets);
        });
}


function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });
}



function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params['widgetId'];

    console.log(widget.url);
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.sendStatus(200);
        });
}


function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];

    widgetModel
        .deleteWidget(widgetId)
        .then(function (status) {
            res.sendStatus(200);
        });
}


function uploadImage(req, res) {


    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    if (widgetId === null) {

        console.log("widget Id is null");

        widget = {
            "_id": new Date().getTime() + "",
            "widgetType": "IMAGE",
            "pageId": pageId,
            "width": width,
            "name": req.body.name,
            "text": req.body.text
        };
        widgetId = widget._id;
        widget.url = 'uploads/'+filename;


        widgetModel
            .createWidget(widget)
            .then(function (widget) {
                var callbackUrl = "/assignment/#!/user/"+userId+"/website/"+
                    websiteId+"/page/"+pageId+"/widget/" + widgetId;

                res.redirect(callbackUrl);
            });


    }
    else {

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                widget.url = 'uploads/'+filename;
                widget.width = "100%";

                widgetModel
                    .updateWidget(widgetId, widget)
                    .then(function (widget) {

                        console.log(widget.url);

                        var callbackUrl = "/assignment/#!/user/"+userId+"/website/"+
                            websiteId+"/page/"+pageId+"/widget/" + widgetId;
                        res.redirect(callbackUrl);

                    });
            });
    }
}


// TO DO --> probably will save for later when I complete sort widgets
function sortWidget(req, res) {
    var pageId = req.params['pageId'];
    var initial = req.query['initial'];
    var final = req.query['final'];

    var currWidgets = widgets.filter(function(widget) {
        return widget['pageId'] === pageId;
    });

    res.sendStatus(200);
}