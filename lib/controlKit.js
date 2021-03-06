/**
 *
 * controlKit.js - A lightweight controller library
 *
 * controlKit.js is available under the terms of the MIT license.  The full text of the
 * MIT license is included below.
 *
 * MIT License
 * ===========
 *
 * Copyright (c) 2013 Henryk Wollik. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

var ControlKit = ControlKit || {};



ControlKit.Event = function(sender,type,data)
{
    this.sender = sender;
    this.type   = type;
    this.data   = data;
};

ControlKit.Event.prototype.clone = function()
{
    return new ControlKit.Event(this.sender,this.type,this.data);
};
ControlKit.EventDispatcher = function()
{
    this._listeners = [];
};

ControlKit.EventDispatcher.prototype =
{
    addEventListener : function(eventType,listener,callbackMethod)
    {
        this._listeners[eventType] = this._listeners[eventType] || [];
        this._listeners[eventType].push({obj:listener,method:callbackMethod});
    },

    dispatchEvent : function(event)
    {
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
    }
};
ControlKit.EventType =
{
    VALUE_UPDATED             : 'valueUpdated',
    UPDATE_VALUE              : 'updateValue',

    SELECT_TRIGGERED          : 'selectTrigger',
    TRIGGER_SELECT            : 'triggerSelect',

    PANEL_MOVE_BEGIN          : 'panelMoveBegin',
    PANEL_MOVE                : 'panelMove',
    PANEL_MOVE_END            : 'panelMoveEnd',

    PANEL_SHOW                : 'panelShow',
    PANEL_HIDE                : 'panelHide',

    PANEL_SCROLL_WRAP_ADDED   : 'panelScrollWrapAdded',
    PANEL_SCROLL_WRAP_REMOVED : 'panelScrollWrapRemoved',

    SUBGROUP_TRIGGER          : 'subGroupTrigger',

    COMPONENTS_ENABLE         : 'enableCompo',
    COMPONENTS_DISABLE        : 'disableComps',

    SUBGROUP_ENABLE          : 'enableSubGroup',
    SUBGROUP_DISABLE         : 'disableSubGroup',

    INDEX_ORDER_CHANGED      : 'indexOrderChanged',
    CHANGE_INDEX_ORDER       : 'changeIndexOrder',

    SCROLL_BEGIN             : 'scrollBegin',
    SCROLL                   : 'scroll',
    SCROLL_END               : 'scrollEnd',

    INPUT_SELECTDRAG_START   : 'inputSelectDragStart',
    INPUT_SELECTDRAG         : 'inputSelectDrag',
    INPUT_SELECTDRAG_END     : 'inputSelectDragEnd',

    INPUT_SELECT_DRAG        : 'inputSelectDrag',

    HISTORY_STATE_PUSH       : 'historyStatePush',
    HISTORY_STATE_POP        : 'historyStatePop',

    GROUP_SIZE_CHANGE        : 'groupSizeChange',
    GROUP_LIST_SIZE_CHANGE   : 'groupListSizeChange',
    GROUP_SIZE_UPDATE        : 'groupSizeUpdate',

    PANEL_SIZE_CHANGE        : 'panelSizeChange',

    UPDATE_MENU            : 'updateMenu'
};
ControlKit.ColorMode =
{
    RGB  : 'rgb',
    HSV  : 'hsv',
    HEX  : 'hex',
    RGBfv : 'rgbfv'
};
ControlKit.LayoutMode =
{
    LEFT   : 'left',
    RIGHT  : 'right',
    TOP    : 'top',
    BOTTOM : 'bottom',
    NONE   : 'none'
};
ControlKit.Metric =
{
    COMPONENT_MIN_HEIGHT : 25,
    STROKE_SIZE          : 1,
    PADDING_WRAPPER      : 12,
    PADDING_OPTIONS      : 2,
    PADDING_PRESET       : 20,

    SCROLLBAR_TRACK_PADDING          : 2,
    FUNCTION_PLOTTER_LABEL_TICK_SIZE : 6
};
ControlKit.Preset =
{
    /*---------------------------------------------------------------------------------*/

    HISTORY_MAX_STATES : 30,
    NUMBER_INPUT_SHIFT_MULTIPLIER : 10,

    /*---------------------------------------------------------------------------------*/

    FUNCTION_PLOTTER_NON_IMPLICIT_UNIT_X    :  1,
    FUNCTION_PLOTTER_NON_IMPLICIT_UNIT_Y    :  1,
    FUNCTION_PLOTTER_IMPLICIT_UNIT_X    :  0.25,
    FUNCTION_PLOTTER_IMPLICIT_UNIT_Y    :  0.25,
    FUNCTION_PLOTTER_UNIT_MIN  : 0.15,
    FUNCTION_PLOTTER_UNIT_MAX  : 4,
    FUNCTION_PLOTTER_NON_IMPLICIT_SCALE     : 10.0,
    FUNCTION_PLOTTER_IMPLICIT_SCALE     :1.0,
    FUNCTION_PLOTTER_SCALE_MIN : 0.02,
    FUNCTION_PLOTTER_SCALE_MAX : 25,

    FUNCTION_PLOTTER_IMPLICIT_AXES_COLOR : 'rgba(255,255,255,0.75)',
    FUNCTION_PLOTTER_IMPLICIT_GRID_COLOR : 'rgba(25,25,25,0.75)',

    FUNCTION_PLOTTER_NON_IMPLICIT_AXES_COLOR : 'rgb(54,60,64)',
    FUNCTION_PLOTTER_NON_IMPLICIT_GRID_COLOR : 'rgb(25,25,25)',

    FUNCTION_PLOTTER_CIRCLE_LABEL_RADIUS : 3,
    FUNCTION_PLOTTER_CIRCLE_LABEL_FILL   : 'rgb(255,255,255)',
    FUNCTION_PLOTTER_CIRCLE_STROKE       : '#b12334'

    /*---------------------------------------------------------------------------------*/

};
ControlKit.Default =
{
    KIT_TRIGGER         : false,
    KIT_HISTORY         : false,
    KIT_PANELS_CLOSABLE : false,
    KIT_OPACITY         : 1.0,

    /*---------------------------------------------------------------------------------*/

    PANEL_POSITION   : null,
    PANEL_WIDTH      : 300,
    PANEL_HEIGHT     : null,
    PANEL_WIDTH_MIN  : 100,
    PANEL_WIDTH_MAX  : 600,
    PANEL_RATIO      : 40,
    PANEL_LABEL      : 'Control Panel',
    PANEL_VALIGN     : ControlKit.LayoutMode.TOP,
    PANEL_ALIGN      : ControlKit.LayoutMode.RIGHT,
    PANEL_DOCK       : {align:ControlKit.LayoutMode.RIGHT,resizable:true},
    PANEL_ENABLE     : true,
    PANEL_OPACITY    : 1.0,
    PANEL_FIXED      : true,
    PANEL_VCONSTRAIN : true,

    /*---------------------------------------------------------------------------------*/

    BUTTON_LABEL : '',

    /*---------------------------------------------------------------------------------*/

    OUTPUT_HEIGHT : null,
    OUTPUT_WRAP   : false,
    OUTPUT_UPDATE : true,

    NUMBER_INPUT_DP     : 2,
    NUMBER_INPUT_STEP   : 1,
    NUMBER_INPUT_PRESET : null,
    NUMBER_OUTPUT_DP    : 2,

    STRING_INPUT_PRESET : null,

    /*---------------------------------------------------------------------------------*/

    PAD_BOUNDS_X : [-1,1],
    PAD_BOUNDS_Y : [-1,1],
    PAD_LABEL_X  : '',
    PAD_LABEL_Y  : '',

    /*---------------------------------------------------------------------------------*/

    RANGE_STEP : 1.0,
    RANGE_DP   : 2,

    /*---------------------------------------------------------------------------------*/

    SLIDER_STEP : 1.0,
    SLIDER_DP   : 2,

    /*---------------------------------------------------------------------------------*/

    VALUE_PLOTTER_RESOLUTION : 1,

    FUNCTION_PLOTTER_SHOW_MIN_MAX_LABELS : true,


    /*---------------------------------------------------------------------------------*/

    COLOR_COLOR_MODE : ControlKit.ColorMode.HEX,
    COLOR_PRESETS    : null,

    COLOR_PICKER_VALUE_HUE : 200.0,
    COLOR_PICKER_VALUE_SAT : 50.0,
    COLOR_PICKER_VALUE_VAL : 50.0

    /*---------------------------------------------------------------------------------*/
};
ControlKit.History = function()
{
    ControlKit.EventDispatcher.apply(this,arguments);
    this._states   = [];
    this._isDisabled = false;
};

ControlKit.History.prototype = Object.create(ControlKit.EventDispatcher.prototype);

/*---------------------------------------------------------------------------------*/

ControlKit.History.prototype.pushState = function(object,key,value)
{
    if(this._isDisabled)return;

    var states    = this._states,
        statesMax = ControlKit.Preset.HISTORY_MAX_STATES;

    if(states.length >= statesMax)states.shift();
    states.push({object:object,key:key,value:value});

    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.HISTORY_STATE_PUSH,null));
};

ControlKit.History.prototype.getState = function(object,key)
{
    var states    = this._states,
        statesLen = states.length;

    if(statesLen == 0)return null;

    var state,value;

    var i = -1;
    while(++i < statesLen)
    {
        state = states[i];

        if(state.object === object)
        {
            if(state.key === key)
            {
               value = state.value;
               break;
            }
        }
    }

    return value;
};

ControlKit.History.prototype.popState  = function()
{
    if(this._isDisabled)return;

    var states = this._states;
    if(states.length < 1)return;

    var lastState = states.pop();
    lastState.object[lastState.key] = lastState.value;

    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.HISTORY_STATE_POP,null));
};

ControlKit.History.prototype.getNumStates = function(){return this._states.length;};

/*---------------------------------------------------------------------------------*/

ControlKit.History._instance   = null;
ControlKit.History.init        = function(){return ControlKit.History._instance = new ControlKit.History();};
ControlKit.History.getInstance = function(){return ControlKit.History._instance;};

ControlKit.History.prototype.enable     = function(){this._isDisabled=false;};
ControlKit.History.prototype.disable    = function(){this._isDisabled=true;};
ControlKit.History.prototype.isDisabled = function(){return this._isDisabled;};
ControlKit.Error =
{
    COLOR_FORMAT_HEX                  : 'Color format should be hex. Set colorMode to rgb, rgbfv or hsv.',
    COLOR_FORMAT_RGB_RGBFV_HSV        : 'Color format should be rgb, rgbfv or hsv. Set colorMode to hex.',
    COLOR_PRESET_FORMAT_HEX           : 'Preset color format should be hex.',
    COLOR_PRESET_FORMAT_RGB_RGBFV_HSV : 'Preset color format should be rgb, rgbfv or hsv.',
    COMPONENT_OBJECT                  : 'Object ',
    COMPONENT_OBJECT_MEMBER_REFERENCE : ' has no member ',
    TYPE                              : ' should be of type ',
    COMPONENT_FUNCTION_LENGTH         : 'Function should be of form f(x) or f(x,y).',
    END                               : '.'
};
ControlKit.ErrorUtil =
{
    ReferenceError : function(object,key)       {return (object[key] === undefined);},
    TypeError      : function(object,value,type){return Object.prototype.toString.call(object[value]) !== Object.prototype.toString.call(type);}
};
ControlKit.Kit = function(parentDomElementId,params)
{
    ControlKit.EventDispatcher.apply(this,arguments);

    var node = null;

    if(!parentDomElementId)
    {
        node = new ControlKit.Node(ControlKit.NodeType.DIV);
        document.body.appendChild(node.getElement());
    }
    else
    {
        node = ControlKit.Node.getNodeById(parentDomElementId);
    }

    node.setProperty('id',ControlKit.CSS.ControlKit);

    /*---------------------------------------------------------------------------------*/

    params                = params                || {};
    params.trigger        = params.trigger        === undefined ? ControlKit.Default.KIT_TRIGGER         : params.fixed;
    params.history        = params.history        === undefined ? ControlKit.Default.KIT_HISTORY         : params.history;
    params.panelsClosable = params.panelsClosable === undefined ? ControlKit.Default.KIT_PANELS_CLOSABLE : params.panelsClosable;
    params.opacity        = params.opacity        || ControlKit.Default.KIT_OPACITY;

    /*---------------------------------------------------------------------------------*/

    this._node           = node;
    this._panels         = [];
    this._isDisabled     = false;
    this._historyEnabled = params.history;
    this._panelsClosable = params.panelsClosable;

    /*---------------------------------------------------------------------------------*/

    var history = ControlKit.History.init();
        history.addEventListener(ControlKit.EventType.HISTORY_STATE_PUSH,this,'onHistoryStatePush');
        history.addEventListener(ControlKit.EventType.HISTORY_STATE_POP ,this,'onHistoryStatePop');

    if(!this._historyEnabled)history.disable();

    var mouse   = ControlKit.Mouse.init(),
        picker  = ControlKit.Picker.init( this.getNode()),
        options = ControlKit.Options.init(this.getNode());

    if(params.trigger)
    {
        var trigger = new ControlKit.Node(ControlKit.NodeType.DIV);
            trigger.setProperty('id',ControlKit.CSS.Trigger);
            trigger.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,this._onTriggerDown.bind(this));

        document.body.appendChild(trigger.getElement());
    }

    if(params.opacity != 1.0 && params.opacity != 0.0)
    {
        node.setStyleProperty('opacity',params.opacity);
    }

    /*---------------------------------------------------------------------------------*/

    ControlKit.Kit._instance = this;
};

ControlKit.Kit.prototype = Object.create(ControlKit.EventDispatcher.prototype);

/*---------------------------------------------------------------------------------*/

ControlKit.Kit.prototype._onTriggerDown = function()
{
    var disabled = this._isDisabled = !this._isDisabled;
    this._node.setStyleProperty('visibility',disabled ? 'hidden' : 'visible');
};

ControlKit.Kit.prototype.onValueUpdated = function(e)
{
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.UPDATE_VALUE,{origin: e.sender}));
};

ControlKit.Kit.prototype.onSelectTriggered = function(e)
{
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.TRIGGER_SELECT,{origin: e.sender}));
};

/*---------------------------------------------------------------------------------*/

ControlKit.Kit.prototype.addPanel = function(params)
{
    var panel = new ControlKit.Panel(this, params);
    this._panels.push(panel);
    return panel;
};

/*---------------------------------------------------------------------------------*/

ControlKit.Kit.prototype.update = function()
{
    if(this._isDisabled)return;

    var i = -1, j, k;

    var panels = this._panels,
        panel,
        groups,
        components,
        component;

    while (++i < panels.length)
    {
        panel = panels[i];

        if(panel.isDisabled())continue;

        groups = panel.getGroups();

        j = -1;
        while (++j < groups.length)
        {
            components = groups[j].getComponents();

            k = -1;
            while (++k < components.length)
            {
                component = components[k];

                if(component.isDisabled())continue;

                if (component instanceof ControlKit.ValuePlotter ||
                    component instanceof ControlKit.StringOutput ||
                    component instanceof ControlKit.NumberOutput)
                {
                    component.update();
                }
            }
        }
    }
};

ControlKit.Kit.prototype.historyIsEnabled  = function(){return this._historyEnabled;};
ControlKit.Kit.prototype.panelsAreClosable = function(){return this._panelsClosable;};

ControlKit.Kit.prototype.enable  = function(){this._isDisabled = false;};
ControlKit.Kit.prototype.disable = function(){this._isDisabled = true;};

ControlKit.Kit.prototype.disableAllPanels = function(){var i=-1,p=this._panels;while(++i<p.length)p[i].enable();};
ControlKit.Kit.prototype.enableAllPanels  = function(){var i=-1,p=this._panels;while(++i<p.length)p[i].disable();};

/*---------------------------------------------------------------------------------*/

ControlKit.Kit.prototype.onHistoryStatePush = function()
{
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.UPDATE_MENU,null));
};

ControlKit.Kit.prototype.onHistoryStatePop  = function()
{
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.UPDATE_VALUE,{origin: null}));
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.UPDATE_MENU, null));
};

/*---------------------------------------------------------------------------------*/

ControlKit.Kit.prototype.getNode = function(){return this._node;};

/*---------------------------------------------------------------------------------*/


ControlKit.getKitInstance = function(){return ControlKit.Kit._instance;};
ControlKit.CSS =
{
    ControlKit   : 'controlKit',

    Panel        : 'panel',
    Head         : 'head',
    Label        : 'label',
    Menu         : 'menu',
    Wrap         : 'wrap',

    MenuBtnClose : 'btnClose',
    MenuBtnHide  : 'btnHide',
    MenuBtnShow  : 'btnShow',
    MenuBtnUndo  : 'btnUndo',

    WrapInputWPreset : 'inputWPresetWrap',
    WrapColorWPreset : 'colorWPresetWrap',

    /*-------------------------------------------------------------------------------------*/

    HeadInactive : 'headInactive',
    PanelHeadInactive : 'panelHeadInactive',

    /*-------------------------------------------------------------------------------------*/

    GroupList : 'groupList',
    Group     : 'group',
    SubGroupList  : 'subGroupList',
    SubGroup      : 'subGroup',


    TextAreaWrap : 'textAreaWrap',

    IconArrowUpBig : 'iconArrowUpBig',


    /*-------------------------------------------------------------------------------------*/

    Button       : 'button',

    WrapSlider   : 'wrapSlider',

    SliderWrap   : 'sliderWrap',
    SliderSlot   : 'sliderSlot',
    SliderHandle : 'sliderHandle',

    ArrowBMin    : 'arrowBMin',
    ArrowBMax    : 'arrowBMax',
    ArrowBSubMin : 'arrowBSubMin',
    ArrowBSubMax : 'arrowBSubMax',
    ArrowSMin    : 'arrowSMin',
    ArrowSMax    : 'arrowSMax',

    /*-------------------------------------------------------------------------------------*/

    Select       : 'select',
    SelectActive : 'selectActive',

    Options         : 'options',
    OptionsSelected : 'liSelected',


    SelectColor : 'selectColor',

    /*-------------------------------------------------------------------------------------*/

    PresetBtn        : 'presetBtn',
    PresetBtnActive  : 'presetBtnActive',

    /*-------------------------------------------------------------------------------------*/

    CanvasListItem  : 'canvasListItem',
    CanvasWrap      : 'canvasWrap',

    SVGListItem     : 'svgListItem',
    SVGWrap         : 'svgWrap',

    GraphSliderXWrap   : 'graphSliderXWrap',
    GraphSliderYWrap   : 'graphSliderYWrap',
    GraphSliderX       : 'graphSliderX',
    GraphSliderY       : 'graphSliderY',
    GraphSliderXHandle : 'graphSliderXHandle',
    GraphSliderYHandle : 'graphSliderYHandle',

    /*-------------------------------------------------------------------------------------*/

    Picker              : 'picker',
    PickerPalleteWrap   : 'palleteWrap',
    PickerFieldWrap     : 'fieldWrap',
    PickerInputWrap     : 'inputWrap',
    PickerInputField    : 'inputField',
    PickerControlsWrap  : 'controlsWrap',
    PickerColorContrast : 'colorContrast',

    PickerHandleField  : 'indicator',
    PickerHandleSlider : 'indicator',

    Color : 'color',

    /*-------------------------------------------------------------------------------------*/

    ScrollBar        : 'scrollBar',
    ScrollWrap       : 'scrollWrap',
    ScrollbarBtnUp   : 'btnUp',
    ScrollbarBtnDown : 'btnDown',
    ScrollbarTrack   : 'track',
    ScrollbarThumb   : 'thumb',
    ScrollBuffer     : 'scrollBuffer',

    /*-------------------------------------------------------------------------------------*/

    Trigger : 'controlKitTrigger',

    SizeHandle : 'sizeHandle'
};

ControlKit.DocumentEventType =
{
    MOUSE_MOVE : 'mousemove',
    MOUSE_UP   : 'mouseup',
    MOUSE_DOWN : 'mousedown',

    WINDOW_RESIZE : 'resize'
};
ControlKit.Mouse = function()
{
    this._pos = [0,0];
    document.addEventListener(ControlKit.DocumentEventType.MOUSE_MOVE,this._onDocumentMouseMove.bind(this));
};

ControlKit.Mouse.prototype._onDocumentMouseMove = function(e)
{
    var dx = 0,
        dy = 0;

    if(!e)e = window.event;
    if(e.pageX)
    {
        dx = e.pageX;
        dy = e.pageY;
    }
    else if(e.clientX)
    {
        dx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        dy = e.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
    }
    this._pos[0] = dx;
    this._pos[1] = dy;
};

ControlKit.Mouse.prototype.getPosition = function(){return this._pos;};
ControlKit.Mouse.prototype.getX        = function(){return this._pos[0];};
ControlKit.Mouse.prototype.getY        = function(){return this._pos[1];};

ControlKit.Mouse.init        = function(){if(!ControlKit.Mouse._instance)ControlKit.Mouse._instance = new ControlKit.Mouse();};
ControlKit.Mouse.getInstance = function(){return ControlKit.Mouse._instance;};
ControlKit.NodeEventType =
{
    MOUSE_DOWN   : 'mousedown',
    MOUSE_UP     : 'mouseup',
    MOUSE_OVER   : 'mouseover',
    MOUSE_MOVE   : 'mousemove',
    MOUSE_OUT    : 'mouseout',
    KEY_DOWN     : 'keydown',
    KEY_UP       : 'keyup',
    CHANGE       : 'change',
    FINISH       : 'finish',
    DBL_CLICK    : 'dblclick',
    ON_CLICK     : 'click',
    SELECT_START : 'selectstart',
    DRAG_START   : 'dragstart',
    DRAG         : 'drag',
    DRAG_END     : 'dragend',

    DRAG_ENTER   : 'dragenter',
    DRAG_OVER    : 'dragover',
    DRAG_LEAVE   : 'dragleave',

    RESIZE       : 'resize'
};
ControlKit.NodeType =
{
    DIV            : 'div',
    INPUT_TEXT     : 'text',
    INPUT_BUTTON   : 'button',
    INPUT_SELECT   : 'select',
    INPUT_CHECKBOX : 'checkbox',
    OPTION         : 'option',
    LIST           : 'ul',
    LIST_ITEM      : 'li',
    SPAN           : 'span',
    TEXTAREA       : 'textarea'
};
ControlKit.Node = function()
{
    this._element = null;

    if(arguments.length == 1)
    {
        var arg  = arguments[0];

        if(arg != ControlKit.NodeType.INPUT_TEXT   &&
           arg != ControlKit.NodeType.INPUT_BUTTON &&
           arg != ControlKit.NodeType.INPUT_SELECT &&
           arg != ControlKit.NodeType.INPUT_CHECKBOX)
        {
            this._element = document.createElement(arg);
        }
        else
        {
            this._element = document.createElement('input');
            this._element.type = arg;
        }
    }
};

