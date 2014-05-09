var EventDispatcher = require('./../event/EventDispatcher'),
    EventType       = require('./../event/EventType'),
    Event           = require('./../event/Event');

/*---------------------------------------------------------------------------------------------------------*/
// States
/*---------------------------------------------------------------------------------------------------------*/

var DisplayState =
{
    DEFAULT : 'default',
    DOWN    : 'down',
    UP      : 'up',
    OVER    : 'over'
};


/*---------------------------------------------------------------------------------------------------------*/
// Constructor
/*---------------------------------------------------------------------------------------------------------*/

function Node()
{
    EventDispatcher.call(this);

    this._parent         = null;
    this._children       = [];

    this._position       = [0,0];
    this._positionGlobal = [0,0];
    this._size           = [0,0];

    this._respondsMouse    = true;
    this._respondsKeyboard = true;

    this._positionIsDirty = true;
    this._canvasIsDirty   = false;

    var style = this._style = {};
        style.margin = [0,0];
        style.width  = 0;
        style.height = 0;

    this._marginLast = [-1,-1,-1,-1];
    this._sizeLast   = [-1,-1];

    this._string = null;

    //temps
    this._tBounds = [0,0,0,0];
}

Node.prototype = Object.create(EventDispatcher.prototype);

/*---------------------------------------------------------------------------------------------------------*/
// Child management
/*---------------------------------------------------------------------------------------------------------*/

Node.prototype.addChild = function(child)
{
    this._children.push(child);
    child._parent = this;
    child.getPositionGlobal();

    return child;
};

Node.prototype.addChildAt = function(child,index)
{
    var children = this._children;
    children.splice(index, 0, child);
    child._parent = this;
    child.getPositionGlobal();

    return child;
};

Node.prototype.removeChild = function(child)
{
    var children = this._children,
        index    = children.indexOf(child);

    if(index != -1)
        children.splice(index,0);

    return child;
};

Node.prototype.removeChildAt = function(index)
{
    var children = this._children,
        child    = children[index];
        children.splice(index,1);

    return child;
};

Node.prototype.removeAllChildren = function()
{
    this._children = [];
};

Node.prototype.getChildAt = function(index)
{
    return this._children[index];
};

Node.prototype.containsChild =function(child)
{
    return this._children.indexOf(child) != -1;
};

Node.prototype.getNumChildren = function()
{
    return this._children.length;
};

Node.prototype.getFirstChild = function()
{
    return this._children[0];
};

Node.prototype.getLastChild = function()
{
    return this._children[this._children.length - 1];
};

/*---------------------------------------------------------------------------------------------------------*/
// Update Input Mouse / Key
/*---------------------------------------------------------------------------------------------------------*/


//TODO: Cleanup

Node.prototype.updateMouseInput = function(mouseState,x,y)
{
    var children = this._children,
        child,
        childHit = false;

    var i = children.length;
    while(--i > -1)
    {
        child = children[i];

        if(!child.isEnabled() ||
           !child.respondsToMouse())
            continue;

        childHit = child.updateMouseInput(mouseState,x,y);

        if(childHit)
            break;
    }

    if(childHit)
        return false;

    if(this.hitTestPoint(x,y))
    {
        if(mouseState == 'mousedown')
        {
            this._drawMouseDown();
            this._canvasIsDirty = true;
            this.dispatchEvent(new Event(this,EventType.MOUSE_DOWN,null));
        }

        if(mouseState == 'mouseup')
        {
            this._drawMouseUp();
            this._canvasIsDirty = true;
            this.dispatchEvent(new Event(this,EventType.MOUSE_UP,null));
        }

        /*
        if(mouseState == 'mouseover')
        {}
        */

        if(mouseState == 'mousedrag')
        {
            this.dispatchEvent(new Event(this,EventType.MOUSE_DRAG,null));
        }

        return true;
    }

    return false;
};

Node.prototype.updateKeyboardInput = function(keyState,char)
{
    if(!this._isEnabled || !this._respondsKeyboard)return;
};


/*---------------------------------------------------------------------------------------------------------*/
// Hittest
/*---------------------------------------------------------------------------------------------------------*/

Node.prototype.hitTestPoint = function(x,y)
{
    var position = this._positionGlobal,
        size     = this._size;

    return x > position[0] && x < (position[0] + size[0]) &&
           y > position[1] && y < (position[1] + size[1]);
};


/*---------------------------------------------------------------------------------------------------------*/
// Position & Size
/*---------------------------------------------------------------------------------------------------------*/

