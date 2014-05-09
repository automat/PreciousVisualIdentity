var StringDisplayObject = require('./../core/Node');

function Button(string,x,y,width,height)
{
    StringDisplayObject.apply(this,arguments);
}

Button.prototype = Object.create(StringDisplayObject.prototype);

module.exports = Button;