ControlKit.Node.prototype =
{
    addChild   : function(node)
    {
        this._element.appendChild(node.getElement());
        return node;
    },

    addChildren : function()
    {
        var i = -1,l = arguments.length,e = this._element;
        while(++i < l){e.appendChild(arguments[i].getElement());}
        return this;
    },

    addChildAt : function(node,index)
    {
        this._element.insertBefore(node.getElement(),this._element.children[index]);
        return node;
    },

    removeChild : function(node)
    {
        if(!this.contains(node))return null;
        this._element.removeChild(node.getElement());
        return node;
    },

    removeChildren : function()
    {
        var i = -1, l = arguments.length, e = this._element;
        while(++i<l){e.removeChild(arguments[i].getElement());}
        return this;
    },

    removeChildAt : function(node,index)
    {
        if(!this.contains(node))return null;
        this._element.removeChild(node.getElement());
        return node;
    },

    removeAllChildren : function()
    {
        var element = this._element;
        while(element.hasChildNodes())element.removeChild(element.lastChild);
        return this;
    },

    setWidth  : function(value){this._element.style.width = value + 'px'; return this;},
    getWidth  : function()     {return this._element.offsetWidth;},

    setHeight : function(value){this._element.style.height = value + 'px'; return this;},
    getHeight : function()     {return this._element.offsetHeight;},

    setPosition  : function(x,y){ return this.setPosition(x).setPosition(y);},
    setPositionX : function(x)  {this._element.style.marginLeft = x + 'px';return this;},
    setPositionY : function(y)  {this._element.style.marginTop  = y + 'px';return this;},

    setPositionGlobal  : function(x,y){return this.setPositionGlobalX(x).setPositionGlobalY(y);},
    setPositionGlobalX : function(x)  {this._element.style.left = x + 'px';return this;},
    setPositionGlobalY : function(y)  {this._element.style.top  = y + 'px';return this;},

    getPosition  : function(){return [this.getPositionX(),this.getPositionY()];},
    getPositionX : function(){return this._element.offsetLeft;},
    getPositionY : function(){return this._element.offsetTop;},

    getPositionGlobal : function()
    {
        var offset  = [0,0],
            element = this._element;

        while(element)
        {
            offset[0] += element.offsetLeft;
            offset[1] += element.offsetTop;
            element    = element.offsetParent;
        }

        return offset;
    },

    getPositionGlobalX : function()
    {
        var offset  = 0,
            element = this._element;

        while(element)
        {
            offset += element.offsetLeft;
            element = element.offsetParent;
        }

        return offset;
    },

    getPositionGlobalY : function()
    {
        var offset  = 0,
            element = this._element;

        while(element)
        {
            offset += element.offsetTop;
            element = element.offsetParent;
        }

        return offset;
    },

    addEventListener    : function(type,listener,useCapture){this._element.addEventListener(   type, listener, useCapture); return this;},
    removeEventListener : function(type,listener,useCapture){this._element.removeEventListener(type, listener, useCapture);return this;},

    setStyleClass      : function(style)         {this._element.className = style; return this;},
    setStyleProperty   : function(property,value){this._element.style[property] = value; return this;},
    getStyleProperty   : function(property)      {return this._element.style[property];},
    setStyleProperties : function(properties)    {for(var p in properties)this._element.style[p] = properties[p];return this;},

    deleteStyleClass      : function()           {this._element.className = '';return this},
    deleteStyleProperty   : function(property)   {this._element.style[property] = '';return this;},
    deleteStyleProperties : function(properties) {for(var p in properties)this._element.style[p] = '';return this;},

    getChildAt     : function(index) {return new ControlKit.Node().setElement(this._element.children[index]);},
    getChildIndex  : function(node)  {return this._indexOf(this._element,node.getElement());},
    getNumChildren : function()      {return this._element.children.length;},
    getFirstChild  : function()      {return new ControlKit.Node().setElement(this._element.firstChild);},
    getLastChild   : function()      {return new ControlKit.Node().setElement(this._element.lastChild);},
    hasChildren    : function()      {return this._element.children.length != 0;},
    contains       : function(node)  {return this._indexOf(this._element,node.getElement()) != -1;},

    _indexOf       : function(parentElement,element){return Array.prototype.indexOf.call(parentElement.children,element);},

    setProperty   : function(property, value){this._element[property] = value;return this;},
    setProperties : function(properties)     {for(var p in properties)this._element[p] = properties[p];return this;},
    getProperty   : function(property)       {return this._element[property];},


    setElement : function(element){this._element = element;return this;},
    getElement : function()       { return this._element;},

    getStyle   : function()       {return this._element.style;},

    getParent  : function(){ return new ControlKit.Node().setElement(this._element.parentNode); }
};

ControlKit.Node.getNodeByElement = function(element){return new ControlKit.Node().setElement(element);};
ControlKit.Node.getNodeById      = function(id)     {return new ControlKit.Node().setElement(document.getElementById(id));};


ControlKit.Component = function(parent,label)
{
    ControlKit.EventDispatcher.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    label = parent.usesLabels() ? label : 'none';

    /*---------------------------------------------------------------------------------*/

    this._parent   = parent;
    this._isDisabled = false;

    /*---------------------------------------------------------------------------------*/

    var rootNode = this._node = new ControlKit.Node(ControlKit.NodeType.LIST_ITEM),
        wrapNode = this._wrapNode = new ControlKit.Node(ControlKit.NodeType.DIV);

        wrapNode.setStyleClass(ControlKit.CSS.Wrap);
        rootNode.addChild(wrapNode);


    if(label)
    {
        if(label.length != 0 && label != 'none')
        {
            var lablNode = this._lablNode = new ControlKit.Node(ControlKit.NodeType.SPAN);
                lablNode.setStyleClass(ControlKit.CSS.Label);
                lablNode.setProperty('innerHTML',label);
                rootNode.addChild(lablNode);
        }

        if(label == 'none')
        {
            wrapNode.setStyleProperty('marginLeft','0');
            wrapNode.setStyleProperty('width','100%');
        }
    }

    /*---------------------------------------------------------------------------------*/

    this._parent.addEventListener(ControlKit.EventType.COMPONENTS_ENABLE, this,'onEnable');
    this._parent.addEventListener(ControlKit.EventType.COMPONENTS_DISABLE,this,'onDisable');
    this._parent.addComponentNode(rootNode);

};

ControlKit.Component.prototype = Object.create(ControlKit.EventDispatcher.prototype);

/*---------------------------------------------------------------------------------*/

ControlKit.Component.prototype.enable     = function(){this._isDisabled = false;};
ControlKit.Component.prototype.disable    = function(){this._isDisabled = true; };

ControlKit.Component.prototype.isEnabled  = function(){return !this._isDisabled;};
ControlKit.Component.prototype.isDisabled = function(){return this._isDisabled};

ControlKit.Component.prototype.onEnable  = function(){this.enable();};
ControlKit.Component.prototype.onDisable = function(){this.disable();};


ControlKit.ObjectComponent = function(parent,object,value,params)
{
    if(ControlKit.ErrorUtil.ReferenceError(object,value))
    {
        throw new ReferenceError(ControlKit.Error.COMPONENT_OBJECT +
                                 object.constructor.name +
                                 ControlKit.Error.COMPONENT_OBJECT_MEMBER_REFERENCE +
                                 value +
                                 ControlKit.Error.END);
    }

    /*-------------------------------------------------------------------------------------*/

    params       = params || {};
    params.label = params.label || value;

    /*-------------------------------------------------------------------------------------*/

    ControlKit.Component.apply(this,[parent,params.label]);

    this._object   = object;
    this._key      = value;

    this._onChange = function(){};
    this._onFinish = function(){};

    var kit = ControlKit.getKitInstance();
        kit.addEventListener( ControlKit.EventType.UPDATE_VALUE, this,'onValueUpdate');

    this.addEventListener(ControlKit.EventType.VALUE_UPDATED,kit, 'onValueUpdated');
};

ControlKit.ObjectComponent.prototype = Object.create(ControlKit.Component.prototype);

/*-------------------------------------------------------------------------------------*/

//Override in Subclass
ControlKit.ObjectComponent.prototype.applyValue       = function(){};
ControlKit.ObjectComponent.prototype.pushHistoryState = function(){var obj = this._object,key = this._key;ControlKit.History.getInstance().pushState(obj,key,obj[key]);};
ControlKit.ObjectComponent.prototype.onValueUpdate    = function(e){};
ControlKit.ObjectComponent.prototype.setValue         = function(value){this._object[this._key] = value;};

ControlKit.SVGComponent = function(parent,object,value,params)
{
    ControlKit.ObjectComponent.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    var wrapNode = this._wrapNode;
        wrapNode.setStyleClass(ControlKit.CSS.SVGWrap);
    var wrapSize = wrapNode.getWidth();

    var svg = this._svg = this._createSVGObject('svg');
        svg.setAttribute('version', '1.2');
        svg.setAttribute('baseProfile', 'tiny');
        svg.setAttribute('preserveAspectRatio','true');

        wrapNode.getElement().appendChild(svg);

    var svgRoot = this._svgRoot = svg.appendChild(this._createSVGObject('g'));
        svgRoot.setAttribute('transform','translate(0.5 0.5)');

    this._svgSetSize(wrapSize,wrapSize);
    this._updateHeight();

    /*---------------------------------------------------------------------------------*/

    this._node.setStyleClass(ControlKit.CSS.SVGListItem);

    this._parent.addEventListener(ControlKit.EventType.GROUP_SIZE_CHANGE, this, 'onGroupSizeChange');
    this.addEventListener(ControlKit.EventType.GROUP_SIZE_UPDATE, this._parent, 'onGroupSizeUpdate');
};

ControlKit.SVGComponent.prototype = Object.create(ControlKit.ObjectComponent.prototype);

/*---------------------------------------------------------------------------------*/

ControlKit.SVGComponent.prototype._updateHeight = function()
{
    var svgHeight = Number(this._svg.getAttribute('height'));

    this._wrapNode.setHeight(svgHeight);
    this._node.setHeight(svgHeight + ControlKit.Metric.PADDING_WRAPPER);
};

ControlKit.SVGComponent.prototype._redraw = function(){};

ControlKit.SVGComponent.prototype.onGroupSizeChange = function()
{
    var width = this._wrapNode.getWidth();

    this._svgSetSize(width,width);
    this._updateHeight();
    this._redraw();
};

/*---------------------------------------------------------------------------------*/

ControlKit.SVGComponent.prototype._createSVGObject = function(type)
{
    return document.createElementNS("http://www.w3.org/2000/svg",type);
};

ControlKit.SVGComponent.prototype._svgSetSize = function(width,height)
{
    var svg = this._svg;
        svg.setAttribute('width',  width);
        svg.setAttribute('height', height);
        svg.setAttribute('viewbox', '0 0 ' + width + ' ' + height);
};

/*---------------------------------------------------------------------------------*/

ControlKit.SVGComponent.prototype._pathCmdMoveTo          = function(x,y){return 'M ' + x + ' ' + y + ' ';};
ControlKit.SVGComponent.prototype._pathCmdLineTo          = function(x,y){return 'L ' + x + ' ' + y + ' ';};
ControlKit.SVGComponent.prototype._pathCmdClose           = function()   {return 'Z';};
ControlKit.SVGComponent.prototype._pathCmdLine            = function(x0,y0,x1,y1){return 'M ' + x0 + ' ' + y0 + ' L ' + x1 + ' ' + y1; };
ControlKit.SVGComponent.prototype._pathCmdBezierCubic     = function(cmd,x0,y0,cx0,cy0,cx1,cy1,x1,y1){return 'M ' + x0 + ' ' + y0 + ' C ' + cx0 + ' ' + cy0 + ', ' + cx1 + ' ' + cy1 + ', ' + x1 + ' ' + y1;};
ControlKit.SVGComponent.prototype._pathCmdBezierQuadratic = function(cmd,x0,y0,cx,cy,x1,y1)          {return 'M ' + x0 + ' '+ y0 + ' Q ' + cx + ' ' + cy + ', ' + x1 + ' ' + y1;};

ControlKit.ColorUtil =
{
    HSV2RGB : function(hue,sat,val)
    {
        var max_hue = 360.0,
            max_sat = 100.0,
            max_val = 100.0;

        var min_hue = 0.0,
            min_sat = 0,
            min_val = 0;

        hue = hue % max_hue;
        val = Math.max(min_val,Math.min(val,max_val))/max_val * 255.0;

        if(sat <= min_sat)
        {
            val = Math.round(val);
            return[val,val,val];
        }
        else if(sat > max_sat)sat = max_sat;

        sat = sat/max_sat;

        //http://d.hatena.ne.jp/ja9/20100903/128350434

        var hi = Math.floor(hue/60.0)% 6,
            f  = (hue/60.0) - hi,
            p  = val * (1 - sat),
            q  = val * (1 - f * sat),
            t  = val * (1 - (1 - f) * sat);

        var r = 0,
            g = 0,
            b = 0;

        switch(hi)
        {
            case 0: r = val; g = t; b = p;break;
            case 1: r = q; g = val; b = p;break;
            case 2: r = p; g = val; b = t;break;
            case 3: r = p; g = q; b = val;break;
            case 4: r = t; g = p; b = val;break;
            case 5: r = val; g = p; b = q;break;
            default: break;
        }

        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);

        return [r,g,b];

    },

    RGB2HSV : function(r,g,b)
    {
        var h = 0,
            s = 0,
            v = 0;

        r = r / 255.0;
        g = g / 255.0;
        b = b / 255.0;

        var minRGB = Math.min(r, Math.min(g, b)),
            maxRGB = Math.max(r, Math.max(g, b));

        if (minRGB == maxRGB) { v = minRGB;return [0, 0, Math.round(v)];}

        var dd = (r == minRGB) ? g - b : ((b == minRGB) ? r - g : b - r),
            hh = (r == minRGB) ? 3 : ((b == minRGB) ? 1 : 5);

        h = Math.round(60 * (hh - dd / (maxRGB - minRGB)));
        s = Math.round((maxRGB - minRGB) / maxRGB * 100.0);
        v = Math.round( maxRGB * 100.0);

        return [h, s, v];
    },

    RGB2HEX : function(r,g,b)
    {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },

    RGBfv2HEX : function(r,g,b)
    {
        return ControlKit.ColorUtil.RGB2HEX(Math.floor(r * 255.0),
                                            Math.floor(g * 255.0),
                                            Math.floor(b * 255.0));
    },

    HSV2HEX : function(h,s,v)
    {
        var rgb = ControlKit.ColorUtil.HSV2RGB(h,s,v);
        return ControlKit.ColorUtil.RGB2HEX(rgb[0],rgb[1],rgb[2]);
    },

    HEX2RGB : function(hex)
    {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16)] : null;

    },

    isValidHEX : function(hex)
    {
        return /^#[0-9A-F]{6}$/i.test(hex);
    },

    isValidRGB : function(r,g,b)
    {
        return r >= 0 && r <= 255 &&
               g >= 0 && g <= 255 &&
               b >= 0 && b <= 255;
    },

    isValidRGBfv : function(r,g,b)
    {
        return r >= 0 && r <= 1.0 &&
               g >= 0 && g <= 1.0 &&
               b >= 0 && b <= 1.0;
    }




};
//TODO: Add mouseoffset & reset..
ControlKit.ScrollBar = function(parentNode,targetNode,wrapHeight)
{
    this._parentNode = parentNode;
    this._targetNode = targetNode;
    this._wrapHeight = wrapHeight;

    /*---------------------------------------------------------------------------------*/

    var wrap   = this._wrapNode   = new ControlKit.Node(ControlKit.NodeType.DIV),
        node   = this._node   = new ControlKit.Node(ControlKit.NodeType.DIV),
        track  = this._trackNode  = new ControlKit.Node(ControlKit.NodeType.DIV),
        thumb  = this._thumbNode  = new ControlKit.Node(ControlKit.NodeType.DIV);

    /*---------------------------------------------------------------------------------*/

    parentNode.removeChild(targetNode);
    parentNode.addChild(wrap);
    parentNode.addChildAt(node,0);

    wrap.addChild(targetNode);
    node.addChild(track);
    track.addChild(thumb);

    /*---------------------------------------------------------------------------------*/

    wrap.setStyleClass(ControlKit.CSS.ScrollWrap);
    node.setStyleClass(ControlKit.CSS.ScrollBar);
    track.setStyleClass(ControlKit.CSS.ScrollbarTrack);
    thumb.setStyleClass(ControlKit.CSS.ScrollbarThumb);

    /*---------------------------------------------------------------------------------*/

    this._scrollHeight = 0;
    this._scrollUnit   = 0;

    this._scrollMin    = 0;
    this._scrollMax    = 1;
    this._scrollPos    = 0;


    thumb.setPositionY(ControlKit.Metric.SCROLLBAR_TRACK_PADDING);
    thumb.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,this._onThumbDragStart.bind(this));

    this._isValid  = false;
    this._isDisabled = false;
};

ControlKit.ScrollBar.prototype =
{
    update : function()
    {
        var target  = this._targetNode,
            thumb   = this._thumbNode;

        var padding = ControlKit.Metric.SCROLLBAR_TRACK_PADDING;

        var targetWrapHeight = this._wrapHeight,
            targetHeight     = target.getHeight(),
            trackHeight      = targetWrapHeight - padding * 2;

        thumb.setHeight(trackHeight);

        var ratio = targetWrapHeight / targetHeight;

        this._isValid = false;

        if(ratio > 1.0)return;

        var thumbHeight = trackHeight * ratio;

        this._scrollHeight = trackHeight  - thumbHeight;
        this._scrollUnit   = targetHeight - trackHeight - padding * 2;

        thumb.setHeight(thumbHeight);

        this._isValid = true;


        /*
        var scrollMin = this._scrollMin,
            scrollMax = this._scrollMax,
            scrollPos = this._scrollPos;

        var scrollPosNorm = (scrollPos - scrollMin) / (scrollMax - scrollPos);
        */


    },

    _scrollThumb : function(y)
    {
        var thumb          = this._thumbNode,
            thumbHeight    = thumb.getHeight();

        var track        = this._trackNode,
            trackHeight  = this._wrapHeight,
            trackTop     = track.getPositionGlobalY(),
            trackCenter  = trackHeight * 0.5;

        var target       = this._targetNode;

        var scrollHeight = this._scrollHeight,
            scrollUnit   = this._scrollUnit;

        var min = this._scrollMin = trackCenter - scrollHeight * 0.5,
            max = this._scrollMax = trackCenter + scrollHeight * 0.5;

        var pos       = Math.max(min,Math.min(y - trackTop,max));

        var thumbPos  = this._scrollPos =  pos - thumbHeight * 0.5,
            targetPos = -(pos - min) / (max - min) * scrollUnit;

        thumb.setPositionY(thumbPos);
        target.setPositionY(targetPos);
    },

    _onThumbDragStart : function()
    {
        if(!this._isValid || this._isDisabled)return;

        var eventMouseMove = ControlKit.DocumentEventType.MOUSE_MOVE,
            eventMouseUp   = ControlKit.DocumentEventType.MOUSE_UP;

        var self = this;

        var mouse = ControlKit.Mouse.getInstance();

        //TODO:add
        this._scrollOffset = mouse.getY() - this._thumbNode.getPositionGlobalY();

        var onDrag    = function()
            {
                self._scrollThumb(mouse.getY());
            },

            onDragEnd = function()
            {
                document.removeEventListener(eventMouseMove, onDrag,    false);
                document.removeEventListener(eventMouseUp,   onDragEnd, false);
            };

        this._scrollThumb(mouse.getY());
        document.addEventListener(eventMouseMove, onDrag,    false);
        document.addEventListener(eventMouseUp,   onDragEnd, false);
    },

    enable  : function(){this._isDisabled = false;this._updateAppearance();},
    disable : function(){this._isDisabled = true; this._updateAppearance();},

    reset : function(){this._scrollThumb(0);},

    _updateAppearance : function()
    {
        if(this._isDisabled)
        {
            this._node.setStyleProperty('display','none');
            this._targetNode.setPositionY(0);
            this._thumbNode.setPositionY(ControlKit.Metric.SCROLLBAR_TRACK_PADDING);
        }
        else
        {
            this._node.setStyleProperty('display','block');
        }
    },

    isValid : function(){return this._isValid;},

    setWrapHeight : function(height)
    {
        this._wrapHeight = height;
        this.update();
    },

    removeTargetNode : function(){return this._wrapNode.removeChild(this._targetNode);},

    removeFromParent : function()
    {
        var parentNode = this._parentNode,
            rootNode   = this._node,
            targetNode = this._targetNode;

        rootNode.removeChild(targetNode);
        parentNode.removeChild(this._wrapNode);
        parentNode.removeChild(rootNode);

        return targetNode;
    },

    getWrapNode    : function(){return this._wrapNode;},
    getNode        : function(){return this._node;},
    getTargetNode  : function(){return this._targetNode;}
};

ControlKit.AbstractGroup = function(parent,params)
{
    ControlKit.EventDispatcher.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    params        = params        || {};
    params.height = params.height || null;
    params.enable = params.enable === undefined ? true : params.enable;

    /*---------------------------------------------------------------------------------*/

    this._parent     = parent;
    this._height     = params.height;
    this._isDisabled = !params.enable;
    this._scrollBar  = null;

    this._node     = new ControlKit.Node(ControlKit.NodeType.LIST_ITEM);
    this._wrapNode = new ControlKit.Node(ControlKit.NodeType.DIV);
    this._listNode = new ControlKit.Node(ControlKit.NodeType.LIST);

    this._parent.getList().addChild(this._node);

};

ControlKit.AbstractGroup.prototype = Object.create(ControlKit.EventDispatcher.prototype);

/*---------------------------------------------------------------------------------*/

ControlKit.AbstractGroup.prototype.addScrollWrap = function()
{
    var wrapNode  = this._wrapNode,
        maxHeight = this.getMaxHeight();

    this._scrollBar = new ControlKit.ScrollBar(wrapNode,this._listNode,maxHeight);
    if(this.isEnabled())wrapNode.setHeight(maxHeight);
};

ControlKit.AbstractGroup.prototype.preventSelectDrag = function()
{
    this._parent.preventSelectDrag();

    if(!this.hasScrollWrap())return;
    this._wrapNode.getElement().scrollTop = 0;
};

/*---------------------------------------------------------------------------------*/

ControlKit.AbstractGroup.prototype.hasMaxHeight  = function(){return this._height != null;};
ControlKit.AbstractGroup.prototype.getMaxHeight  = function(){return this._height;};
ControlKit.AbstractGroup.prototype.hasScrollWrap = function(){return this._scrollBar != null;};
ControlKit.AbstractGroup.prototype.hasLabel      = function(){return this._lablNode  != null;};

ControlKit.AbstractGroup.prototype.disable      = function() {this._isDisabled = false; this._updateAppearance();};
ControlKit.AbstractGroup.prototype.enable       = function() {this._isDisabled = true;  this._updateAppearance();};
ControlKit.AbstractGroup.prototype.isDisabled   = function() {return this._isDisabled;};
ControlKit.AbstractGroup.prototype.isEnabled    = function() {return !this._isDisabled;};

ControlKit.AbstractGroup.prototype.getList      = function(){return this._listNode;};

ControlKit.Group = function(parent,params)
{
    ControlKit.AbstractGroup.apply(this,arguments);

    /*-------------------------------------------------------------------------------------*/

    params           = params || {};
    params.label     = params.label     || null;
    params.useLabels = params.useLabels || true;
    params.enable    = params.enable     === undefined ? true : params.enable;

    /*-------------------------------------------------------------------------------------*/

    this._components = [];
    this._subGroups  = [];

    /*-------------------------------------------------------------------------------------*/

    var rootNode = this._node,
        wrapNode = this._wrapNode,
        listNode = this._listNode;

        rootNode.setStyleClass(ControlKit.CSS.Group);
        wrapNode.setStyleClass(ControlKit.CSS.Wrap);
        listNode.setStyleClass(ControlKit.CSS.SubGroupList);

        wrapNode.addChild(listNode);

    /*-------------------------------------------------------------------------------------*/

    var label = params.label;

    if(label)
    {
        var headNode  = new ControlKit.Node(ControlKit.NodeType.DIV),
            lablWrap  = new ControlKit.Node(ControlKit.NodeType.DIV),
            lablNode  = new ControlKit.Node(ControlKit.NodeType.SPAN),
            indiNode  = this._indiNode = new ControlKit.Node(ControlKit.NodeType.DIV);

            headNode.setStyleClass(ControlKit.CSS.Head);
            lablWrap.setStyleClass(ControlKit.CSS.Wrap);
            lablNode.setStyleClass(ControlKit.CSS.Label);
            indiNode.setStyleClass(ControlKit.CSS.ArrowBMax);
            lablNode.setProperty('innerHTML',label);

            headNode.addChild(indiNode);
            lablWrap.addChild(lablNode);
            headNode.addChild(lablWrap);
            rootNode.addChild(headNode);

        headNode.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,this._onHeadTrigger.bind(this));
        this.addEventListener(ControlKit.EventType.GROUP_LIST_SIZE_CHANGE,this._parent,'onGroupListSizeChange');

        this._updateAppearance();
    }

    if(this.hasMaxHeight())this.addScrollWrap();

    rootNode.addChild(wrapNode);

    if(this.hasMaxHeight())
    {
        if(!label)
        {
            var bufferTop = this._scrollBufferTop = new ControlKit.Node(ControlKit.NodeType.DIV);
                bufferTop.setStyleClass(ControlKit.CSS.ScrollBuffer);

            rootNode.addChildAt(bufferTop,0);
        }

        var bufferBottom = this._scrollBufferBottom = new ControlKit.Node(ControlKit.NodeType.DIV);
            bufferBottom.setStyleClass(ControlKit.CSS.ScrollBuffer);

        rootNode.addChild(bufferBottom);
    }

    /*-------------------------------------------------------------------------------------*/

    this._parent.addEventListener(ControlKit.EventType.PANEL_MOVE_BEGIN,          this, 'onPanelMoveBegin');
    this._parent.addEventListener(ControlKit.EventType.PANEL_MOVE,                this, 'onPanelMove');
    this._parent.addEventListener(ControlKit.EventType.PANEL_MOVE_END,            this, 'onPanelMoveEnd');
    this._parent.addEventListener(ControlKit.EventType.PANEL_HIDE,                this, 'onPanelHide');
    this._parent.addEventListener(ControlKit.EventType.PANEL_SHOW,                this, 'onPanelShow');
    this._parent.addEventListener(ControlKit.EventType.PANEL_SCROLL_WRAP_ADDED,   this, 'onPanelScrollWrapAdded');
    this._parent.addEventListener(ControlKit.EventType.PANEL_SCROLL_WRAP_REMOVED, this, 'onPanelScrollWrapRemoved');
    this._parent.addEventListener(ControlKit.EventType.PANEL_SIZE_CHANGE,         this, 'onPanelSizeChange');
    this._parent.addEventListener(ControlKit.EventType.WINDOW_RESIZE,             this, 'onWindowResize');

    /*-------------------------------------------------------------------------------------*/

    this.addEventListener(ControlKit.EventType.GROUP_SIZE_CHANGE,this._parent,'onGroupListSizeChange');
};

