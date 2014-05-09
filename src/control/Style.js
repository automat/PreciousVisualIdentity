function _inherit(style,custom)
{
    var _style = {};
    for(var p in style )_style[p] = style[p];
    if(custom)for(var p in custom)_style[p] = custom[p];
    return _style;
}

var Stage =
    {
        padding : [200],
        width   : 1024,
        height  : 768,

        border:
        {
            color:[255,0,0,255]
        }
    },

    Debug0 =
    {
        width  : 80,
        height : 80,
        padding: [12,10],
        overflow: 'hidden',
        color : [255,255,255,255],

        box:
        {
            sizing:'border-box'
        },



        border :
        {
            width: 5,
            color: [255,0,255,255]
        },

        font :
        {
            family : 'Gravur-CondensedBold',
            size : 18

        },

        text :
        {
            align  : 'center',
            valign : 'top',
            decoration: 'none',
            outline: 'none',
            transform: 'uppercase'
        }
    },

    Debug1 = _inherit(Debug0,
        {
            width  : 150,
            margin: [90,0]



        }),

    Debug2 = _inherit(Debug0,
        {
            width  : 200,
            margin: [180,0],

            font :
            {
                family : 'Gravur-CondensedBold',
                size : 36,
                align: 'right',
                valign:'center'

            }

        }),

    Debug3 = _inherit(Debug0,
        {
            margin: [270,0],

            width: 90,
            color: [255,0,255,255],

            background:
            {
                color:[255,255,255,255]
            }
        },
    Debug4 = _inherit(Debug0,
        {
            margin: [360,0],
            width: 90,
            height: 150

        }),
    Debug5 = _inherit(Debug0,
        {
            margin:[0,90],

            width: 400,

            background :
            {
                color: [200,0,0,255]

            },

            border : {},


            font :
            {
                family : 'Gravur-CondensedBold',
                size : 200

            },

            text :
            {
                align  : 'right',
                valign : 'top',
                decoration: 'none',
                outline: 'none',
                transform: 'uppercase'
            }

        }));






module.exports = {Stage :Stage,
                  Debug0:Debug0,
                  Debug1:Debug1,
                  Debug2:Debug2,
                  Debug3:Debug3,
                  Debug4:Debug4,
                  Debug5:Debug5};