/*
Node.prototype.setX = function(x){this._position[0] = x;this._positionIsDirty = true;};
Node.prototype.setY = function(y){this._position[1] = y;this._positionIsDirty = true;};

Node.prototype.getX = function(){return this._position[0];};
Node.prototype.getY = function(){return this._position[1];};
/*

Node.prototype.getPositionGlobalX = function(){return this.getPositionGlobal()[0];};
Node.prototype.getPositionGlobalY = function(){return this.getPositionGlobal()[1];};

/*
Node.prototype.setWidth  = function(width){this._size[0] = width;};
Node.prototype.setHeight = function(height){this._size[1] = height;};
*/


Node.prototype.getWidth  = function()
{
    var width    = this._style.width,
        size     = this._size,
        sizeLast = this._sizeLast;

    if(width != sizeLast[0])
        sizeLast[0] = size[0] = width;

    return size[0];
};

Node.prototype.getHeight = function()
{
    var height   = this._style.height,
        size     = this._size,
        sizeLast = this._sizeLast;

    if(height != sizeLast[1])
        sizeLast[1] = size[1] = height;

    return size[1];
};

Node.prototype.getPositionLocal = function()
{
    var margin     = this._style.margin,
        marginLast = this._marginLast;

    if(!this._arrPropIsEqual(margin,marginLast))
    {
        var ml,mt;

        ml = this._getArrComp(margin,3);
        mt = this._getArrComp(margin,0);

        this._setArrProp(marginLast,margin);

        this._position[0] = ml;
        this._position[1] = mt;
    }

    return this._position;
};

//
// This is just really basic, would be better to use real transformations
// on children, and then retrieve the global position by multiplying their
// local position via the parent transformation matrix
//
// TODO: DO IT

Node.prototype.getPositionGlobal = function()
{
    var parent = this._parent;

    var globalX = this.getPositionLocal()[0],
        globalY = this.getPositionLocal()[1];

    var style,
        padding,
        pl,pt;

    //because nodes currently dont float
    //theres just local margin top right

        while(parent)
        {
            style = parent._style;

            //currently just top left
            padding = style.padding;

            pl = this._getArrComp(padding,3);
            pt = this._getArrComp(padding,0);

            globalX += parent.getPositionLocal()[0] + pl;
            globalY += parent.getPositionLocal()[1] + pt;

            parent = parent._parent;
        }

    this._positionGlobal[0] = globalX;
    this._positionGlobal[1] = globalY;


    return this._positionGlobal;
};


Node.prototype.getBoundsGlobal = function()
{
    var x = this.getPositionGlobal()[0],
        y = this.getPositionGlobal()[1],
        w = this.getWidth(),
        h = this.getHeight();

    var b = this._tBounds;
        b[0] = x;
        b[1] = y;
        b[2] = x + w;
        b[3] = y + h;

    return b;
};


Node.prototype.getBoundsLocal = function()
{
    var x = this.getPositionLocal()[0],
        y = this.getPositionLocal()[1],
        w = this.getWidth(),
        h = this.getHeight();

    var b = this._tBounds;
        b[0] = x;
        b[1] = y;
        b[2] = x + w;
        b[3] = y + h;


    return b;
};

Node.prototype.clipsChild = function(child)
{
    var bL   = this.getBoundsLocal(),
        bLx  = bL[0],
        bLy  = bL[1],
        bLxw = bL[2],
        bLyh = bL[3];

    var bCL   = child.getBoundsLocal(),
        bCLx  = bCL[0],
        bCLy  = bCL[1],
        bCLxw = bCL[2],
        bCLyh = bCL[3];

    return (bCLx  >= bLxw) ||
           (bCLy  >= bLyh) ||
           (bCLxw <= bLx ) ||
           (bCLyh <= bLy );
};

//
// This is basically used for: Am I still visible
// within my parents bounds? No? Then why the heck
// do you update me!!
//

Node.prototype.getsClipped = function()
{
    var parent = this._parent;
    if(!parent)return false;

    return parent.clipsChild(this);
};


/*---------------------------------------------------------------------------------------------------------*/
// Root / parent traverse
/*---------------------------------------------------------------------------------------------------------*/


Node.prototype.isRoot = function()
{
    return !this._parent;
};

Node.prototype.getRoot = function()
{
    var parent = this._parent;
    if(!parent)return this;

    while(parent)parent = parent._parent;

    return parent;
};

/*---------------------------------------------------------------------------------------------------------*/
// Styling
/*---------------------------------------------------------------------------------------------------------*/


//
// Trying to keep the renderer as modular as possible,
// so I can just pass Context and draw according to
// style.
//


Node.prototype.draw = function(context)
{
    var style = this._style;

    if(style.overflow && style.overflow == 'hidden')
    {
        context.save();

        var x  = this.getPositionGlobal()[0],
            y  = this.getPositionGlobal()[1];

            context.clipRect(x,y,
                             x + this.getWidth(),
                             y + this.getHeight());

            this._drawStyle(context);
            this._drawChildren(context);

            context.restore();
    }
    else
    {
        this._drawStyle(context);
        this._drawChildren(context);
    }

};



