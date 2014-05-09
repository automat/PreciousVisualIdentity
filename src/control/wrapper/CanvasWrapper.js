function CanvasWrapper()
{

}

/*---------------------------------------------------------------------------------------------------------*/
// stroke / fill
/*---------------------------------------------------------------------------------------------------------*/


CanvasWrapper.prototype.stroke = function(rgba){};

CanvasWrapper.prototype.fill = function(rgba){};

CanvasWrapper.prototype.strokeWidth = function(width){};


/*---------------------------------------------------------------------------------------------------------*/
// primitives
/*---------------------------------------------------------------------------------------------------------*/

CanvasWrapper.prototype.drawRect = function(x,y,xw,yh,radius){};

CanvasWrapper.prototype.drawRoundRect = function(x,y,xw,yh,radius){};


/*---------------------------------------------------------------------------------------------------------*/
// Text
/*---------------------------------------------------------------------------------------------------------*/

CanvasWrapper.prototype.setFontFamily = function(family){};

CanvasWrapper.prototype.setTextSize = function(size){};

CanvasWrapper.prototype.measureText = function(str){};

CanvasWrapper.prototype.drawText = function(str,x,y){};


/*---------------------------------------------------------------------------------------------------------*/
// primitives
/*---------------------------------------------------------------------------------------------------------*/


CanvasWrapper.prototype.save     = function(){};
CanvasWrapper.prototype.restore  = function(){};
CanvasWrapper.prototype.clipRect = function(x,y,xw,yh){};


module.exports = CanvasWrapper;