ControlKit.Group.prototype = Object.create(ControlKit.AbstractGroup.prototype);

/*-------------------------------------------------------------------------------------*/

ControlKit.Group.prototype.onPanelMoveBegin         = function(){this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.PANEL_MOVE_BEGIN,  null));};
ControlKit.Group.prototype.onPanelMove              = function(){this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.PANEL_MOVE,        null));};
ControlKit.Group.prototype.onPanelMoveEnd           = function(){this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.PANEL_MOVE_END,    null));};
ControlKit.Group.prototype.onPanelScrollWrapAdded   = function(){this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.GROUP_SIZE_CHANGE, null));};
ControlKit.Group.prototype.onPanelScrollWrapRemoved = function(){this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.GROUP_SIZE_CHANGE, null));};
ControlKit.Group.prototype.onPanelHide              = function(){this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.SUBGROUP_DISABLE,  null));};
ControlKit.Group.prototype.onPanelShow              = function(){this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.SUBGROUP_ENABLE,   null));};
ControlKit.Group.prototype.onPanelSizeChange        = function(){this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.GROUP_SIZE_CHANGE, null));};
ControlKit.Group.prototype.onWindowResize           = function(e){this.dispatchEvent(e);};


/*-------------------------------------------------------------------------------------*/

ControlKit.Group.prototype.onSubGroupTrigger = function()
{
    this._updateHeight();

    if(!this.hasMaxHeight())return;

    var scrollBar = this._scrollBar,
        wrapNode  = this._wrapNode;

    var bufferTop    = this._scrollBufferTop,
        bufferBottom = this._scrollBufferBottom;

    scrollBar.update();

    if(!scrollBar.isValid())
    {
        scrollBar.disable();
        wrapNode.setHeight(wrapNode.getChildAt(1).getHeight());

        if(bufferTop   )bufferTop.setStyleProperty(   'display','none');
        if(bufferBottom)bufferBottom.setStyleProperty('display','none');
    }
    else
    {
        scrollBar.enable();
        wrapNode.setHeight(this.getMaxHeight());

        if(bufferTop   )bufferTop.setStyleProperty(   'display','block');
        if(bufferBottom)bufferBottom.setStyleProperty('display','block');
    }

    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.GROUP_SIZE_CHANGE,null));
};

/*-------------------------------------------------------------------------------------*/

ControlKit.Group.prototype._onHeadTrigger = function()
{
    this._isDisabled = !this._isDisabled;
    this._updateAppearance();
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.GROUP_LIST_SIZE_CHANGE,null));
};

/*-------------------------------------------------------------------------------------*/

ControlKit.Group.prototype.addStringInput     = function(object,value,params)       {return this._addComponent(new ControlKit.StringInput(     this.getSubGroup(),object,value,params));};
ControlKit.Group.prototype.addNumberInput     = function(object,value,params)       {return this._addComponent(new ControlKit.NumberInput(     this.getSubGroup(),object,value,params));};
ControlKit.Group.prototype.addRange           = function(object,value,params)       {return this._addComponent(new ControlKit.Range(           this.getSubGroup(),object,value,params));};
ControlKit.Group.prototype.addCheckbox        = function(object,value,params)       {return this._addComponent(new ControlKit.Checkbox(        this.getSubGroup(),object,value,params));};
ControlKit.Group.prototype.addColor           = function(object,value,params)       {return this._addComponent(new ControlKit.Color(           this.getSubGroup(),object,value,params));};
ControlKit.Group.prototype.addButton          = function(label,onPress,params)      {return this._addComponent(new ControlKit.Button(          this.getSubGroup(),label,onPress,params));};
ControlKit.Group.prototype.addSelect          = function(object,value,params)       {return this._addComponent(new ControlKit.Select(          this.getSubGroup(),object,value,params));};
ControlKit.Group.prototype.addSlider          = function(object,value,range,params) {return this._addComponent(new ControlKit.Slider(          this.getSubGroup(),object,value,range,params));};

ControlKit.Group.prototype.addFunctionPlotter = function(object,value,params)       {return this._addComponent(new ControlKit.FunctionPlotter( this.getSubGroup(),object,value,params));};
ControlKit.Group.prototype.addPad             = function(object,value,params)       {return this._addComponent(new ControlKit.Pad(             this.getSubGroup(),object,value,params));};
ControlKit.Group.prototype.addValuePlotter    = function(object,value,params)       {return this._addComponent(new ControlKit.ValuePlotter(    this.getSubGroup(),object,value,params));};
ControlKit.Group.prototype.addNumberOutput    = function(object,value,params)       {return this._addComponent(new ControlKit.NumberOutput(    this.getSubGroup(),object,value,params));};
ControlKit.Group.prototype.addStringOutput    = function(object,value,params)       {return this._addComponent(new ControlKit.StringOutput(    this.getSubGroup(),object,value,params));};

ControlKit.Group.prototype.addCanvas          = function(params)                    {return this._addComponent(new ControlKit.Canvas(          this.getSubGroup(),params));};
ControlKit.Group.prototype.addSVG             = function(params)                    {return this._addComponent(new ControlKit.SVG(             this.getSubGroup(),params));};

/*-------------------------------------------------------------------------------------*/

//TODO: Move to subroup
ControlKit.Group.prototype._addComponent = function(component)
{
    this._components.push(component);
    this._updateHeight();
    return this;
};

/*-------------------------------------------------------------------------------------*/

ControlKit.Group.prototype._updateHeight = function()
{
    this.getSubGroup().update();
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.GROUP_SIZE_CHANGE,null));
    if(this.hasMaxHeight())this._scrollBar.update();
};

/*----------------------------------------------------------collapsed---------------------*/

ControlKit.Group.prototype._updateAppearance = function()
{
    var wrapNode = this._wrapNode,
        inidNode = this._indiNode;

    var scrollBar = this._scrollBar;

    var bufferTop    = this._scrollBufferTop,
        bufferBottom = this._scrollBufferBottom;

    if(this.isDisabled())
    {
        wrapNode.setHeight(0);
        if(inidNode)inidNode.setStyleClass(ControlKit.CSS.ArrowBMin);

        if(scrollBar)
        {
            if(bufferTop   )bufferTop.setStyleProperty(   'display','none');
            if(bufferBottom)bufferBottom.setStyleProperty('display','none');
        }

        return;
    }

    if (this.hasMaxHeight())
    {
        var maxHeight  = this.getMaxHeight(),
            listHeight = wrapNode.getChildAt(1).getHeight();

        wrapNode.setHeight(listHeight < maxHeight ? listHeight : maxHeight);

        if (scrollBar.isValid())
        {
            if (bufferTop)bufferTop.setStyleProperty('display', 'block');
            if (bufferBottom)bufferBottom.setStyleProperty('display', 'block');
        }
    }
    else
    {
        wrapNode.deleteStyleProperty('height');
    }

    if (inidNode)inidNode.setStyleClass(ControlKit.CSS.ArrowBMax);
};

ControlKit.Group.prototype.onGroupSizeUpdate = function()
{
    this._updateAppearance();
    if(this.hasMaxHeight())this._scrollBar.update();
};

/*-------------------------------------------------------------------------------------*/

ControlKit.Group.prototype.addSubGroup  = function(params)
{
    this._subGroups.push(new ControlKit.SubGroup(this,params));
    this._updateHeight();
    return this;
};

/*-------------------------------------------------------------------------------------*/

ControlKit.Group.prototype.getSubGroup   = function()
{
    var subGroups    = this._subGroups,
        subGroupsLen = subGroups.length;

    if(subGroupsLen==0)this.addSubGroup(null);
    return subGroups[subGroupsLen-1];
};
ControlKit.Group.prototype.getComponents = function(){return this._components;};

ControlKit.SubGroup = function(parent,params)
{
    ControlKit.AbstractGroup.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    params            = params          || {};
    params.label      = params.label    || null;
    params.useLabels  = params.useLabels  === undefined ? true : params.useLabels;

    /*---------------------------------------------------------------------------------*/

    var rootNode = this._node,
        wrapNode = this._wrapNode,
        listNode = this._listNode;

        rootNode.setStyleClass(ControlKit.CSS.SubGroup);
        wrapNode.setStyleClass(ControlKit.CSS.Wrap);

        wrapNode.addChild(listNode);
        rootNode.addChild(wrapNode);

    this._useLabels  = params.useLabels;

    /*-------------------------------------------------------------------------------------*/

    var label = params.label;

    if(label)
    {
        if(label.length != 0 && label != 'none')
        {
            var headNode = this._headNode = new ControlKit.Node(ControlKit.NodeType.DIV),
                lablWrap =                  new ControlKit.Node(ControlKit.NodeType.DIV),
                lablNode =                  new ControlKit.Node(ControlKit.NodeType.SPAN);

                headNode.setStyleClass(ControlKit.CSS.Head);
                lablWrap.setStyleClass(ControlKit.CSS.Wrap);
                lablNode.setStyleClass(ControlKit.CSS.Label);

                lablNode.setProperty('innerHTML',label);

                lablWrap.addChild(lablNode);
                headNode.addChild(lablWrap);


            var indiNode = this._indiNode = new ControlKit.Node(ControlKit.NodeType.DIV);
            indiNode.setStyleClass(ControlKit.CSS.ArrowBSubMax);
            headNode.addChildAt(indiNode,0);

            rootNode.addChildAt(headNode,0);

            this.addEventListener(ControlKit.EventType.SUBGROUP_TRIGGER,this._parent,'onSubGroupTrigger');
            headNode.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,this._onHeadMouseDown.bind(this));

            this._updateAppearance();
        }
    }

    if(this.hasMaxHeight())this.addScrollWrap();

    /*-------------------------------------------------------------------------------------*/

    this._parent.addEventListener(ControlKit.EventType.SUBGROUP_ENABLE,  this, 'onEnable');
    this._parent.addEventListener(ControlKit.EventType.SUBGROUP_DISABLE, this, 'onDisable');
    this._parent.addEventListener(ControlKit.EventType.PANEL_MOVE_END,   this, 'onPanelMoveEnd');
    this._parent.addEventListener(ControlKit.EventType.GROUP_SIZE_CHANGE,this, 'onGroupSizeChange');
    this._parent.addEventListener(ControlKit.EventType.PANEL_SIZE_CHANGE,this, 'onPanelSizeChange');
    this._parent.addEventListener(ControlKit.EventType.WINDOW_RESIZE,    this, 'onWindowResize');

    this.addEventListener(ControlKit.EventType.GROUP_SIZE_UPDATE,this._parent,'onGroupSizeUpdate');


};

ControlKit.SubGroup.prototype = Object.create(ControlKit.AbstractGroup.prototype);

/*-------------------------------------------------------------------------------------*/

//FIXME

ControlKit.SubGroup.prototype._onHeadMouseDown = function()
{
    this._isDisabled = !this._isDisabled;this._onTrigger();

    var event = ControlKit.DocumentEventType.MOUSE_UP,
        self  = this;
    var onDocumenttMouseUp = function(){self._onTrigger();
        document.removeEventListener(event,onDocumenttMouseUp);};

    document.addEventListener(event,onDocumenttMouseUp);
};

ControlKit.SubGroup.prototype._onTrigger = function()
{
    this._updateAppearance();
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.SUBGROUP_TRIGGER,null));
};


/*-------------------------------------------------------------------------------------*/

ControlKit.SubGroup.prototype._updateAppearance = function()
{
    if(this.isDisabled())
    {
        this._wrapNode.setHeight(0);

        if(this.hasLabel())
        {
            this._headNode.setStyleClass(ControlKit.CSS.HeadInactive);
            this._indiNode.setStyleClass(ControlKit.CSS.ArrowBSubMin);
        }

    }
    else
    {
        if(this.hasMaxHeight())
        {
            this._wrapNode.setHeight(this.getMaxHeight());
        }
        else
        {
            this._wrapNode.deleteStyleProperty('height');
        }

        if(this.hasLabel())
        {
            this._headNode.setStyleClass(ControlKit.CSS.Head);
            this._indiNode.setStyleClass(ControlKit.CSS.ArrowBSubMax);
        }

    }
};

ControlKit.SubGroup.prototype.update = function(){if(this.hasMaxHeight())this._scrollBar.update();};

/*-------------------------------------------------------------------------------------*/

ControlKit.SubGroup.prototype.onComponentSelectDrag = function()
{
    this.preventSelectDrag();
};

/*-------------------------------------------------------------------------------------*/

ControlKit.SubGroup.prototype.onEnable          = function(){if(this.isDisabled())return;this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.COMPONENTS_ENABLE, null));};
ControlKit.SubGroup.prototype.onDisable         = function(){if(this.isDisabled())return;this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.COMPONENTS_DISABLE,null));};
//bubble
ControlKit.SubGroup.prototype.onGroupSizeChange = function(){this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.GROUP_SIZE_CHANGE,null));};
ControlKit.SubGroup.prototype.onGroupSizeUpdate = function(){this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.GROUP_SIZE_UPDATE,null));};
ControlKit.SubGroup.prototype.onPanelMoveEnd    = function(){this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.PANEL_MOVE_END,   null));};
ControlKit.SubGroup.prototype.onPanelSizeChange = function(){this._updateAppearance();};
ControlKit.SubGroup.prototype.onWindowResize    = function(e){this.dispatchEvent(e);};
/*-------------------------------------------------------------------------------------*/

ControlKit.SubGroup.prototype.hasLabel         = function()    {return this._headNode != null;};
ControlKit.SubGroup.prototype.addComponentNode = function(node){this._listNode.addChild(node);};
ControlKit.SubGroup.prototype.usesLabels       = function()    {return this._useLabels;};








ControlKit.Panel = function(controlKit,params)
{
    ControlKit.EventDispatcher.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    this._parent = controlKit;

    /*---------------------------------------------------------------------------------*/

    params            = params           || {};

    params.valign     = params.valign    || ControlKit.Default.PANEL_VALIGN;
    params.align      = params.align     || ControlKit.Default.PANEL_ALIGN;
    params.position   = params.position  || ControlKit.Default.PANEL_POSITION;
    params.width      = params.width     || ControlKit.Default.PANEL_WIDTH;
    params.height     = params.height    || ControlKit.Default.PANEL_HEIGHT;
    params.ratio      = params.ratio     || ControlKit.Default.PANEL_RATIO;
    params.label      = params.label     || ControlKit.Default.PANEL_LABEL;
    params.opacity    = params.opacity   || ControlKit.Default.PANEL_OPACITY;
    params.fixed      = params.fixed      === undefined ? ControlKit.Default.PANEL_FIXED      : params.fixed;
    params.enable     = params.enable     === undefined ? ControlKit.Default.PANEL_ENABLE     : params.enable;
    params.vconstrain = params.vconstrain === undefined ? ControlKit.Default.PANEL_VCONSTRAIN : params.vconstrain;

    if(params.dock)
    {
        params.dock.align     = params.dock.align     || ControlKit.Default.PANEL_DOCK.align;
        params.dock.resizable = params.dock.resizable || ControlKit.Default.PANEL_DOCK.resizable;
    }

    /*---------------------------------------------------------------------------------*/

    this._width      = Math.max(ControlKit.Default.PANEL_WIDTH_MIN,
                       Math.min(params.width,ControlKit.Default.PANEL_WIDTH_MAX));
    this._height     = params.height ?  Math.max(0,Math.min(params.height,window.innerHeight)) : null;
    this._fixed      = params.fixed;
    this._dock       = params.dock;
    this._position   = params.position;
    this._vConstrain = params.vconstrain;
    this._label      = params.label;
    this._isDisabled = !params.enable;
    this._groups     = [];

    /*---------------------------------------------------------------------------------*/

    var width    = this._width,
        isFixed  = this._fixed,
        dock     = this._dock,
        position = this._position,
        label    = this._label,
        align    = params.align,
        opacity  = params.opacity;

    /*---------------------------------------------------------------------------------*/

    var rootNode  = this._node     = new ControlKit.Node(ControlKit.NodeType.DIV),
        headNode  = this._headNode = new ControlKit.Node(ControlKit.NodeType.DIV),
        menuNode  =                  new ControlKit.Node(ControlKit.NodeType.DIV),
        lablWrap  =                  new ControlKit.Node(ControlKit.NodeType.DIV),
        lablNode  =                  new ControlKit.Node(ControlKit.NodeType.SPAN),
        wrapNode  = this._wrapNode = new ControlKit.Node(ControlKit.NodeType.DIV),
        listNode  = this._listNode = new ControlKit.Node(ControlKit.NodeType.LIST);

        rootNode.setStyleClass(ControlKit.CSS.Panel);
        headNode.setStyleClass(ControlKit.CSS.Head);
        menuNode.setStyleClass(ControlKit.CSS.Menu);
        lablWrap.setStyleClass(ControlKit.CSS.Wrap);
        lablNode.setStyleClass(ControlKit.CSS.Label);
        wrapNode.setStyleClass(ControlKit.CSS.Wrap);
        listNode.setStyleClass(ControlKit.CSS.GroupList);

        rootNode.setWidth(width);
        lablNode.setProperty('innerHTML',label);

        headNode.addChild(menuNode);
        lablWrap.addChild(lablNode);
        headNode.addChild(lablWrap);
        wrapNode.addChild(listNode);
        rootNode.addChild(headNode);
        rootNode.addChild(wrapNode);

        controlKit.getNode().addChild(rootNode);

    /*---------------------------------------------------------------------------------*/

    if(!dock)
    {

        var menuHide  = this._menuHide = new ControlKit.Node(ControlKit.NodeType.INPUT_BUTTON);
            menuHide.setStyleClass( ControlKit.CSS.MenuBtnHide);
            menuHide.addEventListener( ControlKit.NodeEventType.MOUSE_DOWN, this._onMenuHideMouseDown.bind(this));

        menuNode.addChild(menuHide);

        if(this._parent.panelsAreClosable())
        {
            var menuClose = new ControlKit.Node(ControlKit.NodeType.INPUT_BUTTON);
            menuClose.setStyleClass(ControlKit.CSS.MenuBtnClose);
            menuClose.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN, this.disable.bind(this));

            menuNode.addChild(menuClose);
        }


        if(this.hasMaxHeight()){this._addScrollWrap();}

        if(!isFixed)
        {
            if(position)
            {
                if(align == ControlKit.LayoutMode.LEFT ||
                   align == ControlKit.LayoutMode.TOP  ||
                   align == ControlKit.LayoutMode.BOTTOM)
                {
                    rootNode.setPositionGlobal(position[0],position[1]);
                }
                else
                {
                    rootNode.setPositionGlobal(window.innerWidth - width - position[0],position[1]);
                    this._position = rootNode.getPosition();
                }
            }
            else this._position = rootNode.getPosition();

            this._mouseOffset  = [0,0];

            rootNode.setStyleProperty('position','absolute');
            headNode.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,this._onHeadDragStart.bind(this));
        }
        else
        {
            if(position)
            {
                var positionX = position[0],
                    positionY = position[1];

                if(positionY != 0)rootNode.setPositionY(positionY);
                if(positionX != 0)if(align==ControlKit.LayoutMode.RIGHT)rootNode.getElement().marginRight = positionX;
                                  else rootNode.setPositionX(positionX);
            }

            rootNode.setStyleProperty('float',align);
        }
    }
    else
    {
        var dockAlignment = dock.align;

        if(dockAlignment == ControlKit.LayoutMode.LEFT ||
           dockAlignment == ControlKit.LayoutMode.RIGHT)
        {
            align = dockAlignment;
            this._height = window.innerHeight;
        }

        if(dockAlignment == ControlKit.LayoutMode.TOP ||
           dockAlignment == ControlKit.LayoutMode.BOTTOM)
        {

        }

        /*
        if(dock.resizable)
        {
            var sizeHandle = new ControlKit.Node(ControlKit.NodeType.DIV);
                sizeHandle.setStyleClass(ControlKit.CSS.SizeHandle);
                rootNode.addChild(sizeHandle);
        }
        */

        rootNode.setStyleProperty('float',align);

    }

    if(this._parent.historyIsEnabled())
    {
        var menuUndo = this._menuUndo = new ControlKit.Node(ControlKit.NodeType.INPUT_BUTTON);
            menuUndo.setStyleClass(ControlKit.CSS.MenuBtnUndo);
            menuUndo.setStyleProperty('display','none');
            menuUndo.setProperty('value',ControlKit.History.getInstance().getNumStates());
            menuNode.addChildAt(menuUndo,0);

            menuUndo.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN, this._onMenuUndoTrigger.bind(this));
            headNode.addEventListener(ControlKit.NodeEventType.MOUSE_OVER, this._onHeadMouseOver.bind(this));
            headNode.addEventListener(ControlKit.NodeEventType.MOUSE_OUT,  this._onHeadMouseOut.bind(this))
    }

    /*---------------------------------------------------------------------------------*/

    if(opacity != 1.0 && opacity != 0.0){rootNode.setStyleProperty('opacity',opacity);}

    /*---------------------------------------------------------------------------------*/

    this._parent.addEventListener(ControlKit.EventType.UPDATE_MENU,      this, 'onUpdateMenu');
    window.addEventListener(ControlKit.DocumentEventType.WINDOW_RESIZE,this._onWindowResize.bind(this));
};

ControlKit.Panel.prototype = Object.create(ControlKit.EventDispatcher.prototype);

/*---------------------------------------------------------------------------------*/

ControlKit.Panel.prototype.addGroup  = function(params)
{
    var group = new ControlKit.Group(this,params);
    this._groups.push(group);
    if(this.isDocked())this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.PANEL_SIZE_CHANGE));
    return group;
};

/*---------------------------------------------------------------------------------*/

ControlKit.Panel.prototype._onMenuHideMouseDown = function()
{
    this._isDisabled = !this._isDisabled;
    this._updateAppearance();
};

ControlKit.Panel.prototype._updateAppearance = function()
{
    var rootNode = this._node,
        headNode = this._headNode,
        menuHide = this._menuHide;

    if(this._isDisabled)
    {
        headNode.getStyle().borderBottom = 'none';

        rootNode.setHeight(headNode.getHeight());
        menuHide.setStyleClass(ControlKit.CSS.MenuBtnShow);

        this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.PANEL_HIDE,null));
    }
    else
    {
        rootNode.setHeight(headNode.getHeight() +  this._wrapNode.getHeight());
        rootNode.deleteStyleProperty('height');
        menuHide.setStyleClass(ControlKit.CSS.MenuBtnHide);
        headNode.setStyleClass(ControlKit.CSS.Head);

        this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.PANEL_SHOW,null));
    }
};

ControlKit.Panel.prototype._onHeadMouseOver   = function(){this._menuUndo.setStyleProperty('display','inline')};
ControlKit.Panel.prototype._onHeadMouseOut    = function(){this._menuUndo.setStyleProperty('display','none')};
ControlKit.Panel.prototype.onUpdateMenu       = function(){this._menuUndo.setProperty('value',ControlKit.History.getInstance().getNumStates());};

ControlKit.Panel.prototype._onMenuUndoTrigger = function(){ControlKit.History.getInstance().popState();};

