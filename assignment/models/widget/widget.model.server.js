/**
 * Created by melissamichels on 6/12/17.
 */

var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);



widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.deleteWidget = deleteWidget;


module.exports = widgetModel;


function createWidget(widget) {
    console.log(widget);
    return widgetModel.create(widget);
}

function findWidgetById(widgetId) {
    return widgetModel.findOne({_id: widgetId});
}

function updateWidget(widgetId, widget) {
    if (widget.widgetType === 'HEADING') {
        return widgetModel.update({_id: widgetId}, {
            $set: {
                name: widget.name,
                text: widget.text,
                size: widget.size
            }
        });

    } else if(widget.widgetType === 'IMAGE') {
        return widgetModel.update({_id: widgetId}, {
            $set: {
                name: widget.name,
                text: widget.text,
                url: widget.url,
                width: widget.width
            }
        });

    } else if(widget.widgetType === 'YOUTUBE') {
        return widgetModel.update({_id: widgetId}, {
            $set: {
                name: widget.name,
                text: widget.text,
                url: widget.url,
                width: widget.width
            }
        });
    } else if (widget.widgetType === 'HTML') {
        return widgetModel.update({_id: widgetId}, {
            $set: {
                name: widget.name,
                text: widget.text
            }
        });
    }
}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({_page: pageId});
}

function deleteWidget(widgetId) {
    return widgetModel.remove({_id: widgetId});
}

