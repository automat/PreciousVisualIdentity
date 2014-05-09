function SkiaWrapper(canvas,paint)
{
    this._canvas = canvas;

    var _paint = this._paint  = paint;

    if(!_paint.getFlags())
        _paint.setFlags(_paint.kAntiAliasFlag);

}


SkiaWrapper.prototype =
{

    // stroke / fill

    stroke : function(rgba)
    {
        this._paint.setStroke();
        this._paint.setColor(rgba[0],rgba[1],rgba[2],rgba[3]);
    },

    fill : function(rgba)
    {
        this._paint.setFill();
        this._paint.setColor(rgba[0],rgba[1],rgba[2],rgba[3]);
    },

    strokeWidth : function(width)
    {
        this._paint.setStrokeWidth(width);
    },

    setStrokeDash : function(arr)
    {
        this._paint.setDashPathEffect(arr);
    },


    // primitives

    drawRect : function(x,y,xw,yh)
    {
        this._canvas.drawRect(this._paint,x,y,xw,yh);
    },

    drawRoundRect : function(x,y,xw,yh,radius)
    {
        this._canvas.drawRoundRect(this._paint,x,y,xw,yh,radius,radius);
    },

    // text
    setFontFamily : function(family)
    {
        this._paint.setFontFamily(family);
    },

    setTextSize : function(size)
    {
        this._paint.setTextSize(size);
    },

    measureText : function(str)
    {
        this._paint.measureText(str);
    },

    drawText : function(str,x,y)
    {
        this._canvas.drawText(this._paint,str,x,y);
    },

    getFontMetrics : function()
    {
        return this._paint.getFontMetrics();
    },

    getLineHeight : function()
    {
        var m = this.getFontMetrics();
        return m.descent - m.ascent + m.leading;
    },

    setUnderlineText : function(bool)
    {
        this._paint.setUnderlineText(bool);
    },

    setStrikeThruText : function(bool)
    {
        this._paint.setStrikeThruText(bool);
    },

    measureTextBounds : function(str)
    {
        return this._paint.measureTextBounds(str);
    },



    getTextBounds : function(str)
    {
        var bounds = this._paint.measureTextBounds(str);

        var x0 = bounds[0],
            y0 = bounds[3],
            x1 = bounds[2],
            y1 = bounds[1];

        return {x : x0, y : y0, w : x0 + x1, h : y0 + y1};

    },


    // transform

    save : function()
    {
        this._canvas.save();
    },

    restore : function()
    {
        this._canvas.restore();
    },

    clipRect : function(x,y,xw,yh)
    {
        this._canvas.clipRect(x,y,xw,yh);
    },

    // ...

    setAntialias : function(bool)
    {
        this._canvas.setAntialias(bool);
    }

};


module.exports = SkiaWrapper;