/*---------------------------------------------------------------------------------*
* Panel dragging
*----------------------------------------------------------------------------------*/

ControlKit.Panel.prototype._onHeadDragStart = function()
{
    var parentNode = this._parent.getNode(),
        node       = this._node;

    var nodePos   = node.getPositionGlobal(),
        mousePos  = ControlKit.Mouse.getInstance().getPosition(),
        offsetPos = this._mouseOffset;

        offsetPos[0] = mousePos[0] - nodePos[0];
        offsetPos[1] = mousePos[1] - nodePos[1];

    var eventMouseMove = ControlKit.DocumentEventType.MOUSE_MOVE,
        eventMouseUp   = ControlKit.DocumentEventType.MOUSE_UP;

    var self = this;

    var onDrag    = function()
                    {
                        self._updatePosition();
                    },

        onDragEnd = function()
                    {
                        document.removeEventListener(eventMouseMove, onDrag,    false);
                        document.removeEventListener(eventMouseUp,   onDragEnd, false);
                        self.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.PANEL_MOVE_END,null));
                    };

    parentNode.removeChild(node);
    parentNode.addChild(   node);

    document.addEventListener(eventMouseMove, onDrag,    false);
    document.addEventListener(eventMouseUp,   onDragEnd, false);

    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.PANEL_MOVE_BEGIN,null));
};

ControlKit.Panel.prototype._updatePosition = function()
{
    var mousePos  = ControlKit.Mouse.getInstance().getPosition(),
        offsetPos = this._mouseOffset;

    var position = this._position;
        position[0] = mousePos[0] - offsetPos[0];
        position[1] = mousePos[1] - offsetPos[1];

    this._constrainHeight();
    this._constrainPosition();

    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.PANEL_MOVE,null));
};

ControlKit.Panel.prototype._onWindowResize = function()
{
    if(this.isDocked())
    {
        var dock = this._dock;

        if(dock.align == ControlKit.LayoutMode.RIGHT ||
           dock.align == ControlKit.LayoutMode.LEFT )
        {
            var windowHeight = window.innerHeight,
                listHeight   = this._listNode.getHeight(),
                headHeight   = this._headNode.getHeight();

            this._height = windowHeight;

            if((windowHeight - headHeight) > listHeight)this._scrollBar.disable();
            else this._scrollBar.enable();

            this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.PANEL_SIZE_CHANGE));
        }
    }
    else
    {
        if(!this.isFixed())this._constrainPosition();
    }

    this._constrainHeight();

    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.WINDOW_RESIZE));
};


/*---------------------------------------------------------------------------------*/

ControlKit.Panel.prototype._constrainPosition = function()
{
    var node = this._node;

    var maxX = window.innerWidth  - node.getWidth(),
        maxY = window.innerHeight - node.getHeight();

    var position    = this._position;
        position[0] = Math.max(0,Math.min(position[0],maxX));
        position[1] = Math.max(0,Math.min(position[1],maxY));

    node.setPositionGlobal(position[0],position[1]);
};

ControlKit.Panel.prototype._constrainHeight = function()
{
    if(!this._vConstrain)return;

    var hasMaxHeight  = this.hasMaxHeight(),
        hasScrollWrap = this.hasScrollWrap();

    var headNode      = this._headNode,
        wrapNode      = this._wrapNode;

    var scrollBar     = this._scrollBar;

    var panelTop      = this.isDocked() ? 0 :
                        this.isFixed()  ? 0 :
                        this._position[1];

    var panelHeight   = hasMaxHeight  ? this.getMaxHeight() :
                        hasScrollWrap ? scrollBar.getTargetNode().getHeight() :
                        wrapNode.getHeight();

    var panelBottom   = panelTop + panelHeight;
    var headHeight    = headNode.getHeight();

    var windowHeight  = window.innerHeight,
        heightDiff    = windowHeight - panelBottom - headHeight,
        heightSum;

    if(heightDiff < 0.0)
    {
        heightSum = panelHeight + heightDiff;

        if(!hasScrollWrap)
        {
            this._addScrollWrap(heightSum);
            this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.PANEL_SCROLL_WRAP_ADDED, null));
            return;
        }

        scrollBar.setWrapHeight(heightSum);
        wrapNode.setHeight(heightSum);
    }
    else
    {
        if(!hasMaxHeight && hasScrollWrap)
        {
            scrollBar.removeFromParent();
            wrapNode.addChild(this._listNode);
            wrapNode.deleteStyleProperty('height');

            this._scrollBar = null;

            this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.PANEL_SCROLL_WRAP_REMOVED, null));
        }
    }
};

/*---------------------------------------------------------------------------------*/

ControlKit.Panel.prototype.onGroupListSizeChange = function()
{
    if(this.hasScrollWrap())this._updateScrollWrap();
    this._constrainHeight();
};

ControlKit.Panel.prototype._updateScrollWrap = function()
{
    var wrapNode   = this._wrapNode,
        scrollBar  = this._scrollBar,
        height     = this.hasMaxHeight() ?
            this.getMaxHeight() : 100,
        listHeight = this._listNode.getHeight();

    wrapNode.setHeight(listHeight < height ? listHeight : height);

    scrollBar.update();

    if (!scrollBar.isValid())
    {
        scrollBar.disable();
        wrapNode.setHeight(wrapNode.getChildAt(1).getHeight());
    }
    else
    {
        scrollBar.enable();
        wrapNode.setHeight(height);
    }
};

ControlKit.Panel.prototype._addScrollWrap = function()
{
    var wrapNode = this._wrapNode,
        listNode = this._listNode,
        height   = arguments.length == 0 ?
                   this.getMaxHeight() :
                   arguments[0];

    this._scrollBar = new ControlKit.ScrollBar(wrapNode,listNode,height);
    if(this.isEnabled())wrapNode.setHeight(height);
};

ControlKit.Panel.prototype.hasScrollWrap = function()
{
    return this._scrollBar != null;
};

/*---------------------------------------------------------------------------------*/

ControlKit.Panel.prototype.preventSelectDrag = function()
{
    if(!this.hasScrollWrap())return;
    this._wrapNode.getElement().scrollTop = 0;
};

/*---------------------------------------------------------------------------------*/

ControlKit.Panel.prototype.enable  = function()
{
    this._node.setStyleProperty('display','block');
    this._isDisabled = false;
    this._updateAppearance();
};

ControlKit.Panel.prototype.disable = function()
{
    this._node.setStyleProperty('display','none');
    this._isDisabled = true;
    this._updateAppearance();
};

ControlKit.Panel.prototype.isEnabled  = function(){return !this._isDisabled;};
ControlKit.Panel.prototype.isDisabled = function(){return this._isDisabled;};

/*---------------------------------------------------------------------------------*/

ControlKit.Panel.prototype.hasMaxHeight  = function(){return this._height != null;};
ControlKit.Panel.prototype.getMaxHeight  = function(){return this._height;};

ControlKit.Panel.prototype.isDocked      = function(){return this._dock;};
ControlKit.Panel.prototype.isFixed       = function(){return this._fixed;};

/*---------------------------------------------------------------------------------*/

ControlKit.Panel.prototype.getGroups     = function(){return this._groups;};
ControlKit.Panel.prototype.getNode       = function(){return this._node;};
ControlKit.Panel.prototype.getList       = function(){return this._listNode;};

/*---------------------------------------------------------------------------------*/

ControlKit.Panel.prototype.getWidth      = function(){return this._width;};
ControlKit.Panel.prototype.getPosition   = function(){return this._position;};

ControlKit.Options = function(parentNode)
{
    this._parenNode = parentNode;

    var node     = this._node = new ControlKit.Node(ControlKit.NodeType.DIV);
    var listNode = this._listNode = new ControlKit.Node(ControlKit.NodeType.LIST);

    node.setStyleClass(ControlKit.CSS.Options);
    node.addChild(listNode);

    this._selectedIndex = null;
    this._callbackOut = function(){};

    this._unfocusable = false;

    document.addEventListener(ControlKit.DocumentEventType.MOUSE_DOWN,this._onDocumentMouseDown.bind(this));
    document.addEventListener(ControlKit.DocumentEventType.MOUSE_UP,  this._onDocumentMouseUp.bind(this));

    this.clear();
};

ControlKit.Options.prototype =
{

    _onDocumentMouseDown : function()
    {
        if(!this._unfocusable)return;
        this._callbackOut();
    },

    _onDocumentMouseUp : function()
    {
        this._unfocusable = true;
    },

    build : function(entries,selected,element,callbackSelect,callbackOut,paddingRight,areColors,colorMode)
    {
        this._clearList();

        this._parenNode.addChild(this.getNode());

        var rootNode = this._node,
            listNode = this._listNode;

        paddingRight = paddingRight || 0;

        var self = this;

        // build list
        var itemNode,entry;
        var i = -1;

        if(areColors)
        {
            colorMode = colorMode || ControlKit.ColorMode.HEX;

            listNode.setStyleClass(ControlKit.CSS.Color);

            var color,nodeColor;

            while(++i < entries.length)
            {
                entry    = entries[i];
                itemNode = listNode.addChild(new ControlKit.Node(ControlKit.NodeType.LIST_ITEM));
                color    = itemNode.addChild(new ControlKit.Node(ControlKit.NodeType.DIV));

                switch(colorMode)
                {
                    case ControlKit.ColorMode.HEX:   nodeColor = entry; break;
                    case ControlKit.ColorMode.RGB:   nodeColor = ControlKit.ColorUtil.RGB2HEX(  entry[0],entry[1],entry[2]); break;
                    case ControlKit.ColorMode.RGBfv: nodeColor = ControlKit.ColorUtil.RGBfv2HEX(entry[0],entry[1],entry[2]); break;
                    case ControlKit.ColorMode.HSV:   nodeColor = ControlKit.ColorUtil.HSV2RGB(  entry[0],entry[1],entry[2]); break;
                }

                color.getStyle().backgroundColor = nodeColor;
                color.getStyle().backgroundImage = 'linear-gradient( rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)';
                color.setProperty('innerHTML',entry);

                if(entry == selected)itemNode.setStyleClass(ControlKit.CSS.OptionsSelected);

                itemNode.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,
                    function()
                    {
                        self._selectedIndex = Array.prototype.indexOf.call(this.parentNode.children,this);
                        callbackSelect();
                    });
            }

        }
        else
        {
            listNode.deleteStyleClass();

            while(++i < entries.length)
            {
                entry = entries[i];

                itemNode = listNode.addChild(new ControlKit.Node(ControlKit.NodeType.LIST_ITEM));
                itemNode.setProperty('innerHTML',entry);
                if(entry == selected)itemNode.setStyleClass(ControlKit.CSS.OptionsSelected);

                itemNode.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,
                    function()
                    {
                        self._selectedIndex = Array.prototype.indexOf.call(this.parentNode.children,this);
                        callbackSelect();
                    });
            }
        }

        //position, set width and enable

        var elementPos    = element.getPositionGlobal(),
            elementWidth  = element.getWidth() - paddingRight,
            elementHeight = element.getHeight();

        var listWidth    = listNode.getWidth(),
            listHeight   = listNode.getHeight(),
            strokeOffset = ControlKit.Metric.STROKE_SIZE * 2;

        var paddingOptions = ControlKit.Metric.PADDING_OPTIONS;

        var width   = (listWidth < elementWidth ? elementWidth : listWidth) -strokeOffset,
            posX    = elementPos[0],
            posY    = elementPos[1]+elementHeight-paddingOptions;

        var windowWidth  = window.innerWidth,
            windowHeight = window.innerHeight;

        var rootPosX = (posX + width)      > windowWidth  ? (posX - width + elementWidth - strokeOffset)    : posX,
            rootPosY = (posY + listHeight) > windowHeight ? (posY - listHeight * 0.5 - elementHeight * 0.5) : posY;

        listNode.setWidth(width);
        rootNode.setPositionGlobal(rootPosX,rootPosY);

        this._callbackOut = callbackOut;
        this._unfocusable = false;
    },

    _clearList : function()
    {
        this._listNode.removeAllChildren();
        this._listNode.deleteStyleProperty('width');
        this._selectedIndex  = null;
        this._build          = false;
    },

    clear : function()
    {
        this._clearList();
        this._callbackOut = function(){};
        this._parenNode.removeChild(this.getNode());

    },

    isBuild     : function(){return this._build;},
    getNode     : function(){return this._node; },
    getSelectedIndex : function(){return this._selectedIndex;}
};

ControlKit.Options.init        = function(parentNode){return ControlKit.Options._instance = new ControlKit.Options(parentNode);};
ControlKit.Options.getInstance = function(){return ControlKit.Options._instance;};
ControlKit.NumberInput_Internal = function(stepValue,decimalPlaces,onBegin,onChange,onFinish)
{
    ControlKit.EventDispatcher.apply(this,null);

    /*---------------------------------------------------------------------------------*/

    this._value        = 0;
    this._valueStep    = stepValue;
    this._valueDPlace  = decimalPlaces + 1;

    /*---------------------------------------------------------------------------------*/

    this._onBegin      = onBegin  || function(){};
    this._onChange     = onChange || function(){};
    this._onFinish     = onFinish || function(){};


    this._prevKeyCode = null;

    /*---------------------------------------------------------------------------------*/

    var input = this._input = new ControlKit.Node(ControlKit.NodeType.INPUT_TEXT);
    input.setProperty('value',this._value);

    /*---------------------------------------------------------------------------------*/

    input.addEventListener(ControlKit.NodeEventType.KEY_DOWN, this._onInputKeyDown.bind(this));
    input.addEventListener(ControlKit.NodeEventType.KEY_UP,   this._onInputKeyUp.bind(this));
    input.addEventListener(ControlKit.NodeEventType.CHANGE,   this._onInputChange.bind(this));
};

ControlKit.NumberInput_Internal.prototype = Object.create(ControlKit.EventDispatcher.prototype);

ControlKit.NumberInput_Internal.prototype._onInputKeyDown = function(e)
{
    var step       = (e.shiftKey ? ControlKit.Preset.NUMBER_INPUT_SHIFT_MULTIPLIER : 1) * this._valueStep,
        keyCode    =  e.keyCode;

    if( keyCode == 38 ||
        keyCode == 40 )
    {
        e.preventDefault();

        var multiplier = keyCode == 38 ? 1.0 : -1.0;
        this._value   += (step * multiplier);

        this._onBegin();
        this._onChange();
        this._format();
    }
};

ControlKit.NumberInput_Internal.prototype._onInputKeyUp = function(e)
{
    var keyCode = e.keyCode;


    if( e.shiftKey    || keyCode == 38  ||
        keyCode == 40 || keyCode == 190 ||
        keyCode == 8  || keyCode == 39  ||
        keyCode == 37 || keyCode == 189)
    {
        this._prevKeyCode = keyCode;
        return;
    }

    if(this._prevKeyCode == 189 && keyCode == 48){return;} //-0
    if(this._prevKeyCode == 190 && keyCode == 48){return;} //0.0

    this._validate();
    this._format();
};

ControlKit.NumberInput_Internal.prototype._onInputChange = function(e)
{
    this._validate();
    this._format();
    this._onFinish();
};

ControlKit.NumberInput_Internal.prototype._validate = function()
{
    if(this.inputIsNumber())
    {
        var input = this._getInput();
        if(input != '-')this._value = Number(input);
        this._onChange();
        return;
    }

    this._setOutput(this._value);
};

ControlKit.NumberInput_Internal.prototype.inputIsNumber = function()
{
    var value = this._getInput();


    //TODO:FIX
    if(value == '-' || value == '0')return true;
    return /^\s*-?[0-9]\d*(\.\d{1,1000000})?\s*$/.test(value);
};

ControlKit.NumberInput_Internal.prototype._format = function()
{
    var string = this._value.toString(),
        index  = string.indexOf('.');


    if(index > 0)
    {
        string = string.slice(0,index + this._valueDPlace);
    }

    this._setOutput(string);
};

ControlKit.NumberInput_Internal.prototype._setOutput = function(n){this._input.setProperty('value',n);};
ControlKit.NumberInput_Internal.prototype._getInput  = function() {return this._input.getProperty('value')};
ControlKit.NumberInput_Internal.prototype.getValue   = function() {return this._value;};
ControlKit.NumberInput_Internal.prototype.setValue   = function(n){this._value = n;this._format();};
ControlKit.NumberInput_Internal.prototype.getNode    = function() {return this._input;};
ControlKit.Slider_Internal = function(parentNode,onBegin,onChange,onFinish)
{
    this._bounds   = [0,1];
    this._value    = 0;
    this._interpl  = 0;
    this._focus    = false;

    /*---------------------------------------------------------------------------------*/

    this._onBegin    = onBegin  || function(){};
    this._onChange   = onChange || function(){};
    this._onFinish   = onFinish || function(){};

    /*---------------------------------------------------------------------------------*/

    var wrapNode = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.SliderWrap);
    parentNode.addChild(wrapNode);

    var slot   = this._slot   = {node:    new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.SliderSlot),
                                 offsetX: 0,
                                 width:   0,
                                 padding: 3};

    var handle = this._handle = {node    : new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.SliderHandle),
                                 width   : 0,
                                 dragging: false};

    wrapNode.addChild(slot.node);
    slot.node.addChild(handle.node);

    slot.offsetX = slot.node.getPositionGlobalX();
    slot.width   = Math.floor(slot.node.getWidth() - slot.padding * 2) ;

    handle.node.setWidth(handle.width);

    slot.node.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,this._onSlotMouseDown.bind(this));
    slot.node.addEventListener(ControlKit.NodeEventType.MOUSE_UP,  this._onSlotMouseUp.bind(this));

    document.addEventListener(ControlKit.DocumentEventType.MOUSE_MOVE,this._onDocumentMouseMove.bind(this));
    document.addEventListener(ControlKit.DocumentEventType.MOUSE_UP,  this._onDocumentMouseUp.bind(this));
};

ControlKit.Slider_Internal.prototype =
{
    _onDocumentMouseMove : function(e)
    {
        if(!this._handle.dragging)return;

        this._update();
        this._onChange();
    },

    _onDocumentMouseUp : function(e)
    {
        if(this._handle.dragging)this._onFinish();
        this._handle.dragging = false;
    },

    _onSlotMouseDown : function()
    {
        this._onBegin();
        this._focus = true;
        this._handle.dragging = true;
        this._handle.node.getElement().focus();
        this._update();
    },

    _onSlotMouseUp : function()
    {
        if(this._focus)
        {
            var handle = this._handle;
            if(handle.dragging)this._onFinish();
            handle.dragging = false;
        }

        this._focus = false;
    },

    _update : function()
    {
        var mx = ControlKit.Mouse.getInstance().getX(),
            sx = this._slot.offsetX,
            sw = this._slot.width,
            px = (mx < sx) ? 0 : (mx > (sx + sw)) ? sw : (mx - sx);

        this._handle.node.setWidth(Math.round(px));
        this._intrpl = px / sw;
        this._interpolateValue();
    },

    //FIXME
    _updateHandle : function()
    {
        var slotWidth   = this._slot.width,
            handleWidth = Math.round(this._intrpl * slotWidth);

        this._handle.node.setWidth(Math.min(handleWidth,slotWidth));
    },

    _interpolateValue : function()
    {
        var intrpl = this._intrpl;
        this._value = this._bounds[0]*(1.0-intrpl)+this._bounds[1]*intrpl;
    },

    resetOffset : function(){var slot = this._slot;
                                 slot.offsetX = slot.node.getPositionGlobalX();
                                 slot.width   = Math.floor(slot.node.getWidth() - slot.padding * 2)},

    setBoundMin : function(value)
    {
        var bounds = this._bounds;
        if(value >= bounds[1])return;

        bounds[0] = value;
        this._interpolateValueRelative();
        this._updateHandle();
    },

    setBoundMax : function(value)
    {
        var bounds = this._bounds;
        if(value <= bounds[0])return;

        bounds[1] = value;
        this._interpolateValueRelative();
        this._updateHandle();
    },

    _interpolateValueRelative : function()
    {
        var boundsMin  = this._bounds[0],
            boundsMax  = this._bounds[1],
            prevIntrpl = Math.abs((this._value - boundsMin) / (boundsMin - boundsMax));

        this._value  = boundsMin*(1.0-prevIntrpl) + boundsMax*prevIntrpl;
        this._intrpl = Math.abs((this._value - boundsMin) / (boundsMin - boundsMax));
    },

    setValue    : function(value)
    {
        var boundsMin = this._bounds[0],
            boundsMax = this._bounds[1];

        if(value < boundsMin || value > boundsMax)return;
        this._intrpl = Math.abs((value-boundsMin) / (boundsMin - boundsMax));
        this._updateHandle();
        this._value  = value;
    },


    getValue : function(){return this._value;}
};
ControlKit.Plotter = function(parent,object,value,params)
{
    ControlKit.SVGComponent.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    params            = params            || {};
    params.lineWidth  = params.lineWidth  || 2;
    params.lineColor  = params.lineColor  || [255,255,255];

    /*---------------------------------------------------------------------------------*/

    var lineWidth = this._lineWidth = params.lineWidth;
    var lineColor = params.lineColor;

    /*---------------------------------------------------------------------------------*/

    var grid = this._grid = this._svgRoot.appendChild(this._createSVGObject('path'));
        grid.style.stroke = 'rgb(26,29,31)';


    var path = this._path = this._svgRoot.appendChild(this._createSVGObject('path'));
        path.style.stroke      = 'rgb('+lineColor[0]+','+lineColor[1]+','+lineColor[2]+')';
        path.style.strokeWidth = lineWidth ;
        path.style.fill        = 'none';



};

ControlKit.Plotter.prototype = Object.create(ControlKit.SVGComponent.prototype);


ControlKit.PresetBtn = function(parentNode)
{
    var btnNode  = this._btnNode  = new ControlKit.Node(ControlKit.NodeType.INPUT_BUTTON);
    var indiNode = this._indiNode = new ControlKit.Node(ControlKit.NodeType.DIV);

    this._onActive = function(){};
    this._onDeactive = function(){};
    this._isActive   = false;

    btnNode.setStyleClass(ControlKit.CSS.PresetBtn);
    btnNode.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,this._onMouseDown.bind(this));

    btnNode.addChild(indiNode);
    parentNode.addChildAt(btnNode,0);

};

ControlKit.PresetBtn.prototype =
{
    _onMouseDown : function()
    {
        var isActive = this._isActive = !this._isActive;

        if(isActive)
        {
            this._btnNode.setStyleClass(ControlKit.CSS.PresetBtnActive);
            this._onActive();
        }
        else
        {
            this._btnNode.setStyleClass(ControlKit.CSS.PresetBtn);
            this._onDeactive();
        }
    },

    setOnActive   : function(func){this._onActive = func;},
    setOnDeactive : function(func){this._onDeactive = func;},

    deactivate : function(){this._active = false;this._btnNode.setStyleClass(ControlKit.CSS.PresetBtn);}
};



ControlKit.Output = function(parent,object,value,params)
{
    ControlKit.ObjectComponent.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    params            = params        || {};
    params.height     = params.height || ControlKit.Default.OUTPUT_HEIGHT;
    params.wrap       = params.wrap   === undefined ?
                        ControlKit.Default.OUTPUT_WRAP :
                        params.wrap;
    params.update     = params.update === undefined ?
                        ControlKit.Default.OUTPUT_UPDATE :
                        params.update;

    /*---------------------------------------------------------------------------------*/

    this._wrap = params.wrap;

    this._update = params.update;

    var textArea = this._textArea = new ControlKit.Node(ControlKit.NodeType.TEXTAREA),
        wrapNode = this._wrapNode,
        rootNode = this._node;

        textArea.setProperty('readOnly',true);
        wrapNode.addChild(textArea);

        textArea.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,this._onInputDragStart.bind(this));
        this.addEventListener(ControlKit.EventType.INPUT_SELECT_DRAG,this._parent,'onComponentSelectDrag');

    /*---------------------------------------------------------------------------------*/

    if(params.height)
    {
        var textAreaWrap = new ControlKit.Node(ControlKit.NodeType.DIV);
            textAreaWrap.setStyleClass(ControlKit.CSS.TextAreaWrap);
            textAreaWrap.addChild(textArea);
            wrapNode.addChild(textAreaWrap);


        //FIXME
        var height  = this._height = params.height,
            padding = 4;

            textArea.setHeight(Math.max(height + padding  ,ControlKit.Metric.COMPONENT_MIN_HEIGHT));
            wrapNode.setHeight(textArea.getHeight());
            rootNode.setHeight(wrapNode.getHeight() + padding);

        this._scrollBar = new ControlKit.ScrollBar(textAreaWrap,textArea,height - padding)
    }

    if(params.wrap)textArea.setStyleProperty('white-space','pre-wrap');

    /*---------------------------------------------------------------------------------*/

    this._prevString = '';
    this._prevScrollHeight = -1;
    this._setValue();
};

