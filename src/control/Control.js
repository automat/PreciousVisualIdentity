/*
 *   Skia GL Texture control panel
 *   DEV VERSION - supermesssy
 *
 */

var Foam                = require('/Users/automat/WebstormProjects/Foam/src/foam/foam'),
    CanvasTexture       = Foam.CanvasTexture,
    Mouse               = Foam.Mouse,
    MouseState          = Foam.MouseState,
    EventType           = require('./event/EventType'),
    Node       = require('./core/Node'),
    Style               = require('./Style'),
    Button              = require('./module/Button'),
    SkiaWrapper         = require('./wrapper/SkiaWrapper'),
    plask               = require('plask');


/*---------------------------------------------------------------------------------------------------------*/
// *_*
/*---------------------------------------------------------------------------------------------------------*/


function Control(width,height)
{
    CanvasTexture.call(this);

    this._width  = width;
    this._height = height;

    var canvas = this._data = plask.SkCanvas.create(width,height);


    this._mouseStateCached = null;


    /*---------------------------------------------------------------------------------------------------------*/
    // Paints - TEST
    /*---------------------------------------------------------------------------------------------------------*/


    var context = new SkiaWrapper(canvas,new plask.SkPaint());

    var string = 'Precious Forever';

    Style.Stage.width = width;
    Style.Stage.height = height;

    var testObj = this._testObj = new Node().setStyle(Style.Stage);
        testObj.addChild(new Node())
               .setString('Precious')
               .setStyle(Style.Debug0);
        testObj.addChild(new Node())
               .setString('Precious')
               .setStyle(Style.Debug1);
        testObj.addChild(new Node())
               .setString('Precious')
               .setStyle(Style.Debug2);
        testObj.addChild(new Node())
               .setString('Precious')
               .setStyle(Style.Debug3)
        testObj.addChild(new Node())
               .setString('This is a \nprecious \nlittle \nbox')
               .setStyle(Style.Debug4);
        testObj.addChild(new Node())
               .setString('Precious')
               .setStyle(Style.Debug5);
    /*
        testObj.addChild(new Node())
               .setString('Precious')
               .setStyle(Style.Debug1);
        testObj.addChild(new Node())
               .setString('Precious')
               .setStyle(Style.Debug2);
    */
    /*
        testObj.addChild(new Node())
               .setStyle(Style.Debug3);
    /*
    /*
        testObj.addChild(new StringDisplayObject(string))
               .setStyle(Style.StringDisplayObjectDebug0);

        testObj.addChild(new StringDisplayObject(string))
               .setStyle(Style.StringDisplayObjectDebug1);
               */





    testObj.draw(context);
}

Control.prototype = Object.create(CanvasTexture.prototype);

var trace = 0;

Control.prototype.onTestObjMouseDown = function(e)
{
    console.log(trace, e.type, e.sender);
};

Control.prototype.onTestObjMouseUp = function(e)
{
    console.log(trace, e.type);
};

Control.prototype.onTestObjMouseDrag = function(e)
{
    console.log(trace, e.type);
}

Control.prototype.update = function()
{
    var mouse = Mouse.getInstance();

    var cmouseState        = mouse.getState(),
        mouseStateLast     = mouse.getStateLast(),
        mouseStateCached   = this._mouseStateCached,
        mouseStateChanged  = !!cmouseState  &&
                             (cmouseState    != mouseStateLast) &&
                             (cmouseState    != mouseStateCached) ||
                             (cmouseState    == MouseState.MOUSE_MOVED &&
                              mouseStateLast == MouseState.MOUSE_MOVED) ||
                             (cmouseState    == MouseState.MOUSE_DRAG &&
                              mouseStateLast == MouseState.MOUSE_DRAG);

    this._mouseStateCached = cmouseState;

    if(!mouseStateChanged)
        return;

    this._testObj.updateMouseInput(cmouseState,mouse.getX(),mouse.getY());

};




module.exports = Control;

