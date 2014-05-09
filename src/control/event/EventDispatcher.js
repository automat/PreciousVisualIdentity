EventDispatcher = function()
{
    this._listeners = [];
    this._isEnabled = true;
};

EventDispatcher.prototype =
{
    addEventListener : function(eventType,listener,callbackMethod)
    {
        this._listeners[eventType] = this._listeners[eventType] || [];
        this._listeners[eventType].push({obj:listener,method:callbackMethod});
    },

    dispatchEvent : function(event)
    {
        if(!this._isEnabled)return;

        var type = event.type;

        if(!this.hasEventListener(type))return;

        var listeners = this._listeners[type];
        var i = -1, l = listeners.length;

        var obj,method;

        while(++i < l)
        {
            obj    = listeners[i].obj;
            method = listeners[i].method;

            if(!obj[method])throw obj + ' has no method ' + method;

            obj[method](event);
        }
    },

    removeEventListener : function(type,obj,method)
    {
        if(!this.hasEventListener(type))return;

        var listeners = this._listeners[type];

        var i = listeners.length;
        while(--i > -1)
        {
            if(listeners[i].obj == obj && listeners[i].method == method)
            {
                listeners.splice(i,1);
                if(listeners.length == 0)delete this._listeners[type];
                break;
            }
        }
    },

    removeAllEventListeners : function()
    {
        this._listeners = [];
    },


    hasEventListener : function(type)
    {
        return this._listeners[type] != undefined && this._listeners[type] != null;
    },

    enable    : function(){this._isEnabled = true;},
    disable   : function(){this._isEnabled = false;},
    isEnabled : function(){return this._isEnabled;}


};


module.exports = EventDispatcher;