ControlKit.Output.prototype = Object.create(ControlKit.ObjectComponent.prototype);

/*---------------------------------------------------------------------------------*/

//Override in subclass
ControlKit.Output.prototype._setValue     = function(){};
ControlKit.Output.prototype.onValueUpdate = function(){this._setValue();};
ControlKit.Output.prototype.update        = function(){if(!this._update)this._setValue();};

/*---------------------------------------------------------------------------------*/

//Prevent chrome select drag
ControlKit.Output.prototype._onInputDragStart = function()
{
    var eventMove = ControlKit.DocumentEventType.MOUSE_MOVE,
        eventUp   = ControlKit.DocumentEventType.MOUSE_UP;

    var event = ControlKit.EventType.INPUT_SELECT_DRAG;

    var self  = this;

    var onDrag = function()
        {
            self.dispatchEvent(new ControlKit.Event(this,event,null));
        },

        onDragFinish = function()
        {
            self.dispatchEvent(new ControlKit.Event(this,event,null));

            document.removeEventListener(eventMove, onDrag,       false);
            document.removeEventListener(eventMove, onDragFinish, false);
        };

    this.dispatchEvent(new ControlKit.Event(this,event,null));

    document.addEventListener(eventMove, onDrag,       false);
    document.addEventListener(eventUp,   onDragFinish, false);
};

ControlKit.FunctionPlotType =
{
    IMPLICIT     : 'implicit',
    NON_IMPLICIT : 'nonImplicit'
};
ControlKit.StringInput = function(parent,object,value,params)
{
    ControlKit.ObjectComponent.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    params          = params || {};
    params.onChange = params.onChange || this._onChange;
    params.onFinish = params.onFinish || this._onFinish;
    params.presets  = params.presets  || ControlKit.Default.STRING_INPUT_PRESET;

    /*---------------------------------------------------------------------------------*/

    this._onChange   = params.onChange;
    this._onFinish   = params.onFinish;

    this._presetsKey = params.presets;

    /*---------------------------------------------------------------------------------*/

    var input = this._input = new ControlKit.Node(ControlKit.NodeType.INPUT_TEXT);

    var wrapNode = this._wrapNode;

    if(!this._presetsKey)
    {
        wrapNode.addChild(input);
    }
    else
    {
        var inputWrap = new ControlKit.Node(ControlKit.NodeType.DIV);
        inputWrap.setStyleClass(ControlKit.CSS.WrapInputWPreset);

        wrapNode.addChild(inputWrap);
        inputWrap.addChild(input);

        var presets   = this._object[this._presetsKey],
            options   = ControlKit.Options.getInstance(),
            presetBtn = new ControlKit.PresetBtn(this._wrapNode);

        var onPresetDeactivate = function(){options.clear();presetBtn.deactivate();};

        var self = this;
        var onPresetActivate = function()
        {
            options.build(presets,
                          input.getProperty('value'),
                          input,
                          function()
                          {
                              input.setProperty('value',presets[options.getSelectedIndex()]);
                              self.pushHistoryState();
                              self.applyValue();
                          },
                          onPresetDeactivate,
                          ControlKit.Metric.PADDING_PRESET,
                          false);
        };

        presetBtn.setOnActive(onPresetActivate);
        presetBtn.setOnDeactive(onPresetDeactivate)
    }

    input.setProperty('value',this._object[this._key]);

    input.addEventListener(ControlKit.NodeEventType.KEY_UP, this._onInputKeyUp.bind(this));
    input.addEventListener(ControlKit.NodeEventType.CHANGE, this._onInputChange.bind(this));

    input.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN, this._onInputDragStart.bind(this));
    this.addEventListener(ControlKit.EventType.INPUT_SELECT_DRAG,this._parent,'onComponentSelectDrag');

    /*---------------------------------------------------------------------------------*/
};

ControlKit.StringInput.prototype = Object.create(ControlKit.ObjectComponent.prototype);

ControlKit.StringInput.prototype._onInputKeyUp  = function(e)
{
    if(this._keyIsChar(e.keyCode))this.pushHistoryState();
    this.applyValue();
    this._onChange();
};

ControlKit.StringInput.prototype._onInputChange = function(e)
{
    if(this._keyIsChar(e.keyCode))this.pushHistoryState();
    this.applyValue();
    this._onFinish();
};

//TODO: Finish check
ControlKit.StringInput.prototype._keyIsChar = function(keyCode)
{
    return keyCode != 17 &&
           keyCode != 18 &&
           keyCode != 20 &&
           keyCode != 37 &&
           keyCode != 38 &&
           keyCode != 39 &&
           keyCode != 40 &&
           keyCode != 16;
};


ControlKit.StringInput.prototype.applyValue = function()
{
    this._object[this._key] = this._input.getProperty('value');
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.VALUE_UPDATED,null));
};

ControlKit.StringInput.prototype.onValueUpdate = function(e)
{
    if(e.data.origin == this)return;
    this._input.setProperty('value',this._object[this._key]);
};

/*---------------------------------------------------------------------------------*/

//Prevent chrome select drag
ControlKit.StringInput.prototype._onInputDragStart = function()
{
    var eventMove = ControlKit.DocumentEventType.MOUSE_MOVE,
        eventUp   = ControlKit.DocumentEventType.MOUSE_UP;

    var event = ControlKit.EventType.INPUT_SELECT_DRAG;

    var self  = this;

    var onDrag = function()
        {
            self.dispatchEvent(new ControlKit.Event(this,event,null));
        },

        onDragFinish = function()
        {
            self.dispatchEvent(new ControlKit.Event(this,event,null));

            document.removeEventListener(eventMove, onDrag,       false);
            document.removeEventListener(eventMove, onDragFinish, false);
        };

    this.dispatchEvent(new ControlKit.Event(this,event,null));

    document.addEventListener(eventMove, onDrag,       false);
    document.addEventListener(eventUp,   onDragFinish, false);
};



ControlKit.NumberInput = function(parent,object,value,params)
{
    ControlKit.ObjectComponent.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    params          = params || {};
    params.onChange = params.onChange || this._onChange;
    params.onFinish = params.onFinish || this._onFinish;
    params.dp       = params.dp       || ControlKit.Default.NUMBER_INPUT_DP;
    params.step     = params.step     || ControlKit.Default.NUMBER_INPUT_STEP;
    params.presets  = params.presets  || ControlKit.Default.NUMBER_INPUT_PRESET;

    /*---------------------------------------------------------------------------------*/

    this._onChange    = params.onChange;
    this._onFinish    = params.onFinish;

    this._presetsKey  = params.presets;

    /*---------------------------------------------------------------------------------*/

    var input = this._input = new ControlKit.NumberInput_Internal(params.step,
                                                                  params.dp,
                                                                  null,
                                                                  this._onInputChange.bind(this),
                                                                  this._onInputFinish.bind(this));

    var wrapNode = this._wrapNode;

    if(!this._presetsKey)
    {
        wrapNode.addChild(input.getNode());
    }
    else
    {
        var inputWrap = new ControlKit.Node(ControlKit.NodeType.DIV);
            inputWrap.setStyleClass(ControlKit.CSS.WrapInputWPreset);

        wrapNode.addChild(inputWrap);
        inputWrap.addChild(input.getNode());

        var presets = this._object[this._presetsKey];

        var options   = ControlKit.Options.getInstance();
        var presetBtn = this._presetBtn = new ControlKit.PresetBtn(this._wrapNode);

        var onPresetDeactivate = function(){options.clear();presetBtn.deactivate();};

        var self = this;
        var onPresetActivate = function()
        {
            options.build(presets,input.getValue(),input.getNode(),
                          function(){input.setValue(presets[options.getSelectedIndex()]);
                                     self.applyValue();},
                          onPresetDeactivate,ControlKit.Metric.PADDING_PRESET,
                          false);
        };

        presetBtn.setOnActive(onPresetActivate);
        presetBtn.setOnDeactive(onPresetDeactivate)
    }

    input.getNode().addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,   this._onInputDragStart.bind(this));
    this.addEventListener(ControlKit.EventType.INPUT_SELECT_DRAG,this._parent,'onComponentSelectDrag');


    input.setValue(this._object[this._key]);
};

ControlKit.NumberInput.prototype = Object.create(ControlKit.ObjectComponent.prototype);

ControlKit.NumberInput.prototype._onInputChange = function(){this.applyValue();this._onChange();};
ControlKit.NumberInput.prototype._onInputFinish = function(){this.applyValue();this._onFinish();};

ControlKit.NumberInput.prototype.applyValue = function()
{
    this.pushHistoryState();
    this._object[this._key] = this._input.getValue();
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.VALUE_UPDATED,null));
};


ControlKit.NumberInput.prototype.onValueUpdate = function(e)
{
    if(e.data.origin == this)return;
    this._input.setValue(this._object[this._key]);
};

//Prevent chrome select drag
ControlKit.NumberInput.prototype._onInputDragStart = function()
{
    var eventMove = ControlKit.DocumentEventType.MOUSE_MOVE,
        eventUp   = ControlKit.DocumentEventType.MOUSE_UP;

    var event = ControlKit.EventType.INPUT_SELECT_DRAG;

    var self  = this;

    var onDrag       = function()
        {
            self.dispatchEvent(new ControlKit.Event(this,event,null));
        },

        onDragFinish = function()
        {
            self.dispatchEvent(new ControlKit.Event(this,event,null));

            document.removeEventListener(eventMove, onDrag,       false);
            document.removeEventListener(eventMove, onDragFinish, false);
        };

    this.dispatchEvent(new ControlKit.Event(this,event,null));

    document.addEventListener(eventMove, onDrag,       false);
    document.addEventListener(eventUp,   onDragFinish, false);
};
ControlKit.Button = function(parent,label,onPress,params)
{
    params       = params       || {};
    params.label = params.label || ControlKit.Default.BUTTON_LABEL;

    ControlKit.Component.apply(this,[parent,params.label]);

    var input = new ControlKit.Node(ControlKit.NodeType.INPUT_BUTTON);

    onPress = onPress || function(){};

    input.setStyleClass(ControlKit.CSS.Button);
    input.setProperty('value',label);
    input.addEventListener(ControlKit.NodeEventType.ON_CLICK,
                           function()
                           {
                               onPress();
                               this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.VALUE_UPDATED));
                           }.bind(this));

    this._wrapNode.addChild(input);
};

ControlKit.Button.prototype = Object.create(ControlKit.Component.prototype);

ControlKit.Range = function(parent,object,value,params)
{
    ControlKit.ObjectComponent.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    params          = params          || {};
    params.onChange = params.onChange || this._onChange;
    params.onFinish = params.onFinish || this._onFinish;

    params.step     = params.step || ControlKit.Default.RANGE_STEP;
    params.dp       = params.dp   || ControlKit.Default.RANGE_DP;

    /*---------------------------------------------------------------------------------*/

    this._onChange  = params.onChange;
    this._onFinish  = params.onFinish;

    var step = this._step = params.step,
        dp   = this._dp   = params.dp;

    /*---------------------------------------------------------------------------------*/

    //FIXME: history push pop

    var lablMinNode = new ControlKit.Node(ControlKit.NodeType.DIV);
    var inputMin    = this._inputMin = new ControlKit.NumberInput_Internal(step,dp,
                                                                           this.pushHistoryState.bind(this),
                                                                           this._onInputMinChange.bind(this),
                                                                           this._onInputMinFinish.bind(this));

    var lablMaxNode = new ControlKit.Node(ControlKit.NodeType.DIV);
    var inputMax    = this._inputMax = new ControlKit.NumberInput_Internal(step,dp,
                                                                           this.pushHistoryState.bind(this),
                                                                           this._onInputMaxChange.bind(this),
                                                                           this._onInputMaxFinish.bind(this));

    /*---------------------------------------------------------------------------------*/

    var wrapLablMin  = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.Wrap),
        wrapInputMin = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.Wrap),
        wrapLablMax  = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.Wrap),
        wrapInputMax = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.Wrap);


        lablMinNode.setStyleClass(ControlKit.CSS.Label).setProperty('innerHTML','MIN');
        lablMaxNode.setStyleClass(ControlKit.CSS.Label).setProperty('innerHTML','MAX');

    /*---------------------------------------------------------------------------------*/

    var values = this._object[this._key];

    inputMin.setValue(values[0]);
    inputMax.setValue(values[1]);

    /*---------------------------------------------------------------------------------*/

    var wrapNode = this._wrapNode;

        wrapLablMin.addChild(lablMinNode);
        wrapInputMin.addChild(inputMin.getNode());
        wrapLablMax.addChild(lablMaxNode);
        wrapInputMax.addChild(inputMax.getNode());

        wrapNode.addChild(wrapLablMin);
        wrapNode.addChild(wrapInputMin);
        wrapNode.addChild(wrapLablMax);
        wrapNode.addChild(wrapInputMax);
};

ControlKit.Range.prototype = Object.create(ControlKit.ObjectComponent.prototype);

/*---------------------------------------------------------------------------------*/

ControlKit.Range.prototype._onInputChange = function()
{
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.VALUE_UPDATED,null));
    this._onChange();
};

ControlKit.Range.prototype._onInputFinish = function()
{
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.VALUE_UPDATED,null));
    this._onFinish();
};

/*---------------------------------------------------------------------------------*/

ControlKit.Range.prototype._updateValueMin = function()
{
    var values     = this._object[this._key];

    var inputMin   = this._inputMin,
        inputValue = inputMin.getValue();

    if(inputValue >= this._inputMax.getValue()){inputMin.setValue(values[0]);return;}
    values[0] = inputValue;

};

ControlKit.Range.prototype._updateValueMax = function()
{
    var values     = this._object[this._key];

    var inputMax   = this._inputMax,
        inputValue = inputMax.getValue();

    if(inputValue <= this._inputMin.getValue()){inputMax.setValue(values[1]);return;}
    values[1] = inputValue;
};

/*---------------------------------------------------------------------------------*/

ControlKit.Range.prototype.onValueUpdate = function(e)
{
    if(e.data.origin == this)return;

    if(e.data.origin == null)
    {
        //console.log('undo: ' + ControlKit.History.getInstance().getState(this._object,this._key));
    }

    //console.log(ControlKit.History.getInstance().getState(this._object,this._key));

    var values = this._object[this._key];

    this._inputMin.setValue(this._object[this._key][0]);
    this._inputMax.setValue(this._object[this._key][1]);
};


ControlKit.Range.prototype._onInputMinChange = function(){this._updateValueMin();this._onInputChange();};
ControlKit.Range.prototype._onInputMinFinish = function(){this._updateValueMin();this._onInputFinish();};
ControlKit.Range.prototype._onInputMaxChange = function(){this._updateValueMax();this._onInputChange();};
ControlKit.Range.prototype._onInputMaxFinish = function(){this._updateValueMax();this._onInputFinish();};

ControlKit.Checkbox = function(parent,object,value,params)
{
    ControlKit.ObjectComponent.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    params = params || {};
    params.onChange = params.onChange || this._onChange;
    params.onFinish = params.onFinish || this._onFinish;

    /*---------------------------------------------------------------------------------*/

    this._onChange = params.onChange;
    this._onFinish = params.onFinish;

    var input = this._input = new ControlKit.Node(ControlKit.NodeType.INPUT_CHECKBOX);

    input.setProperty('checked',this._object[this._key]);
    input.addEventListener(ControlKit.NodeEventType.CHANGE,this._onInputChange.bind(this));

    this._wrapNode.addChild(this._input);
};

ControlKit.Checkbox.prototype = Object.create(ControlKit.ObjectComponent.prototype);

ControlKit.Checkbox.prototype.applyValue = function()
{
    this.pushHistoryState();

    var obj = this._object,key = this._key;
    obj[key] = !obj[key];

    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.VALUE_UPDATED,null));
};

ControlKit.Checkbox.prototype._onInputChange = function()
{
    this.applyValue();
    this._onChange();
};

ControlKit.Checkbox.prototype.onValueUpdate = function(e)
{
    if(e.data.origin == this)return;
    this._input.setProperty('checked',this._object[this._key]);
};
ControlKit.Slider = function(parent,object,value,range,params)
{
    /*---------------------------------------------------------------------------------*/

    params          = params          || {};
    params.label    = params.label    || value;

    /*---------------------------------------------------------------------------------*/

    ControlKit.ObjectComponent.apply(this,[parent,object,range,params]);

    this._values  = this._object[this._key];
    this._targetKey = value;

    /*---------------------------------------------------------------------------------*/

    params.step     = params.step     || ControlKit.Default.SLIDER_STEP;
    params.dp       = params.dp       || ControlKit.Default.SLIDER_DP;
    params.onChange = params.onChange || this._onChange;
    params.onFinish = params.onFinish || this._onFinish;


    /*---------------------------------------------------------------------------------*/

    this._step     = params.step;
    this._onChange = params.onChange;
    this._onFinish = params.onFinish;
    this._dp       = params.dp;

    /*---------------------------------------------------------------------------------*/

    var values    = this._values,
        obj       = this._object,
        targetKey = this._targetKey;

    var wrapNode  = this._wrapNode;
        wrapNode.setStyleClass(ControlKit.CSS.WrapSlider);

    var slider = this._slider = new ControlKit.Slider_Internal(wrapNode,
                                                               this._onSliderBegin.bind(this),
                                                               this._onSliderMove.bind(this),
                                                               this._onSliderEnd.bind(this));

    slider.setBoundMin(values[0]);
    slider.setBoundMax(values[1]);
    slider.setValue(obj[targetKey]);

    /*---------------------------------------------------------------------------------*/

    var input  = this._input = new ControlKit.NumberInput_Internal(this._step,
                                                                   this._dp,
                                                                   null,
                                                                   this._onInputChange.bind(this),
                                                                   this._onInputChange.bind(this));

    input.setValue(obj[targetKey]);

    wrapNode.addChild(input.getNode());

    /*---------------------------------------------------------------------------------*/

    this._parent.addEventListener(ControlKit.EventType.PANEL_MOVE_END,    this, 'onPanelMoveEnd');
    this._parent.addEventListener(ControlKit.EventType.GROUP_SIZE_CHANGE, this, 'onGroupWidthChange');
    this._parent.addEventListener(ControlKit.EventType.WINDOW_RESIZE,     this, 'onWindowResize');
};

ControlKit.Slider.prototype = Object.create(ControlKit.ObjectComponent.prototype);

/*---------------------------------------------------------------------------------*/


ControlKit.Slider.prototype.pushHistoryState = function()
{
    var obj = this._object,
        key = this._targetKey;
    ControlKit.History.getInstance().pushState(obj,key,obj[key]);
};

/*---------------------------------------------------------------------------------*/


ControlKit.Slider.prototype._onSliderBegin  = function(){this.pushHistoryState();};

ControlKit.Slider.prototype._onSliderMove = function()
{
    this.applyValue();
    this._updateValueField();
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.VALUE_UPDATED,null));
    this._onChange();
};

ControlKit.Slider.prototype._onSliderEnd = function()
{
    this.applyValue();
    this._updateValueField();
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.VALUE_UPDATED,null));
    this._onFinish();
};

ControlKit.Slider.prototype._onInputChange = function()
{
    var input = this._input,
        valueMin = this._values[0],
        valueMax = this._values[1];

    if(input.getValue() >= valueMax)input.setValue(valueMax);
    if(input.getValue() <= valueMin)input.setValue(valueMin);

    var value = input.getValue();

    this._slider.setValue(value);
    this._object[this._targetKey] = value;
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.VALUE_UPDATED,null));
    this._onFinish();
};

ControlKit.Slider.prototype.applyValue = function()
{
    var value = this._slider.getValue();
    this._object[this._targetKey] = value;
    this._input.setValue(value);
};

//TODO:FIX ME
ControlKit.Slider.prototype.onValueUpdate = function(e)
{
    var origin = e.data.origin;

    if(origin == this)return;

    var slider = this._slider;

    if(!(origin instanceof ControlKit.Slider))
    {
        var values = this._values;

        //TODO: FIX ME!
        if(origin instanceof ControlKit.Range)
        {
            slider.setBoundMin(values[0]);
            slider.setBoundMax(values[1]);


            //slider.setValue(this._object[this._targetKey]);
            //this._slider.updateInterpolatedValue();
            this.applyValue();
        }
        else
        {
            slider.setBoundMin(values[0]);
            slider.setBoundMax(values[1]);
            slider.setValue(this._object[this._targetKey]);
            this.applyValue();
        }
    }
    else
    {
        slider.setValue(this._object[this._targetKey]);
        this.applyValue();
    }
};


ControlKit.Slider.prototype._updateValueField  = function(){this._input.setValue(this._slider.getValue());};

ControlKit.Slider.prototype.onPanelMoveEnd     =
ControlKit.Slider.prototype.onGroupWidthChange =
ControlKit.Slider.prototype.onWindowResize     = function(){this._slider.resetOffset();};

ControlKit.Select = function(parent,object,value,params)
{
    ControlKit.ObjectComponent.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    params          = params || {};
    params.onChange = params.onChange || this._onChange;
    params.onFinish = params.onFinish || this._onFinish;

    /*---------------------------------------------------------------------------------*/

    this._onChange    = params.onChange;
    this._onFinish    = params.onFinish;

    var obj    = this._object,
        key    = this._key;

    var targetKey = this._targetKey = params.target,
        values    = this._values = obj[key];

    /*---------------------------------------------------------------------------------*/

    this._selected  = null;

    var select  = this._select = new ControlKit.Node(ControlKit.NodeType.INPUT_BUTTON);
        select.setStyleClass(ControlKit.CSS.Select);
        select.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,this._onSelectTrigger.bind(this));

    if(this._hasTarget())
    {
        var targetObj = obj[targetKey] || '';

        var i = -1;
        while(++i < values.length){if(targetObj == values[i])this._selected = values[i];}
        select.setProperty('value',targetObj.toString().length > 0 ? targetObj : values[0]);
    }
    else{ select.setProperty('value',params.selected ? values[params.selected] :  'Choose ...'); }

    this._wrapNode.addChild(select);

    /*---------------------------------------------------------------------------------*/

    var kit = ControlKit.getKitInstance();
    kit.addEventListener(ControlKit.EventType.TRIGGER_SELECT,   this,'onSelectTrigger');
    this.addEventListener(ControlKit.EventType.SELECT_TRIGGERED,kit, 'onSelectTriggered');

};

ControlKit.Select.prototype = Object.create(ControlKit.ObjectComponent.prototype);

ControlKit.Select.prototype.onSelectTrigger = function (e)
{
    if (e.data.origin == this) {

        this._active = !this._active;
        this._updateAppearance();

        if (this._active){this._buildOptions();}
        else{ControlKit.Options.getInstance().clear();}

        return;
    }

    this._active = false;
    this._updateAppearance();
};

ControlKit.Select.prototype._buildOptions = function()
{
    var options = ControlKit.Options.getInstance();

    var onSelect    = function()
                      {
                          this.applyValue();
                          this._active = false;
                          this._updateAppearance();
                          this._onChange(options.getSelectedIndex());
                          options.clear();


                      }.bind(this);

    var onSelectOut = function()
                      {
                          this._active = false;
                          this._updateAppearance();
                          options.clear();

                      }.bind(this);


    options.build(this._values,this._selected,this._select,onSelect,onSelectOut,false);

};


ControlKit.Select.prototype.applyValue = function()
{
    var index    = ControlKit.Options.getInstance().getSelectedIndex(),
        selected = this._selected = this._values[index];

    if(this._hasTarget())
    {
        this.pushHistoryState();
        this._object[this._targetKey] = selected;

    }

    this._select.setProperty('value',selected);
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.VALUE_UPDATED,null));
};

ControlKit.Select.prototype.pushHistoryState = function()
{
    var obj = this._object,
        key = this._targetKey;

    ControlKit.History.getInstance().pushState(obj,key,obj[key]);
};

ControlKit.Select.prototype._onSelectTrigger = function()
{
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.SELECT_TRIGGERED,null));
};

