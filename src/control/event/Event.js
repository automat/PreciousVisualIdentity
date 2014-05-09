function Event(sender,type,data)
{
    this.sender = sender;
    this.type   = type;
    this.data   = data;
}

Event.prototype.clone = function()
{
    return new Event(this.sender,this.type,this.data);
};

module.exports = Event;