Node.prototype._drawChildren = function(context)
{
    var children = this._children,
        len      = children.length;

    var i = -1;
    while(++i < len)children[i].draw(context);
};


Node.prototype._drawStyle = function(context)
{
    var x  = this.getPositionGlobal()[0],
        y  = this.getPositionGlobal()[1],
        w  = this.getWidth(),
        h  = this.getHeight(),
        xw = x + w,
        yh = y + h;


    var style = this._style;

    var box        = style.box,
        background = style.background,
        border     = style.border;

    var bw  = (!!border && border.width)? border.width : 1,
        bwh = bw * 0.5;

    var inset = !!border && !!border.color &&
                !!box && box.sizing == 'border-box';

    var cx  = x,
        cy  = y,
        cxw = xw,
        cyh = yh;


    if(inset)
    {
        cx += bwh;
        cy += bwh;
        cxw-= bwh;
        cyh-= bwh;
    }

    //TODO: merge stroke/fill

    if(background)
    {
        if(border)
        {
            context.strokeWidth(bw);

            //background
            if(background.color)
            {
                context.fill(background.color);

                if(!!border.radius)
                {
                    context.drawRoundRect(cx,cy,cxw,cyh, border.radius);
                }
                else context.drawRect(cx,cy,cxw,cyh);

            }

            //image
            if(background.image){}

            //border
            if(border.color)
            {
                context.stroke(border.color);

                if(border.radius)
                    context.drawRoundRect(cx,cy,cxw,cyh, border.radius);
                else
                    context.drawRect(cx,cy,cxw,cyh);
            }
        }
        else
        {
            if(background.color)
            {
                context.fill(background.color);
                context.drawRect(x,y,xw,yh);
            }

            if(background.image){}
        }
    }
    else
    {
        if(border)
        {
            context.strokeWidth(bw);

            if(border.color)
            {
                context.stroke(border.color);

                if(border.radius)
                    context.drawRoundRect(cx,cy,cxw,cyh, border.radius);
                else
                    context.drawRect(cx,cy,cxw,cyh);
            }

        }
    }

    var string = this._string;

    if(!string || string.length == 0)return;

    //
    // this is pretty rough at the moment, no caching,
    // no region update, no line break management,
    // currently always overrides previous state
    //

    var padding = style.padding,
        pt      = this._getArrComp(padding,0),
        pr      = this._getArrComp(padding,1),
        pb      = this._getArrComp(padding,2),
        pl      = this._getArrComp(padding,3),
        px      = x + pl,
        py      = y + pt,
        pw      = w - pr,
        ph      = h - pt - pb,
        pxw     = px + pw - pr * 2,
        pyh     = py + ph + pt;


    var font    = style.font  || {},
        family  = font.family || 'Arial',
        color   = style.color || [0,0,0,255],
        size    = font.size   || 16,
        weight  = font.weight,
        fstyle  = font.style;

    context.setFontFamily(family);
    context.setTextSize(size);

    var text       = style.text  || {},
        align      = text.align  || 'left',
        valign     = text.valign || 'top',
        transform  = text.transform,
        decoration = text.decoration;

    var tstring = !transform ? string :
        transform == 'uppercase' ?
            string.toUpperCase() :
            transform == 'lowercase' ?
                string.toLowerCase() :
                transform == 'capitalize' ?
                    string.replace(/[^-'\s]+/g,
                        function(word)
                        {
                            return word.replace(/^./,
                                function(first)
                                {
                                    return first.toUpperCase();
                                });
                        }) :
                    string;



    if(decoration)
    {
        context.setUnderlineText( decoration == 'underline');
        context.setStrikeThruText(decoration == 'line-through');
    }

    var metrics = context.getFontMetrics();
    //var oy = Math.abs(metrics.ascent + metrics.descent);

    var tx = align == 'left' ?
                px :
            align == 'center' ?
                px :
             px;

    var ty = align == 'top' ?
                py :
             py;

    var lines      = tstring.split('\n'),
        lineHeight = context.getLineHeight(),
        line;

    var bounds;
    var i = -1,l = lines.length;
    var oy = lineHeight * (l - 1) * 0.5;



    ty += Math.abs(metrics.ascent + metrics.descent);

    context.fill(color);


    while(++i < l)
    {
        line   = lines[i];
        bounds = context.getTextBounds(line);

        console.log(bounds),

        //check  outside of loop,please
        context.drawText(line,(align == 'center') ?
                              (xw * 0.5) :
                               tx,
                              ty);

        ty += lineHeight;
    }

    /*

    var tx = align == 'left' ?
                px :
             align == 'right' ?
                pxw  :
             align == 'center' ?
                px + pw * 0.5 : //- bounds.w * 0.5 :
             px,

        ty = valign == 'top' ?
                py : //+ oy :
             valign == 'bottom' ?
                pyh : //+ oy : //+ bounds.h :
             valign == 'center' ?
                y + h * 0.5 : //- bounds.h * 0.5:
              py;



    var lines      = tstring.split('\n'),
        lineHeight = context.getLineHeight(),
        line;

    var bounds;
    var i = -1,l = lines.length;
    var oy = lineHeight * (l - 1) * 0.5;


    context.fill(color);

    while(++i < l)
    {
        line   = lines[i];
        bounds = context.getTextBounds(line);
        context.drawText(line,tx ,
                              ty - bounds.h * 0.5 - oy);

        ty += lineHeight;
    }

    */



};


//TODO: Add dirty check, if eg style change on runtime
//      AND delete previous entries if not part of
//      new style. if no margin nor width/height
//      default them to 0
Node.prototype.setStyle = function(style)
{
    var _style = this._style;
    for(var p in style)
    {
        _style[p] = style[p];
    }
    return this;

};
Node.prototype.getStyle = function()     {return this._style;};

/*---------------------------------------------------------------------------------------------------------*/
// String
/*---------------------------------------------------------------------------------------------------------*/


Node.prototype.setString = function(string)
{
    this._string = string;
    this._canvasIsDirty = true;
    return this;
};

Node.prototype.getString = function(){return this._string;};


/*---------------------------------------------------------------------------------------------------------*/
// Update states & update dirty canvas
/*---------------------------------------------------------------------------------------------------------*/

Node.prototype.isDirty = function()
{
    var isDirty = this._canvasIsDirty;
    if(isDirty)return true;

    var children     = this._children,
        childIsDirty = false;

    var i = children.length;
    while(--i > -1)
    {
        childIsDirty = children[i].isDirty();

        if(childIsDirty)
            break;
    }

    return childIsDirty;
};



Node.prototype._drawDefault   = function(){};
Node.prototype._drawMouseDown = function(){};
Node.prototype._drawMouseUp   = function(){};
Node.prototype._drawMouseOver = function(){};
Node.prototype._drawMouseDrag = function(){};


/*---------------------------------------------------------------------------------------------------------*/
// Flags
/*---------------------------------------------------------------------------------------------------------*/

Node.prototype.respondToMouse     = function(bool){this._respondsMouse = bool;};
Node.prototype.respondsToMouse    = function(){return this._respondsMouse;};

Node.prototype.respondToKeyboard  = function(bool){this._respondsKeyboard = bool;};
Node.prototype.respondsToKeyboard = function(){return this._respondsKeyboard;};


Node.prototype._arrPropIsEqual = function(a,b)
{
    var alen = a.length,
        blen = b.length;

    if(alen == blen)
    {
        var i = -1;
        while(++i < alen)
        {
            if(a[i] != b[i])
                return false;
        }

        return true
    }

    var at,ar,ab,al,
        bt,br,bb,bl;

    // trbl
    if(alen == 1){
        at = ar = ab = al = a[0];
    }
    else if(alen == 2){
        at = ab = a[0]; ar = al = a[1];
    }
    else if(alen == 3){
        at = a[0]; al = ar = a[1]; ab = a[2];
    }
    else{
        at = a[0]; ar = a[1]; ab = a[2]; al = a[3];
    }

    if(blen == 1){
        bt = br = bb = bl = b[0];
    }
    else if(blen == 2){
        bt = bb = b[0]; br = bl = b[1];
    }
    else if(blen == 3){
        bt = b[0]; bl = br = b[1]; bb = b[2];
    }
    else{
        bt = b[0]; br = b[1]; bb = b[2]; bl = b[3];
    }

    return at == bt && ar == br && ab == bb && al == bl;
};

Node.prototype._setArrProp = function(a,b)
{
    var blen,bt,br,bb,bl;

    if(blen == 4)
    {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];

        return a;
    }

    if(blen == 1){
        bt = br = bb = bl = b[0];
    }
    else if(blen == 2){
        bt = bb = b[0]; br = bl = b[1];
    }
    else if(blen == 3){
        bt = b[0]; bl = br = b[1]; bb = b[2];
    }

    a[0] = bt;
    a[1] = br;
    a[2] = bb;
    a[3] = bl;

    return a;
};

Node.prototype._getArrComp = function(a,i)
{
    var alen = a.length;
   //t rl b
    if(alen == 3)
        return a[(i == 0) ?
                    i :
                 (i == 1 || i == 3) ?
                     1 :
                  2];
    else if(alen == 2)
        return a[(i == 0 || i == 2) ?
                    0 :
                  1];
    else if(alen == 1)
        return a[0]
    else
        return a[i];
};


module.exports = Node;