ControlKit.Select.prototype._updateAppearance = function()
{
    this._select.setStyleClass(this._active ? ControlKit.CSS.SelectActive : ControlKit.CSS.Select);
};

ControlKit.Select.prototype.onValueUpdate = function(e)
{
    if(!this._hasTarget())return;
    this._selected = this._object[this._targetKey];
    this._select.setProperty('value',this._selected.toString());
};

ControlKit.Select.prototype._hasTarget = function(){return this._targetKey != null;}
ControlKit.Color = function(parent,object,value,params)
{
    ControlKit.ObjectComponent.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    params           = params           || {};
    params.onChange  = params.onChange  || this._onChange;
    params.onFinish  = params.onFinish  || this._onFinish;
    params.presets   = params.presets   || ControlKit.Default.COLOR_PRESETS;
    params.colorMode = params.colorMode || ControlKit.Default.COLOR_COLOR_MODE;

    /*---------------------------------------------------------------------------------*/

    this._onChange   = this._onFinish = params.onChange;
    this._presetsKey = params.presets;

    /*---------------------------------------------------------------------------------*/

    var color = this._color = new ControlKit.Node(ControlKit.NodeType.DIV);
    var value = this._value = this._object[this._key];

    var colorMode = this._colorMode = params.colorMode;

    this._validateColorFormat(value, ControlKit.Error.COLOR_FORMAT_HEX,
                                     ControlKit.Error.COLOR_FORMAT_RGB_RGBFV_HSV);

    var wrapNode = this._wrapNode;

    if(!this._presetsKey)
    {
        color.setStyleClass(ControlKit.CSS.Color);
        wrapNode.addChild(color);
    }
    else
    {
        color.setStyleClass(ControlKit.CSS.Color);

        var colorWrap = new ControlKit.Node(ControlKit.NodeType.DIV);
            colorWrap.setStyleClass(ControlKit.CSS.WrapColorWPreset);

            wrapNode.addChild(colorWrap);
            colorWrap.addChild(color);

        var presets   = this._object[this._presetsKey];

        var i = -1;
        while(++i < presets.length)
        {
            this._validateColorFormat(presets[i], ControlKit.Error.COLOR_PRESET_FORMAT_HEX,
                                                  ControlKit.Error.COLOR_PRESET_FORMAT_RGB_RGBFV_HSV);
        }

        var options   = ControlKit.Options.getInstance(),
            presetBtn = new ControlKit.PresetBtn(wrapNode);

        var onPresetDeactivate = function(){options.clear();presetBtn.deactivate();};

        var self = this;
        var onPresetActivate    = function()
                                  {
                                      options.build(presets,
                                      self._value,
                                      color,
                                      function()
                                      {
                                          self.pushHistoryState();
                                          self._value = presets[options.getSelectedIndex()];
                                          self.applyValue();
                                      },
                                      onPresetDeactivate,
                                      ControlKit.Metric.PADDING_PRESET,
                                      true,
                                      colorMode);
                                  };

            presetBtn.setOnActive(onPresetActivate);
            presetBtn.setOnDeactive(onPresetDeactivate);
    }

    color.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,this._onColorTrigger.bind(this));

    /*---------------------------------------------------------------------------------*/

    this._updateColor();

};

ControlKit.Color.prototype = Object.create(ControlKit.ObjectComponent.prototype);

/*---------------------------------------------------------------------------------*/

ControlKit.Color.prototype._onColorTrigger = function()
{
    var colorMode      = this._colorMode,
        colorModeHEX   = ControlKit.ColorMode.HEX,
        colorModeRGB   = ControlKit.ColorMode.RGB,
        colorModeRGBfv = ControlKit.ColorMode.RGBfv,
        colorModeHSV   = ControlKit.ColorMode.HSV;

    var value = this._value,
        temp;

    var onPickerPick = function()
                       {
                           this.pushHistoryState();

                           switch(colorMode)
                           {
                               case colorModeHEX:   this._value = ControlKit.Picker.getInstance().getHEX();break;
                               case colorModeRGB:

                                   //if val = Float32array or so
                                   temp = ControlKit.Picker.getInstance().getRGB();
                                   value[0] = temp[0];
                                   value[1] = temp[1];
                                   value[2] = temp[2];
                                   break;

                               case colorModeRGBfv:

                                   temp = ControlKit.Picker.getInstance().getRGBfv();
                                   value[0] = temp[0];
                                   value[1] = temp[1];
                                   value[2] = temp[2];
                                   break;

                               case colorModeHSV:   this._value = ControlKit.Picker.getInstance().getHSV();break;
                           }

                           this.applyValue();

                       }.bind(this);

    var picker = ControlKit.Picker.getInstance();

    switch(colorMode)
    {
        case colorModeHEX:   picker.setColorHEX(value);break;
        case colorModeRGB:   picker.setColorRGB(value[0],value[1],value[2]);break;
        case colorModeRGBfv: picker.setColorRGBfv(value[0],value[1],value[2]);break;
        case colorModeHSV:   picker.setColorHSV(value[0],value[1],value[2]);break;
    }

        picker.setCallbackPick(onPickerPick);
        picker.open();
};

/*---------------------------------------------------------------------------------*/

ControlKit.Color.prototype.applyValue = function()
{
    this._object[this._key] = this._value;
    this._updateColor();
    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.VALUE_UPDATED,null));

};

ControlKit.Color.prototype.onValueUpdate = function(e)
{
    if(e.data.origin == this)return;
    this._value = this._object[this._key];
    this._updateColor();
};

/*---------------------------------------------------------------------------------*/

ControlKit.Color.prototype._updateColor = function()
{
    var color  = this._value,
        colorNode = this._color,
        nodeColor;

    colorNode.setProperty('innerHTML',color)

    switch(this._colorMode)
    {
        case ControlKit.ColorMode.HEX:
            nodeColor = color;
            break;

        case ControlKit.ColorMode.RGB:
            nodeColor = ControlKit.ColorUtil.RGB2HEX(color[0],color[1],color[2]);
            break;

        case ControlKit.ColorMode.RGBfv:
            nodeColor = ControlKit.ColorUtil.RGBfv2HEX(color[0],color[1],color[2]);
            break;

        case ControlKit.ColorMode.HSV:
            nodeColor = ControlKit.ColorUtil.HSV2RGB(color[0],color[1],color[2]);
            break;
    }

    colorNode.getStyle().backgroundColor = nodeColor;
};

ControlKit.Color.prototype._validateColorFormat = function(value,msgHex,msgArr)
{
    var colorMode = this._colorMode;


    if(colorMode == ControlKit.ColorMode.HEX && Object.prototype.toString.call(value) === '[object Array]' ||
       colorMode == ControlKit.ColorMode.HEX && Object.prototype.toString.call(value) === '[object Float32Array]')
    {
        throw new TypeError(msgHex);
    }
    if((colorMode == ControlKit.ColorMode.RGB   ||
        colorMode == ControlKit.ColorMode.RGBfv ||
        colorMode == ControlKit.ColorMode.HSV) &&
        Object.prototype.toString.call(value) !== '[object Array]' ||
        colorMode == ControlKit.ColorMode.HSV &&
        Object.prototype.toString.call(value) !== '[object Float32Array]')
    {
        throw new TypeError(msgArr);
    }
};
ControlKit.FunctionPlotter = function(parent,object,value,params)
{
    ControlKit.Plotter.apply(this,arguments);

    if(ControlKit.ErrorUtil.TypeError(object,value,Function))
    {
        throw new TypeError(ControlKit.Error.COMPONENT_OBJECT +
                            object.constructor.name + ' ' +
                            value +
                            ControlKit.Error.TYPE +
                            'Function');
    }

    var funcArgLength = object[value].length;

    if(funcArgLength > 2 || funcArgLength == 0)
    {
        throw new Error(ControlKit.Error.COMPONENT_FUNCTION_LENGTH);
    }

    /*---------------------------------------------------------------------------------*/

    params = params || {};
    params.showMinMaxLabels = params.showMinMaxLabels === undefined ?
                              ControlKit.Default.PANEL_FIXED :
                              params.showMinMaxLabels;

    /*---------------------------------------------------------------------------------*/

    var svgRoot = this._svgRoot,
        path    = this._path;

    var axes = this._axes = svgRoot.insertBefore(this._createSVGObject('path'),path);
        axes.style.strokeWidth = 1;

    var axesLabels = this._axesLabels = svgRoot.insertBefore(this._createSVGObject('path'),path);
        axesLabels.style.stroke = 'rgb(43,48,51)';
        axesLabels.style.strokeWidth = 1;

    var grid = this._grid;

    var svg   = this._svg,
        size  = Number(svg.getAttribute('width'));

    var sliderXWrap = new ControlKit.Node(ControlKit.NodeType.DIV);
        sliderXWrap.setStyleClass(ControlKit.CSS.GraphSliderXWrap);

    var sliderYWrap = new ControlKit.Node(ControlKit.NodeType.DIV);
        sliderYWrap.setStyleClass(ControlKit.CSS.GraphSliderYWrap);

    var sliderXTrack = this._sliderXTrack = new ControlKit.Node(ControlKit.NodeType.DIV);
        sliderXTrack.setStyleClass(ControlKit.CSS.GraphSliderX);

    var sliderYTrack = this._sliderYTrack = new ControlKit.Node(ControlKit.NodeType.DIV);
        sliderYTrack.setStyleClass(ControlKit.CSS.GraphSliderY);

    var sliderXHandle = this._sliderXHandle  = new ControlKit.Node(ControlKit.NodeType.DIV);
        sliderXHandle.setStyleClass(ControlKit.CSS.GraphSliderXHandle);

    var sliderYHandle = this._sliderYHandle = new ControlKit.Node(ControlKit.NodeType.DIV);
        sliderYHandle.setStyleClass(ControlKit.CSS.GraphSliderYHandle);

        sliderXTrack.addChild(sliderXHandle);
        sliderYTrack.addChild(sliderYHandle);
        sliderXWrap.addChild(sliderXTrack);
        sliderYWrap.addChild(sliderYTrack);

    var wrapNode = this._wrapNode;

    var plotMode = this._plotMode = funcArgLength == 1 ?
                                    ControlKit.FunctionPlotType.NON_IMPLICIT :
                                    ControlKit.FunctionPlotType.IMPLICIT;

    if(plotMode == ControlKit.FunctionPlotType.IMPLICIT)
    {
        var canvas = this._canvas = document.createElement('canvas');
            canvas.style.width    = canvas.style.height =  size  + 'px';
            canvas.width          = canvas.height = size;

        wrapNode.getElement().insertBefore(canvas,svg);

        this._canvasContext = canvas.getContext('2d');
        this._canvasImageData = this._canvasContext.getImageData(0,0,size,size);

        axes.style.stroke = ControlKit.Preset.FUNCTION_PLOTTER_IMPLICIT_AXES_COLOR;
        grid.style.stroke = ControlKit.Preset.FUNCTION_PLOTTER_IMPLICIT_GRID_COLOR;
    }
    else
    {
        axes.style.stroke = ControlKit.Preset.FUNCTION_PLOTTER_NON_IMPLICIT_AXES_COLOR;
        grid.style.stroke = ControlKit.Preset.FUNCTION_PLOTTER_NON_IMPLICIT_GRID_COLOR;
    }

        wrapNode.addChild(sliderXWrap);
        wrapNode.addChild(sliderYWrap);

        sliderXHandle.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,this._onSliderXHandleDown.bind(this));
        sliderYHandle.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN,this._onSliderYHandleDown.bind(this));

    /*---------------------------------------------------------------------------------*/

    var units   = this._units = [null,null];
    this._scale = null;

    if(plotMode == ControlKit.FunctionPlotType.NON_IMPLICIT)
    {
        units[0] = ControlKit.Preset.FUNCTION_PLOTTER_NON_IMPLICIT_UNIT_X;
        units[1] = ControlKit.Preset.FUNCTION_PLOTTER_NON_IMPLICIT_UNIT_Y;

        this._scale = ControlKit.Preset.FUNCTION_PLOTTER_NON_IMPLICIT_SCALE;
    }
    else if(plotMode == ControlKit.FunctionPlotType.IMPLICIT)
    {
        units[0] = ControlKit.Preset.FUNCTION_PLOTTER_IMPLICIT_UNIT_X;
        units[1] = ControlKit.Preset.FUNCTION_PLOTTER_IMPLICIT_UNIT_Y;

        this._scale = ControlKit.Preset.FUNCTION_PLOTTER_IMPLICIT_SCALE;
    }

    this._unitsMinMax = [ControlKit.Preset.FUNCTION_PLOTTER_UNIT_MIN,
                         ControlKit.Preset.FUNCTION_PLOTTER_UNIT_MAX]; //1/8->4

    this._scaleMinMax = [ControlKit.Preset.FUNCTION_PLOTTER_SCALE_MIN,
                         ControlKit.Preset.FUNCTION_PLOTTER_SCALE_MAX]; //1/50 -> 25

    /*---------------------------------------------------------------------------------*/

    this._center = [Math.round(size * 0.5),
                    Math.round(size * 0.5)];
    this._svgPos = [0,0];

    this._func = null;
    this.setFunction(this._object[this._key]);

    this._sliderXHandleUpdate();
    this._sliderYHandleUpdate();

    /*---------------------------------------------------------------------------------*/

    svg.addEventListener(ControlKit.DocumentEventType.MOUSE_DOWN,this._onDragStart.bind(this),false);
    this._wrapNode.getElement().addEventListener("mousewheel",   this._onScale.bind(this, false));

    ControlKit.getKitInstance().addEventListener(ControlKit.EventType.UPDATE_VALUE,this,'onValueUpdate');
};

ControlKit.FunctionPlotter.prototype = Object.create(ControlKit.Plotter.prototype);

/*---------------------------------------------------------------------------------*/

ControlKit.FunctionPlotter.prototype._updateCenter = function()
{
    var svg    = this._svg,
        width  = Number(svg.getAttribute('width')),
        height = Number(svg.getAttribute('height'));

    var mousePos = ControlKit.Mouse.getInstance().getPosition(),
        svgPos   = this._svgPos,
        center   = this._center;

    center[0] = Math.max(0,Math.min(mousePos[0]-svgPos[0],width));
    center[1] = Math.max(0,Math.min(mousePos[1]-svgPos[1],height));

    this._plotGraph();
};

ControlKit.FunctionPlotter.prototype._onDragStart = function(e)
{
   var element = this._svg;

    var svgPos = this._svgPos;
        svgPos[0] = 0;
        svgPos[1] = 0;

    while(element)
    {
        svgPos[0] += element.offsetLeft;
        svgPos[1] += element.offsetTop;
        element    = element.offsetParent;
    }

    var eventMove = ControlKit.DocumentEventType.MOUSE_MOVE,
        eventUp   = ControlKit.DocumentEventType.MOUSE_UP;

    var onDrag    = this._updateCenter.bind(this),
        onDragEnd = function()
        {
            this._updateCenter.bind(this);
            document.removeEventListener(eventMove,onDrag,   false);
            document.removeEventListener(eventUp,  onDragEnd,false);

        }.bind(this);

    document.addEventListener(eventMove, onDrag,    false);
    document.addEventListener(eventUp,   onDragEnd, false);

    this._updateCenter();
};

ControlKit.FunctionPlotter.prototype._onScale = function(e)
{
    e = window.event || e;
    this._scale += Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) * -1;

    var scaleMinMax = this._scaleMinMax;
    this._scale = Math.max(scaleMinMax[0],Math.min(this._scale,scaleMinMax[1]));

    this._plotGraph();
};

/*---------------------------------------------------------------------------------*/

ControlKit.FunctionPlotter.prototype.onValueUpdate = function(){this.setFunction(this._object[this._key]);};

ControlKit.FunctionPlotter.prototype._redraw       = function()
{
    if(this._plotMode == ControlKit.FunctionPlotType.IMPLICIT)
    {
        var size  = this._wrapNode.getWidth(),
            canvas = this._canvas;

            canvas.style.width  = canvas.style.height =  size  + 'px';
            canvas.width        = canvas.height = size;

        this._canvasImageData = this._canvasContext.getImageData(0,0,size,size);
    }

    this._sliderXHandleUpdate();
    this._sliderYHandleUpdate();

    this.setFunction(this._object[this._key]);
};

ControlKit.FunctionPlotter.prototype.setFunction = function(func)
{
    this._func = func.bind(this._object);
    this._plotGraph();
};

ControlKit.FunctionPlotter.prototype._plotGraph = function()
{
    this._drawGrid();
    this._drawAxes();
    this._drawPlot();
};

ControlKit.FunctionPlotter.prototype._drawAxes = function()
{
    var svg           = this._svg,
        svgWidth      = Number(svg.getAttribute('width')),
        svgHeight     = Number(svg.getAttribute('height'));

    var center  = this._center,
        centerX = center[0],
        centerY = center[1];

    var pathCmd = '';
        pathCmd += this._pathCmdLine(0,centerY,svgWidth,centerY);
        pathCmd += this._pathCmdLine(centerX,0,centerX,svgHeight);

    this._axes.setAttribute('d',pathCmd);
};

ControlKit.FunctionPlotter.prototype._drawPlot = function()
{
    var width, height;

    var center  = this._center,
        centerX = center[0],
        centerY = center[1];

    var units = this._units,
        unitX, unitY;

    var scale = this._scale;
    var normval, scaledVal, value, index;
    var offsetX, offsetY;

    var i;

    if(this._plotMode == ControlKit.FunctionPlotType.NON_IMPLICIT)
    {
        var svg    = this._svg;

        width   = Number(svg.getAttribute('width'));
        height  = Number(svg.getAttribute('height'));
        unitX   = units[0] * scale;
        unitY   = height / (units[1] * scale);
        offsetX = centerX / width;

        var len    = Math.floor(width),
            points = new Array(len * 2);

        i = -1;
        while(++i < len)
        {
            normval   = (-offsetX + i / len);
            scaledVal = normval * unitX;
            value     = centerY - this._func(scaledVal) * unitY;

            index   = i * 2;

            points[index]     = i;
            points[index + 1] = value;
        }

        var pathCmd = '';
            pathCmd += this._pathCmdMoveTo(points[0],points[1]);

        i = 2;
        while(i < points.length)
        {
            pathCmd += this._pathCmdLineTo(points[i],points[i+1]);
            i+=2;
        }

        this._path.setAttribute('d',pathCmd);
    }
    else
    {
        var canvas  = this._canvas,
            context = this._canvasContext,
            imgData = this._canvasImageData;

        width   = canvas.width;
        height  = canvas.height;

        unitX   = units[0] * scale;
        unitY   = units[1] * scale;

        offsetX = centerX / width;
        offsetY = centerY / height;

        var invWidth  = 1 / width,
            invHeight = 1 / height;
        var rgb       = [0,0,0];

        var col0 = [30,34,36],
            col1 = [255,255,255];

        i = -1;
        var j;
        while(++i < height)
        {
            j = -1;

            while(++j < width)
            {
                value    = this._func((-offsetX + j * invWidth) * unitX,
                                      (-offsetY + i * invHeight)* unitY);

                rgb[0] = floor((col1[0]-col0[0])*value + col0[0]);
                rgb[1] = floor((col1[1]-col0[1])*value + col0[1]);
                rgb[2] = floor((col1[2]-col0[2])*value + col0[2]);

                index = (i * width + j) * 4;

                imgData.data[index  ] = rgb[0];
                imgData.data[index+1] = rgb[1];
                imgData.data[index+2] = rgb[2];
                imgData.data[index+3] = 255;
            }
        }

        context.clearRect(0,0,width,height);
        context.putImageData(imgData,0,0);
    }
};

ControlKit.FunctionPlotter.prototype._drawGrid = function()
{
    var svg    = this._svg,
        width  = Number(svg.getAttribute('width')),
        height = Number(svg.getAttribute('height'));

    var scale = this._scale;

    var gridRes      = this._units,
        gridSpacingX = width  / (gridRes[0] * scale),
        gridSpacingY = height / (gridRes[1] * scale);

    var center  = this._center,
        centerX = center[0],
        centerY = center[1];

    var gridNumTop    = Math.round(centerY / gridSpacingY) + 1,
        gridNumBottom = Math.round((height - centerY) / gridSpacingY) + 1,
        gridNumLeft   = Math.round(centerX / gridSpacingX) + 1,
        gridNumRight  = Math.round((width - centerX) / gridSpacingX) + 1;

    var pathCmdGrid       = '',
        pathCmdAxesLabels = '';

    var i,temp;

    var strokeSize = ControlKit.Metric.STROKE_SIZE;

    var labelTickSize                = ControlKit.Metric.FUNCTION_PLOTTER_LABEL_TICK_SIZE,
        labelTickPaddingRight        = width  - labelTickSize - strokeSize,
        labelTickPaddingBottom       = height - labelTickSize - strokeSize,
        labelTickPaddingRightOffset  = labelTickPaddingRight  - labelTickSize,
        labelTickPaddingBottomOffset = labelTickPaddingBottom - labelTickSize,
        labelTickOffsetRight         = labelTickPaddingRight  - (labelTickSize + strokeSize) * 2,
        labelTickOffsetBottom        = labelTickPaddingBottom - (labelTickSize + strokeSize) * 2;

    i = -1;
    while(++i < gridNumTop)
    {
        temp = Math.round(centerY - gridSpacingY * i);
        pathCmdGrid += this._pathCmdLine(0,temp,width,temp);

        if(temp > labelTickSize)
        pathCmdAxesLabels += this._pathCmdLine(labelTickPaddingRight,      temp,
                                               labelTickPaddingRightOffset,temp);
    }

    i = -1;
    while(++i < gridNumBottom)
    {
        temp = Math.round(centerY + gridSpacingY * i);
        pathCmdGrid += this._pathCmdLine(0,temp,width,temp);

        if(temp < labelTickOffsetBottom)
        pathCmdAxesLabels += this._pathCmdLine(labelTickPaddingRight,      temp,
                                               labelTickPaddingRightOffset,temp);
    }

    i = -1;
    while(++i < gridNumLeft)
    {
        temp = Math.round(centerX - gridSpacingX * i);
        pathCmdGrid += this._pathCmdLine(temp,0,temp,height);

        if(temp > labelTickSize)
        pathCmdAxesLabels += this._pathCmdLine(temp, labelTickPaddingBottom,
                                               temp, labelTickPaddingBottomOffset);
    }

    i = -1;
    while(++i < gridNumRight)
    {
        temp = Math.round(centerX + gridSpacingX * i);
        pathCmdGrid += this._pathCmdLine(temp,0,temp,height);

        if(temp < labelTickOffsetRight)
        pathCmdAxesLabels += this._pathCmdLine(temp, labelTickPaddingBottom,
                                               temp, labelTickPaddingBottomOffset);
    }


    this._grid.setAttribute('d',pathCmdGrid);
    this._axesLabels.setAttribute('d',pathCmdAxesLabels);
};

/*---------------------------------------------------------------------------------*/

ControlKit.FunctionPlotter.prototype._sliderXStep = function(mousePos)
{
    var mouseX = mousePos[0];

    var handle          = this._sliderXHandle,
        handleWidth     = handle.getWidth(),
        handleWidthHalf = handleWidth * 0.5;

    var track       = this._sliderXTrack,
        trackWidth  = track.getWidth(),
        trackLeft   = track.getPositionGlobalX();

    var strokeSize = ControlKit.Metric.STROKE_SIZE;

    var max = trackWidth - handleWidthHalf - strokeSize * 2;

    var pos       = Math.max(handleWidthHalf,Math.min(mouseX - trackLeft,max)),
        handlePos = pos - handleWidthHalf;

    handle.setPositionX(handlePos);

    var unitsMin = this._unitsMinMax[0],
        unitsMax = this._unitsMinMax[1];

    var normVal   = (pos - handleWidthHalf) / (max - handleWidthHalf),
        mappedVal = unitsMin + (unitsMax  - unitsMin) * normVal;

    this._units[0] = mappedVal;

    this._plotGraph();
};

