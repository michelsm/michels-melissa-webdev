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

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;

    widget._page = pageId;


    widgetModel
        .createWidget(widget)
        .then(function (widget) {
            res.json(widget);
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


                        var callbackUrl = "/assignment/#!/user/"+userId+"/website/"+
                            websiteId+"/page/"+pageId+"/widget/" + widgetId;
                        res.redirect(callbackUrl);

                    });
            });
    }
}

function sortWidget(req, res) {
    var pageId = req.params['pageId'];
    var initial = req.query['initial'];
    var final = req.query['final'];

    widgetModel
        .sortWidget(pageId, initial, final)
        .then(function(response) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });

    res.sendStatus(200);
}