ControlKit.FunctionPlotter.prototype._sliderYStep = function(mousePos)
{
    var mouseY = mousePos[1];

    var handle = this._sliderYHandle,
        handleHeight = handle.getHeight(),
        handleHeightHalf = handleHeight * 0.5;

    var track = this._sliderYTrack,
        trackHeight = track.getHeight(),
        trackTop    = track.getPositionGlobalY();

    var max = trackHeight -  handleHeightHalf - 2;

    var pos       = Math.max(handleHeightHalf,Math.min(mouseY - trackTop,max)),
        handlePos = pos - handleHeightHalf;

    handle.setPositionY(handlePos);

    var unitsMax = this._unitsMinMax[0],
        unitsMin = this._unitsMinMax[1];

    var normVal = (pos - handleHeightHalf) / (max - handleHeightHalf),
        mappedVal = unitsMin + (unitsMax - unitsMin) * normVal;

    this._units[1] = mappedVal;

    this._plotGraph();
};

ControlKit.FunctionPlotter.prototype._onSliderXHandleDown = function()
{
    this._onSliderHandleDown(this._sliderXStep.bind(this));
};

ControlKit.FunctionPlotter.prototype._onSliderYHandleDown = function()
{
    this._onSliderHandleDown(this._sliderYStep.bind(this));
};

ControlKit.FunctionPlotter.prototype._onSliderHandleDown = function(sliderStepFunc)
{
    var eventMouseMove = ControlKit.DocumentEventType.MOUSE_MOVE,
        eventMouseUp   = ControlKit.DocumentEventType.MOUSE_UP;

    var mouse = ControlKit.Mouse.getInstance();

    var onDrag    = function(){sliderStepFunc(mouse.getPosition())},
        onDragEnd = function()
        {
            document.removeEventListener(eventMouseMove,onDrag,    false);
            document.removeEventListener(eventMouseUp,  onDragEnd, false);
        };

    sliderStepFunc(mouse.getPosition());
    document.addEventListener(eventMouseMove, onDrag,    false);
    document.addEventListener(eventMouseUp,   onDragEnd, false);
};

ControlKit.FunctionPlotter.prototype._sliderXHandleUpdate = function()
{
    var unitMin = this._unitsMinMax[0],
        unitMax = this._unitsMinMax[1],
        unitX   = this._units[0];

    var handleX           = this._sliderXHandle,
        handleXWidth      = handleX.getWidth(),
        handleXWidthHalf  = handleXWidth * 0.5,
        trackXWidth       = this._sliderXTrack.getWidth();

    var strokeSize = ControlKit.Metric.STROKE_SIZE;

    var handleXMin = handleXWidthHalf,
        handleXMax = trackXWidth  - handleXWidthHalf  - strokeSize * 2;

    handleX.setPositionX((handleXMin + (handleXMax - handleXMin) * ((unitX - unitMin) / (unitMax - unitMin))) - handleXWidthHalf);
};

ControlKit.FunctionPlotter.prototype._sliderYHandleUpdate = function()
{
    var unitMin = this._unitsMinMax[0],
        unitMax = this._unitsMinMax[1],
        unitY   = this._units[1];

    var handleY           = this._sliderYHandle,
        handleYHeight     = handleY.getHeight(),
        handleYHeightHalf = handleYHeight * 0.5,
        trackYHeight      = this._sliderYTrack.getHeight();

    var strokeSize = ControlKit.Metric.STROKE_SIZE;

    var handleYMin = trackYHeight - handleYHeightHalf - strokeSize * 2,
        handleYMax = handleYHeightHalf;

    handleY.setPositionY((handleYMin + (handleYMax - handleYMin) * ((unitY - unitMin) / (unitMax - unitMin))) - handleYHeightHalf);

};


ControlKit.Pad = function(parent,object,value,params)
{
    ControlKit.Plotter.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    params            = params            || {};
    params.boundsX    = params.boundsX    || ControlKit.Default.PAD_BOUNDS_X;
    params.boundsY    = params.boundsY    || ControlKit.Default.PAD_BOUNDS_Y;
    params.labelX     = params.labelX     || ControlKit.Default.PAD_LABEL_X;
    params.labelY     = params.labelY     || ControlKit.Default.PAD_LABEL_Y;

    params.showCross  = params.showCross  || true;

    /*---------------------------------------------------------------------------------*/

    this._onChange     = params.onChange || this._onChange;
    this._onFinish     = params.onFinish || this._onFinish;

    this._boundsX      = params.boundsX;
    this._boundsY      = params.boundsY;
    this._labelAxisX   = params.labelX != '' && params.labelX != 'none' ? params.labelX : null;
    this._labelAxisY   = params.labelY != '' && params.labelY != 'none' ? params.labelY : null;

    var path = this._path;
        path.style.strokeWidth = 1;
        path.style.stroke      = '#363c40';

    this._grid.style.stroke = 'rgb(25,25,25)';

    this._svgPos = [0,0];


    var handle = this._handle = this._svgRoot.appendChild(this._createSVGObject('g'));
    var handleCircle0 = handle.appendChild(this._createSVGObject('circle'));
        handleCircle0.setAttribute('r',String(11));
        handleCircle0.setAttribute('fill','rgba(0,0,0,0.05)');
    var handleCircle1 = handle.appendChild(this._createSVGObject('circle'));
        handleCircle1.setAttribute('r',String(10));
        handleCircle1.setAttribute('fill','rgb(83,93,98)');

    var handleCircle2 = handle.appendChild(this._createSVGObject('circle'));
        handleCircle2.setAttribute('r',String(9));
        handleCircle2.setAttribute('fill','rgb(57,69,76)');
        handleCircle2.setAttribute('cy',String(0.75));

    var handleCircle3 = handle.appendChild(this._createSVGObject('circle'));
        handleCircle3.setAttribute('r',String(10));
        handleCircle3.setAttribute('stroke','rgb(17,19,20)');
        handleCircle3.setAttribute('stroke-width',String(1));
        handleCircle3.setAttribute('fill','none');

    var handleCircle4 = handle.appendChild(this._createSVGObject('circle'));
        handleCircle4.setAttribute('r',String(6));
        handleCircle4.setAttribute('fill','rgb(30,34,36)');
    var handleCircle5 = handle.appendChild(this._createSVGObject('circle'));
        handleCircle5.setAttribute('r',String(3));
        handleCircle5.setAttribute('fill','rgb(255,255,255)');

        handle.setAttribute('tranform','translate(0 0)');

    this._svg.addEventListener(ControlKit.DocumentEventType.MOUSE_DOWN,this._onDragStart.bind(this),false);



    /*---------------------------------------------------------------------------------*/

    /*
    var canvas = this._canvas;
        canvas.setFontFamily('Arial');
        canvas.setFontSize(10);

        */

    /*---------------------------------------------------------------------------------*/

    /*
    canvas = this._canvas.getElement();

    canvas.onmousedown = function()
    {
        this._dragging = true;
        this.pushHistoryState();
        this._drawValue(this._getMouseNormalized());
        this.applyValue()

    }.bind(this);

    canvas.onmouseup   = function()
    {
        this._dragging = false;

    }.bind(this);

    var doconmousemove = document.onmousemove || function(){},
        doconmouseup   = document.onmouseup   || function(){};

    document.onmousemove = function(e)
    {
        doconmousemove(e);
        if(this._dragging)
        {
            this._drawValue(this._getMouseNormalized());
            this.applyValue();
            this._onChange();
        }
    }.bind(this);

    document.onmouseup = function(e)
    {
        doconmouseup(e);
        if(this._dragging)
        {
            this.pushHistoryState();
            this._dragging = false;
            this.applyValue();
            this._onFinish();
        }

    }.bind(this);

    */

    /*---------------------------------------------------------------------------------*/

    this._drawValue(this._object[this._key]);
};

ControlKit.Pad.prototype = Object.create(ControlKit.Plotter.prototype);

/*---------------------------------------------------------------------------------*/

ControlKit.Pad.prototype._onDragStart = function()
{
    var element = this._svg;

    var svgPos = this._svgPos;
        svgPos[0] = 0;
        svgPos[1] = 0;

    while(element)
    {
        svgPos[0] += element.offsetLeft;
        svgPos[1] += element.offsetTop;
        element    = element.offsetParent;
    }

    var eventMove = ControlKit.DocumentEventType.MOUSE_MOVE,
        eventUp   = ControlKit.DocumentEventType.MOUSE_UP;

    var onDrag    = function()
        {
            this._drawValueInput();
            this.applyValue();
            this._onChange();

        }.bind(this);

    var onDragEnd = function()
        {
            this.pushHistoryState();
            this._drawValueInput();
            this.applyValue();
            this._onFinish();

            document.removeEventListener(eventMove,onDrag,   false);
            document.removeEventListener(eventUp,  onDragEnd,false);

        }.bind(this);

    document.addEventListener(eventMove, onDrag,    false);
    document.addEventListener(eventUp,   onDragEnd, false);

    this._drawValueInput();
    this.applyValue();
    this._onChange();
};

ControlKit.Pad.prototype._redraw = function(){this._drawValue(this._object[this._key]);};

ControlKit.Pad.prototype._drawValueInput = function()
{
    this._drawValue(this._getMouseNormalized());
};

ControlKit.Pad.prototype._drawValue = function(value)
{
    this._object[this._key] = value;

    this._drawGrid();
    this._drawPoint();
};

ControlKit.Pad.prototype._drawGrid = function()
{
    var svgSize = Number(this._svg.getAttribute('width')),
        svgMidX = Math.floor(svgSize * 0.5),
        svgMidY = Math.floor(svgSize * 0.5);

    var pathCmd = '';
        pathCmd+= this._pathCmdLine(0,svgMidY,svgSize,svgMidY);
        pathCmd+= this._pathCmdLine(svgMidX,0,svgMidX,svgSize);

    this._grid.setAttribute('d',pathCmd);
};


ControlKit.Pad.prototype._drawPoint = function()
{
    var svgSize = Number(this._svg.getAttribute('width')),
        svgMidX = svgSize * 0.5,
        svgMidY = svgSize * 0.5;

    var value = this._object[this._key];

    var localX = ( 0.5 +  value[0] * 0.5 ) * svgSize,
        localY = ( 0.5 + -value[1] * 0.5 ) * svgSize;

    var pathCmd = '';
        pathCmd+= this._pathCmdLine(0,localY,svgSize,localY);
        pathCmd+= this._pathCmdLine(localX,0,localX,svgSize);

    this._path.setAttribute('d',pathCmd);
    this._handle.setAttribute('transform','translate('+localX +' '+localY+')');
};

ControlKit.Pad.prototype._getMouseNormalized = function()
{
    var offset  = this._svgPos,
        mouse   = ControlKit.Mouse.getInstance().getPosition(),
        svgSize = Number(this._svg.getAttribute('width'));

    return [ -1 + Math.max(0,Math.min(mouse[0]-offset[0],svgSize)) / svgSize * 2,
            ( 1 - Math.max(0,Math.min(mouse[1]-offset[1],svgSize)) / svgSize * 2)];

};

ControlKit.Pad.prototype.applyValue = function()
{
   this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.VALUE_UPDATED,null));
};

ControlKit.Pad.prototype.onValueUpdate = function(e)
{
    if(e.data.origin == this)return;
    this._drawValue(this._object[this._key]);
};

/*
    TODO: FIX draw error, last point glitch
 */

ControlKit.ValuePlotter = function(parent,object,value,params)
{
    ControlKit.Plotter.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    var svg       = this._svg,
        svgWidth  = Number(svg.getAttribute('width')),
        svgHeight = Number(svg.getAttribute('height'));

    params            = params            || {};
    params.height     = params.height     || svgHeight;
    params.resolution = params.resolution || ControlKit.Default.VALUE_PLOTTER_RESOLUTION;

    /*---------------------------------------------------------------------------------*/

    var resolution = params.resolution,
        length     = Math.floor(svgWidth / resolution);

    var points     = this._points  = new Array(length * 2),
        buffer0    = this._buffer0 = new Array(length),
        buffer1    = this._buffer1 = new Array(length);

    var min = this._lineWidth * 0.5;

    var i = -1; while(++i < length){buffer0[i] =  buffer1[i] = points[i*2] = points[i*2+1] = min;}

    this._height = params.height = params.height  < ControlKit.Metric.COMPONENT_MIN_HEIGHT ?
                   ControlKit.Metric.COMPONENT_MIN_HEIGHT : params.height;

    /*---------------------------------------------------------------------------------*/

    this._svgSetSize(svgHeight,Math.floor(params.height));
    this._grid.style.stroke = 'rgb(39,44,46)';

    /*---------------------------------------------------------------------------------*/

    this._updateHeight();
    this._drawValue();
};

ControlKit.ValuePlotter.prototype = Object.create(ControlKit.Plotter.prototype);

ControlKit.ValuePlotter.prototype._redraw = function()
{
    var points    = this._points,
        bufferLen = this._buffer0.length;

    var width = Number(this._svg.getAttribute('width')),
        ratio = width / (bufferLen-1);

    var i = -1;while(++i < bufferLen){points[i*2] = width - i * ratio;}

    this._drawValue();
};

ControlKit.ValuePlotter.prototype.onGroupSizeChange = function()
{
    var width  = this._wrapNode.getWidth(),
        height = this._height;

    this._svgSetSize(width,height);
    this._updateHeight();
    this._drawGrid();
    this._redraw();
};

ControlKit.ValuePlotter.prototype._drawValue = function()
{
    this._drawCurve();
};

ControlKit.ValuePlotter.prototype._drawGrid = function()
{
    var svg = this._svg;

    var svgWidth      = Number(svg.getAttribute('width')),
        svgHeightHalf = Math.floor(Number(svg.getAttribute('height')) * 0.5);

    var pathCmd = '';
        pathCmd += this._pathCmdMoveTo(0,svgHeightHalf);
        pathCmd += this._pathCmdLineTo(svgWidth,svgHeightHalf);

    this._grid.setAttribute('d',pathCmd);
};

//TODO: merge update + pathcmd
ControlKit.ValuePlotter.prototype._drawCurve = function()
{
    var svg = this._svg;

    var value = this._object[this._key];

    var buffer0 = this._buffer0,
        buffer1 = this._buffer1,
        points  = this._points;

    var bufferLength = buffer0.length;

    var pathCmd = '';

    var heightHalf = Number(svg.getAttribute('height')) * 0.5,
        unit       = heightHalf - this._lineWidth * 0.5;

        points[1] = buffer0[0];
        buffer0[bufferLength - 1] =  (value * unit) * -1 + Math.floor(heightHalf);

    pathCmd += this._pathCmdMoveTo(points[0],points[1]);

    var i = 0,index;

    while(++i < bufferLength)
    {
        index = i * 2;

        buffer1[i-1]    = buffer0[i];
        points[index+1] = buffer0[i-1] = buffer1[i-1];

        pathCmd += this._pathCmdLineTo(points[index],points[index+1]);
    }

    this._path.setAttribute('d',pathCmd);
};

ControlKit.ValuePlotter.prototype.update = function()
{
    if(this._parent.isDisabled())return;
    this._drawValue();
};



ControlKit.StringOutput = function(parent,object,value,params)
{
    ControlKit.Output.apply(this,arguments);
};

ControlKit.StringOutput.prototype = Object.create(ControlKit.Output.prototype);

ControlKit.StringOutput.prototype._setValue = function()
{
    if(this._parent.isDisabled())return;

    var textAreaString = this._object[this._key];

    if(textAreaString == this._prevString)return;

    var textArea             = this._textArea,
        textAreaElement      = textArea.getElement(),
        textAreaScrollHeight;

        textArea.setProperty('value',textAreaString);

        textAreaScrollHeight = textAreaElement.scrollHeight;
        textArea.setHeight(textAreaScrollHeight);

    var scrollBar = this._scrollBar;

    if(scrollBar)
    {
        if(textAreaScrollHeight <= this._wrapNode.getHeight())
        {
            scrollBar.disable();
        }
        else
        {
            scrollBar.enable();
            scrollBar.update();
            scrollBar.reset();
        }
    }

    this._prevString = textAreaString;
};


ControlKit.NumberOutput = function(parent,object,value,params)
{
    ControlKit.Output.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    params            = params        || {};
    params.dp         = params.dp     || ControlKit.Default.NUMBER_OUTPUT_DP;

    /*---------------------------------------------------------------------------------*/

    this._valueDPlace = params.dp + 1;
};

ControlKit.NumberOutput.prototype = Object.create(ControlKit.Output.prototype);


//FIXME
ControlKit.NumberOutput.prototype._setValue = function()
{
    if(this._parent.isDisabled())return;

    var value    = this._object[this._key],
        textArea = this._textArea,
        dp       = this._valueDPlace;

    var index,
        out;

    if(typeof(value)        === 'object'   &&
       typeof(value.length) === 'number'   &&
       typeof(value.splice) === 'function' &&
       !(value.propertyIsEnumerable('length')))
    {
        out = value.slice();

        var i = -1;
        var temp;

        var wrap = this._wrap;

        while(++i<out.length)
        {
            temp   = out[i] = out[i].toString();
            index  = temp.indexOf('.');
            if(index>0)out[i] = temp.slice(0,index + dp);
        }

        if(wrap)
        {
            textArea.setStyleProperty('white-space','nowrap');
            out = out.join('\n');
        }

        textArea.setProperty('value',out);
    }
    else
    {
        out   = value.toString();
        index = out.indexOf('.');
        textArea.setProperty('value',index > 0 ? out.slice(0,index + dp) : out);
    }

};

ControlKit.Picker = function(parentNode)
{
    var rootNode = this._node     = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.Picker),
        headNode = this._headNode = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.Head),
        lablWrap = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.Wrap),
        lablNode = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.Label),
        menuNode = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.Menu),
        wrapNode = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.Wrap);

    var menuClose = new ControlKit.Node(ControlKit.NodeType.INPUT_BUTTON);
        menuClose.setStyleClass(ControlKit.CSS.MenuBtnClose);

    /*---------------------------------------------------------------------------------*/

    var fieldWrap  = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass( ControlKit.CSS.PickerFieldWrap),
        sliderWrap = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.SliderWrap),
        inputWrap  = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass( ControlKit.CSS.PickerInputWrap);

    /*---------------------------------------------------------------------------------*/

    var canvasField  = this._canvasField  = document.createElement('canvas'),
        canvasSlider = this._canvasSlider = document.createElement('Canvas');

        fieldWrap.getElement().appendChild(canvasField);
        sliderWrap.getElement().appendChild(canvasSlider);

        this._setSizeCanvasField(154,154);
        this._setSizeCanvasSlider(14,154);

    var contextCanvasField  = this._contextCanvasField  = canvasField.getContext('2d'),
        contextCanvasSlider = this._contextCanvasSlider = canvasSlider.getContext('2d');

    var handleField  = this._handleField  = new ControlKit.Node(ControlKit.NodeType.DIV);
        handleField.setStyleClass(ControlKit.CSS.PickerHandleField);

    var handleSlider = this._handleSlider = new ControlKit.Node(ControlKit.NodeType.DIV);
        handleSlider.setStyleClass(ControlKit.CSS.PickerHandleSlider);

    /*---------------------------------------------------------------------------------*/

    var step = 1.0,
        dp   = 0;

    var callbackHue = this._onInputHueChange.bind(this),
        callbackSat = this._onInputSatChange.bind(this),
        callbackVal = this._onInputValChange.bind(this),
        callbackR   = this._onInputRChange.bind(this),
        callbackG   = this._onInputGChange.bind(this),
        callbackB   = this._onInputBChange.bind(this);


    var inputHue = this._inputHue = new ControlKit.NumberInput_Internal(step,dp,null,callbackHue,callbackHue),
        inputSat = this._inputSat = new ControlKit.NumberInput_Internal(step,dp,null,callbackSat,callbackSat),
        inputVal = this._inputVal = new ControlKit.NumberInput_Internal(step,dp,null,callbackVal,callbackVal),
        inputR   = this._inputR   = new ControlKit.NumberInput_Internal(step,dp,null,callbackR,callbackR),
        inputG   = this._inputG   = new ControlKit.NumberInput_Internal(step,dp,null,callbackG,callbackG),
        inputB   = this._inputB   = new ControlKit.NumberInput_Internal(step,dp,null,callbackB,callbackB);

    /*---------------------------------------------------------------------------------*/

    var controlsWrap = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.PickerControlsWrap);

    var buttonPick   = new ControlKit.Node(ControlKit.NodeType.INPUT_BUTTON).setStyleClass(ControlKit.CSS.Button).setProperty('value','pick'),
        buttonCancel = new ControlKit.Node(ControlKit.NodeType.INPUT_BUTTON).setStyleClass(ControlKit.CSS.Button).setProperty('value','cancel');


    var colorContrast = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.PickerColorContrast);

    var color0 = this._colorCurrNode = new ControlKit.Node(ControlKit.NodeType.DIV),
        color1 = this._colorPrevNode = new ControlKit.Node(ControlKit.NodeType.DIV);

    colorContrast.addChild(color0);
    colorContrast.addChild(color1);

    controlsWrap.addChild(buttonCancel);
    controlsWrap.addChild(buttonPick);
    controlsWrap.addChild(colorContrast);

    this._setContrasPrevColor(0,0,0);

    /*---------------------------------------------------------------------------------*/

    //CLEAN UP, TABle

    var inputFieldWrapHue = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.PickerInputField),
        inputFieldWrapSat = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.PickerInputField),
        inputFieldWrapVal = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.PickerInputField);

    var inputFieldWrapHueLabel = new ControlKit.Node(ControlKit.NodeType.SPAN).setStyleClass(ControlKit.CSS.Label).setProperty('innerHTML','H'),
        inputFieldWrapSatLabel = new ControlKit.Node(ControlKit.NodeType.SPAN).setStyleClass(ControlKit.CSS.Label).setProperty('innerHTML','S'),
        inputFieldWrapValLabel = new ControlKit.Node(ControlKit.NodeType.SPAN).setStyleClass(ControlKit.CSS.Label).setProperty('innerHTML','V');

        inputFieldWrapHue.addChildren(inputFieldWrapHueLabel,inputHue.getNode());
        inputFieldWrapSat.addChildren(inputFieldWrapSatLabel,inputSat.getNode());
        inputFieldWrapVal.addChildren(inputFieldWrapValLabel,inputVal.getNode());

    var inputFieldWrapR = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.PickerInputField),
        inputFieldWrapG = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.PickerInputField),
        inputFieldWrapB = new ControlKit.Node(ControlKit.NodeType.DIV).setStyleClass(ControlKit.CSS.PickerInputField);

    var inputFieldWrapRLabel = new ControlKit.Node(ControlKit.NodeType.SPAN).setStyleClass(ControlKit.CSS.Label).setProperty('innerHTML','R'),
        inputFieldWrapGLabel = new ControlKit.Node(ControlKit.NodeType.SPAN).setStyleClass(ControlKit.CSS.Label).setProperty('innerHTML','G'),
        inputFieldWrapBLabel = new ControlKit.Node(ControlKit.NodeType.SPAN).setStyleClass(ControlKit.CSS.Label).setProperty('innerHTML','B');

        inputFieldWrapR.addChildren(inputFieldWrapRLabel,inputR.getNode());
        inputFieldWrapG.addChildren(inputFieldWrapGLabel,inputG.getNode());
        inputFieldWrapB.addChildren(inputFieldWrapBLabel,inputB.getNode());


        inputWrap.addChildren(inputFieldWrapR,inputFieldWrapHue,
                              inputFieldWrapG,inputFieldWrapSat,
                              inputFieldWrapB,inputFieldWrapVal,colorContrast);

    /*---------------------------------------------------------------------------------*/

    var hexInputWrap = new ControlKit.Node(ControlKit.NodeType.DIV);
        hexInputWrap.setStyleClass(ControlKit.CSS.PickerInputWrap);

    var inputHEX = this._inputHEX = new ControlKit.Node(ControlKit.NodeType.INPUT_TEXT),
        inputFieldWrapHEX         = new ControlKit.Node(ControlKit.NodeType.DIV ).setStyleClass(ControlKit.CSS.PickerInputField),
        inputFieldWrapHEXLabel    = new ControlKit.Node(ControlKit.NodeType.SPAN).setStyleClass(ControlKit.CSS.Label);

        inputFieldWrapHEXLabel.setProperty('innerHTML','#');
        inputFieldWrapHEX.addChildren(inputFieldWrapHEXLabel,inputHEX);

        hexInputWrap.addChild(inputFieldWrapHEX);

        inputHEX.addEventListener(ControlKit.NodeEventType.CHANGE,this._onInputHEXFinish.bind(this));

    /*---------------------------------------------------------------------------------*/

        lablNode.setProperty('innerHTML','Color Picker');

        menuNode.addChild(menuClose);
        headNode.addChild(menuNode);
        lablWrap.addChild(lablNode);
        headNode.addChild(lablWrap);
        rootNode.addChild(headNode);
        rootNode.addChild(wrapNode);

        //wrapNode.addChild(paletteWrap);

        wrapNode.addChild(fieldWrap);
        wrapNode.addChild(sliderWrap);
        wrapNode.addChild(inputWrap);
        wrapNode.addChild(hexInputWrap);
        wrapNode.addChild(controlsWrap);

        fieldWrap.addChild( handleField);
        sliderWrap.addChild(handleSlider);

    /*---------------------------------------------------------------------------------*/

    var eventMouseDown = ControlKit.NodeEventType.MOUSE_DOWN,
        callback       = this._onCanvasFieldMouseDown.bind(this);

        fieldWrap.addEventListener(  eventMouseDown, callback);
        handleField.addEventListener(eventMouseDown, callback);

        callback = this._onCanvasSliderMouseDown.bind(this);

        sliderWrap.addEventListener(  eventMouseDown, callback);
        handleSlider.addEventListener(eventMouseDown, callback);

        menuClose.addEventListener(   eventMouseDown, this._onClose.bind(this));
        buttonPick.addEventListener(  eventMouseDown, this._onPick.bind(this));
        buttonCancel.addEventListener(eventMouseDown, this._onClose.bind(this));

        headNode.addEventListener(ControlKit.NodeEventType.MOUSE_DOWN, this._onHeadDragStart.bind(this));

    /*---------------------------------------------------------------------------------*/

    this._parentNode = parentNode;

    this._mouseOffset = [0,0];
    this._position    = [0,0];

    this._canvasSliderPos = [0,0];
    this._canvasFieldPos  = [0,0];
    this._handleFieldSize    = 12;
    this._handleSliderHeight = 7;

    this._imageDataSlider = contextCanvasSlider.createImageData(canvasSlider.width,canvasSlider.height);
    this._imageDataField  = contextCanvasField.createImageData( canvasField.width, canvasField.height);

    this._valueHueMinMax = [0,360];
    this._valueSatMinMax = this._valueValMinMax = [0,100];
    this._valueRGBMinMax = [0,255];

    this._valueHue = ControlKit.Default.COLOR_PICKER_VALUE_HUE;
    this._valueSat = ControlKit.Default.COLOR_PICKER_VALUE_SAT;
    this._valueVal = ControlKit.Default.COLOR_PICKER_VALUE_VAL;
    this._valueR   = 0;
    this._valueG   = 0;
    this._valueB   = 0;

    this._valueHEX = '#000000';
    this._valueHEXValid = this._valueHEX;

    this._callbackPick = function(){};

    //this._canvasFieldImageDataFunc = function(i,j){return this._HSV2RGB(this._valueHue,j)}

    /*---------------------------------------------------------------------------------*/

    this._drawCanvasField();
    this._drawCanvasSlider();

    this._setColorHSV(this._valueHue,this._valueSat,this._valueVal);

    this._updateColorRGBFromHSV();
    this._updateColorHEXFromRGB();

    this._updateHandles();
};

/*---------------------------------------------------------------------------------*/

ControlKit.Picker.prototype =
{
    _drawHandleField : function()
    {
        var canvas   = this._canvasField,
            nodePos  = this._canvasFieldPos,
            mousePos = ControlKit.Mouse.getInstance().getPosition();

        var posX     = Math.max(0,Math.min(mousePos[0] - nodePos[0],canvas.width)),
            posY     = Math.max(0,Math.min(mousePos[1] - nodePos[1],canvas.height)),
            posXNorm = posX / canvas.width,
            posYNorm = posY / canvas.height;

        var sat = Math.round(       posXNorm   * this._valueSatMinMax[1]),
            val = Math.round((1.0 - posYNorm) * this._valueValMinMax[1]);

        this._setColorHSV(this._valueHue,sat,val);

        this._updateColorRGBFromHSV();
        this._updateColorHEXFromRGB();

        this._updateHandleField();
    },

    _updateHandleField : function()
    {
        var width        = this._canvasField.width,
            height       = this._canvasField.height,
            offsetHandle = this._handleFieldSize * 0.25;

        var satNorm      = this._valueSat / this._valueSatMinMax[1],
            valNorm      = this._valueVal / this._valueValMinMax[1];

       this._handleField.setPositionGlobal(satNorm * width          - offsetHandle,
                                           (1.0 - valNorm) * height - offsetHandle);

    },

    _drawHandleSlider : function()
    {
        var canvas     = this._canvasSlider,
            canvasPosY = this._canvasSliderPos[1],
            mousePosY  = ControlKit.Mouse.getInstance().getY();

        var posY     = Math.max(0,Math.min(mousePosY - canvasPosY,canvas.height)),
            posYNorm = posY / canvas.height;

        var hue  = Math.floor((1.0 - posYNorm) * this._valueHueMinMax[1]);

        this._setColorHSV(hue,this._valueSat,this._valueVal);

        this._updateColorRGBFromHSV();
        this._updateColorHEXFromRGB();

        this._updateHandleSlider();
    },

    _updateHandleSlider : function()
    {
        var height       = this._canvasSlider.height,
            offsetHandle = this._handleSliderHeight * 0.25;

        var hueNorm = this._valueHue / this._valueHueMinMax[1];

        this._handleSlider.setPositionGlobalY((height - offsetHandle) * (1.0 - hueNorm));
    },

    _updateHandles : function()
    {
        this._updateHandleField();
        this._updateHandleSlider();
    },

    /*---------------------------------------------------------------------------------*/

    _setHue : function(value)
    {
        var minMax = this._valueHueMinMax;

        this._valueHue = value == minMax[1] ? minMax[0] : value;
        this._updateColorHSV();
        this._drawCanvasField();
    },

    _setSat : function(value)
    {
        this._valueSat = Math.round(value);
        this._updateColorHSV();
    },

    _setVal : function(value)
    {
        this._valueVal = Math.round(value);
        this._updateColorHSV();
    },

    _setR : function(value)
    {
        this._valueR = Math.round(value);
        this._updateColorRGB();
    },

    _setG : function(value)
    {
        this._valueG = Math.round(value);
        this._updateColorRGB();
    },

    _setB : function(value)
    {
        this._valueB = Math.round(value);
        this._updateColorRGB();
    },

    /*---------------------------------------------------------------------------------*/

    _onInputHueChange : function()
    {
        var input    = this._inputHue,
            inputVal = this._getValueContrained(input,this._valueHueMinMax);

        var minMax = this._valueHueMinMax;

        if(inputVal == minMax[1]){inputVal = minMax[0]; input.setValue(inputVal);}

        this._setHue(inputVal);
        this._updateColorRGBFromHSV();
        this._updateColorHEXFromRGB();
        this._updateHandleSlider();

        this._drawCanvasField();
    },

    _onInputSatChange : function()
    {
        this._setSat(this._getValueContrained(this._inputSat,this._valueSatMinMax));
        this._onInputSVChange();
    },

    _onInputValChange : function()
    {
        this._setVal(this._getValueContrained(this._inputVal,this._valueValMinMax));
        this._onInputSVChange();
    },

    _onInputRChange   : function()
    {
        this._setR(this._getValueContrained(this._inputR,this._valueRGBMinMax));
        this._onInputRGBChange();
    },

    _onInputGChange   : function()
    {
        this._setG(this._getValueContrained(this._inputG,this._valueRGBMinMax));
        this._onInputRGBChange();
    },

    _onInputBChange   : function()
    {
        this._setB(this._getValueContrained(this._inputB,this._valueRGBMinMax));
        this._onInputRGBChange();
    },

    _onInputHEXFinish : function()
    {
        var input = this._inputHEX,
            value = input.getProperty('value');

        if(!ControlKit.ColorUtil.isValidHEX(value))
        {
            input.setProperty('value',this._valueHEXValid);
            return;
        }

        this._valueHEX = this._valueHEXValid = value;
        this._updateColorFromHEX();
    },

    _onInputSVChange : function()
    {
        this._updateColorRGBFromHSV();
        this._updateColorHEXFromRGB();
        this._updateHandleField();
    },

    _onInputRGBChange : function()
    {
        this._updateColorHSVFromRGB();
        this._updateColorHEXFromRGB();
        this._updateHandles();
    },

    _getValueContrained : function(input,minMax)
    {
        var inputVal = Math.round(input.getValue()),
            min      = minMax[0],
            max      = minMax[1];

        if(inputVal <= min){inputVal = min;input.setValue(inputVal);}
        if(inputVal >= max){inputVal = max;input.setValue(inputVal);}

        return inputVal;
    },



    /*---------------------------------------------------------------------------------*/

    _updateInputHue : function(){this._inputHue.setValue(this._valueHue);},
    _updateInputSat : function(){this._inputSat.setValue(this._valueSat);},
    _updateInputVal : function(){this._inputVal.setValue(this._valueVal);},
    _updateInputR   : function(){this._inputR.setValue(this._valueR);},
    _updateInputG   : function(){this._inputG.setValue(this._valueG);},
    _updateInputB   : function(){this._inputB.setValue(this._valueB);},
    _updateInputHEX : function(){this._inputHEX.setProperty('value',this._valueHEX);},

    /*---------------------------------------------------------------------------------*/

    _setColorHSV  : function(hue,sat,val)
    {
        this._valueHue = hue;
        this._valueSat = sat;
        this._valueVal = val;

        this._updateInputHue();
        this._updateInputSat();
        this._updateInputVal();

        this._updateContrastCurrColor();
    },

    _setColorRGB  : function(r,g,b)
    {
        this._valueR = r;
        this._valueG = g;
        this._valueB = b;

        this._updateInputR();
        this._updateInputG();
        this._updateInputB();

        this._updateContrastCurrColor();
    },

    _setColorHEX : function(hex)
    {
        this._valueHEX = hex;
        this._updateInputHEX();
    },

    _updateColorHSV : function()
    {
        this._setColorHSV(this._valueHue,this._valueSat,this._valueVal);
        this._updateContrastCurrColor();
    },

    _updateColorRGB : function()
    {
        this._setColorRGB(this._valueR,this._valueG,this._valueB);
        this._updateContrastCurrColor();
    },

    _updateColorHSVFromRGB : function()
    {
        var hsv = ControlKit.ColorUtil.RGB2HSV(this._valueR,this._valueG,this._valueB);
        this._setColorHSV(hsv[0],hsv[1],hsv[2]);
    },

    _updateColorRGBFromHSV : function()
    {
        var rgb = ControlKit.ColorUtil.HSV2RGB(this._valueHue,this._valueSat,this._valueVal);
        this._setColorRGB(rgb[0],rgb[1],rgb[2]);
    },

    _updateColorHEXFromRGB : function()
    {
        var hex = ControlKit.ColorUtil.RGB2HEX(this._valueR, this._valueG, this._valueB);
        this._setColorHEX(hex);
    },

    _updateColorFromHEX : function()
    {
        var rgb = ControlKit.ColorUtil.HEX2RGB(this._valueHEX);

        this._setColorRGB(rgb[0],rgb[1],rgb[2]);
        this._updateColorHSVFromRGB();
        this._updateHandles();
    },

    /*---------------------------------------------------------------------------------*/

    _updateContrastCurrColor : function(){this._setContrastCurrColor(this._valueR, this._valueG, this._valueB);},
    _updateContrastPrevColor : function(){this._setContrasPrevColor( this._valueR, this._valueG, this._valueB)},

    _setContrastCurrColor  : function(r,g,b){this._colorCurrNode.setStyleProperty('background','rgb('+r+','+g+','+b+')')},
    _setContrasPrevColor   : function(r,g,b){this._colorPrevNode.setStyleProperty('background','rgb('+r+','+g+','+b+')')},

    /*---------------------------------------------------------------------------------*/

    _onHeadDragStart : function()
    {
        var node       = this._node,
            parentNode = this._parentNode;

        var nodePos    = node.getPositionGlobal(),
            mousePos   = ControlKit.Mouse.getInstance().getPosition(),
            offsetPos  = this._mouseOffset;

        offsetPos[0] = mousePos[0] - nodePos[0];
        offsetPos[1] = mousePos[1] - nodePos[1];

        var eventMouseMove = ControlKit.DocumentEventType.MOUSE_MOVE,
            eventMouseUp   = ControlKit.DocumentEventType.MOUSE_UP;

        var self = this;

        var onDrag = function()
            {
                self._updatePosition();
                self._updateCanvasNodePositions();
            },

            onDragEnd = function()
            {
                self._updateCanvasNodePositions();
                document.removeEventListener(eventMouseMove, onDrag,    false);
                document.removeEventListener(eventMouseUp,   onDragEnd, false);
            };

        parentNode.removeChild(node);
        parentNode.addChild(   node);

        document.addEventListener(eventMouseMove, onDrag,    false);
        document.addEventListener(eventMouseUp,   onDragEnd, false);

        this._updateCanvasNodePositions();
    },

    _updatePosition : function()
    {
        var mousePos  = ControlKit.Mouse.getInstance().getPosition(),
            offsetPos = this._mouseOffset;

        var currPositionX = mousePos[0] - offsetPos[0],
            currPositionY = mousePos[1] - offsetPos[1];

        var node     = this._node,
            head     = this._headNode,
            position = this._position;

        var maxX = window.innerWidth  - node.getWidth(),
            maxY = window.innerHeight - head.getHeight();

        position[0] = Math.max(0,Math.min(currPositionX,maxX));
        position[1] = Math.max(0,Math.min(currPositionY,maxY));

        node.setPositionGlobal(position[0],position[1]);
    },

    /*---------------------------------------------------------------------------------*/

    _drawCanvasField : function()
    {
        var canvas  = this._canvasField,
            context = this._contextCanvasField;

        var width     = canvas.width,
            height    = canvas.height,
            invWidth  = 1 / width,
            invHeight = 1 / height;

        var imageData = this._imageDataField,
            rgb       = [],
            index     = 0;

        var valueHue  = this._valueHue;

        var i = -1, j;
        while(++i < height)
        {
            j = -1;

            while(++j < width)
            {
                rgb   = ControlKit.ColorUtil.HSV2RGB(valueHue, j * invWidth * 100.0,( 1.0 - i * invHeight ) * 100.0);
                index = (i * width + j) * 4;

                imageData.data[index  ] = rgb[0];
                imageData.data[index+1] = rgb[1];
                imageData.data[index+2] = rgb[2];
                imageData.data[index+3] = 255;
            }
        }

        context.putImageData(imageData,0,0);
    },

    _drawCanvasSlider : function()
    {
        var canvas  = this._canvasSlider,
            context = this._contextCanvasSlider;

        var width     = canvas.width,
            height    = canvas.height,
            invHeight = 1 / height;

        var imageData = this._imageDataSlider,
            rgb       = [],
            index     = 0;

        var i = -1,j;
        while(++i < height)
        {
            j = -1;

            while(++j < width)
            {
                rgb   = ControlKit.ColorUtil.HSV2RGB( (1.0 - i * invHeight) * 360.0,100.0,100.0);
                index = (i * width + j) * 4;

                imageData.data[index  ] = rgb[0];
                imageData.data[index+1] = rgb[1];
                imageData.data[index+2] = rgb[2];
                imageData.data[index+3] = 255;
            }
        }

        context.putImageData(imageData,0,0);

    },

    /*---------------------------------------------------------------------------------*/

    _onCanvasFieldMouseDown : function()
    {
        var eventMouseMove = ControlKit.DocumentEventType.MOUSE_MOVE,
            eventMouseUp   = ControlKit.DocumentEventType.MOUSE_UP;

        var self = this;

        var onDrag     = function()
            {
                self._drawHandleField();
            },

            onDragEnd  = function()
            {
                document.removeEventListener(eventMouseMove, onDrag,    false);
                document.removeEventListener(eventMouseUp,   onDragEnd, false);
            };

        document.addEventListener(eventMouseMove, onDrag,    false);
        document.addEventListener(eventMouseUp,   onDragEnd, false);

        self._drawHandleField();
    },

    _onCanvasSliderMouseDown : function()
    {
        var eventMouseMove = ControlKit.DocumentEventType.MOUSE_MOVE,
            eventMouseUp   = ControlKit.DocumentEventType.MOUSE_UP;

        var self = this;

        var onDrag     = function()
            {
                self._drawHandleSlider();
                self._drawCanvasField();
            },

            onDragEnd  = function()
            {
                document.removeEventListener(eventMouseMove, onDrag,    false);
                document.removeEventListener(eventMouseUp,   onDragEnd, false);
                self._drawCanvasField();
            };

        document.addEventListener(eventMouseMove, onDrag,    false);
        document.addEventListener(eventMouseUp,   onDragEnd, false);

        self._drawHandleSlider();
        self._drawCanvasField();
    },

    _setSizeCanvasField : function(width,height)
    {
        var canvas = this._canvasField;
            canvas.style.width  = width  + 'px';
            canvas.style.height = height + 'px';
            canvas.width  = width;
            canvas.height = height;

    },

    _setSizeCanvasSlider : function(width,height)
    {
        var canvas = this._canvasSlider;
            canvas.style.width  = width  + 'px';
            canvas.style.height = height + 'px';
            canvas.width  = width;
            canvas.height = height;
    },

    /*---------------------------------------------------------------------------------*/

    open  : function()
    {
        var node = this._node;

        this._parentNode.addChild(node);
        node.setPositionGlobal(window.innerWidth  * 0.5 - node.getWidth()  * 0.5,
                               window.innerHeight * 0.5 - node.getHeight() * 0.5);

        this._updateCanvasNodePositions();
    },

    close : function(){this._parentNode.removeChild(this._node);},

    _onClose : function(e){e.cancelBubble = true;this.close();},
    _onPick  : function(){this._callbackPick();this.close();},

    _updateCanvasNodePositions : function()
    {
        var canvasSliderPos = this._canvasSliderPos,
            canvasFieldPos  = this._canvasFieldPos;

            canvasSliderPos[0] = canvasSliderPos[1] = 0;
            canvasFieldPos[0]  = canvasFieldPos[1]  = 0;

        var element = this._canvasSlider;

        while(element)
        {
            canvasSliderPos[0] += element.offsetLeft;
            canvasSliderPos[1] += element.offsetTop;
            element             = element.offsetParent;
        }

        element = this._canvasField;

        while(element)
        {
            canvasFieldPos[0] += element.offsetLeft;
            canvasFieldPos[1] += element.offsetTop;
            element            = element.offsetParent;
        }
    },

    setCallbackPick : function(func){this._callbackPick = func;},

    /*---------------------------------------------------------------------------------*/

    setColorHEX : function(hex)
    {
        this._setColorHEX(hex);
        this._updateColorFromHEX();
        this._setColor();
    },

    setColorRGB   : function(r,g,b)
    {
        this._setColorRGB(r,g,b);
        this._updateColorHEXFromRGB();
        this._updateColorHSVFromRGB();
        this._setColor();
    },

    setColorRGBfv : function(r,g,b)
    {
        this.setColorRGB(Math.floor(r * 255.0),
                         Math.floor(g * 255.0),
                         Math.floor(b * 255.0));
    },

    setColorHSV   : function(h,s,v)
    {
        this._setColorHSV(h,s,v);
        this._updateColorRGBFromHSV();
        this._updateColorHEXFromRGB();
        this._setColor();
    },

    _setColor : function()
    {
        this._drawCanvasField();
        this._drawCanvasSlider();
        this._updateHandles();
        this._setContrasPrevColor(this._valueR,this._valueG,this._valueB);
    },

    getR     : function(){return this._valueR;},
    getG     : function(){return this._valueG;},
    getB     : function(){return this._valueB;},
    getRGB   : function(){return [this._valueR,this._valueG,this._valueB];},
    getHue   : function(){return this._valueHue;},
    getSat   : function(){return this._valueSat;},
    getVal   : function(){return this._valueVal;},
    getHSV   : function(){return [this._valueHue,this._valueSat,this._valueVal];},
    getHEX   : function(){return this._valueHEX;},
    getRGBfv : function(){return [this._valueR / 255.0,this._valueG / 255.0,this._valueB / 255.0];},

    getNode : function(){return this._node;}
};

ControlKit.Picker.init        = function(parentNode){return ControlKit.Picker._instance = new ControlKit.Picker(parentNode);};
ControlKit.Picker.getInstance = function(){return ControlKit.Picker._instance;};

ControlKit.Canvas = function(parent,params)
{
    ControlKit.Component.apply(this,arguments);

    /*-------------------------------------------------------------------------------------*/

    var wrapNode = this._wrapNode;
        wrapNode.setStyleClass(ControlKit.CSS.CanvasWrap);

    var wrapWidth = wrapNode.getWidth();

    var canvas = this._canvas = document.createElement('canvas');
        wrapNode.getElement().appendChild(canvas);

    this._canvasWidth = this._canvasHeight = 0;
    this._setCanvasSize(wrapWidth,wrapWidth);

    this._updateHeight();

    /*-------------------------------------------------------------------------------------*/

    this._node.setStyleClass(ControlKit.CSS.CanvasListItem);

    this._parent.addEventListener(ControlKit.EventType.GROUP_SIZE_CHANGE,this,  'onGroupSizeChange');
    this.addEventListener(ControlKit.EventType.GROUP_SIZE_UPDATE,this._parent,'onGroupSizeUpdate');

};

ControlKit.Canvas.prototype = Object.create(ControlKit.Component.prototype);

/*-------------------------------------------------------------------------------------*/


ControlKit.Canvas.prototype._updateHeight = function()
{
    var canvasHeight = this._canvas.height;

    this._wrapNode.setHeight(canvasHeight);
    this._node.setHeight(canvasHeight + ControlKit.Metric.PADDING_WRAPPER);

};

ControlKit.Canvas.prototype.onGroupSizeChange = function()
{
    var width = this._wrapNode.getWidth();

    this._setCanvasSize(width,width);
    this._updateHeight();
    this._redraw();

    this.dispatchEvent(new ControlKit.Event(this,ControlKit.EventType.GROUP_SIZE_UPDATE,null));
};

ControlKit.Canvas.prototype._setCanvasSize = function(width,height)
{
    var canvasWidth  = this._canvasWidth  = width,
        canvasHeight = this._canvasHeight = height;

    var canvas = this._canvas;
        canvas.style.width  = canvasWidth  + 'px';
        canvas.style.height = canvasHeight + 'px';
        canvas.width        = canvasWidth;
        canvas.height       = canvasHeight;
};

ControlKit.Canvas.prototype.getCanvas  = function(){return this._canvas;};
ControlKit.Canvas.prototype.getContext = function(){return this._canvas.getContext('2d');};
ControlKit.SVG = function(parent,params)
{
    ControlKit.Component.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    var wrapNode = this._wrapNode;
    wrapNode.setStyleClass(ControlKit.CSS.CanvasWrap);
    var wrapSize = wrapNode.getWidth();


    var svg = this._svg = this._createSVGObject('svg');
    svg.setAttribute('version', '1.2');
    svg.setAttribute('baseProfile', 'tiny');
    svg.setAttribute('preserveAspectRatio','true');

    wrapNode.getElement().appendChild(svg);

    this._svgSetSize(wrapSize,wrapSize);
    this._updateHeight();

    /*---------------------------------------------------------------------------------*/

    this._node.setStyleClass(ControlKit.CSS.CanvasListItem);

    this._parent.addEventListener(ControlKit.EventType.GROUP_SIZE_CHANGE, this, 'onGroupSizeChange');
    this.addEventListener(ControlKit.EventType.GROUP_SIZE_UPDATE, this._parent, 'onGroupSizeUpdate');
};

ControlKit.Component.prototype = Object.create(ControlKit.Component.prototype);

/*---------------------------------------------------------------------------------*/

ControlKit.SVG.prototype._updateHeight = function()
{
    var svgHeight = Number(this._svg.getAttribute('height'));

    this._wrapNode.setHeight(svgHeight);
    this._node.setHeight(svgHeight + ControlKit.Metric.PADDING_WRAPPER);
};

ControlKit.SVG.prototype.onGroupSizeChange = function()
{
    var width = this._wrapNode.getWidth();

    this._svgSetSize(width,width);
    this._updateHeight();
};

/*---------------------------------------------------------------------------------*/

ControlKit.SVG.prototype._svgSetSize = function(width,height)
{
    var svg = this._svg;
    svg.setAttribute('width',  width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewbox', '0 0 ' + width + ' ' + height);
};

ControlKit.SVG.prototype.getSVG = function(){return this._svg;};