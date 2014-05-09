
var PRImageDataUtil = {};

/*---------------------------------------------------------------------------------------------------------*/

PRImageDataUtil.DataSliced = function(img,sliceWidth,sliceHeight,format)
{
    sliceHeight = sliceHeight || sliceWidth;
    format      = format || PRImageDataFormat.RGBAi;

    var imgWidth  = img.width,
        imgHeight = img.height;

    if(imgWidth % sliceWidth != 0)
        throw new Error('Image width ' + imgWidth + ' not divisible by sliceWidth ' + sliceWidth);
    if(imgHeight % sliceHeight !=0)
        throw new Error('Image height ' + imgHeight + ' not divisible by sliceHeight ' + sliceHeight);



    var data = PRImageDataUtil.Data(img,format);

    var stepWidth  = (imgWidth / sliceWidth),
        stepHeight = (imgHeight / sliceHeight);

    var outLen = sliceWidth * sliceHeight,
        objLen = format.length - 1, //hehe
        out    = format[format.length - 1] == 'i' ?
                 new Uint16Array(outLen * objLen) :
                 new Float32Array(outLen * objLen);

    var indexData,
        indexOut;

    var i, j, k, l;

    i = 0;
    k = 0;
    while(i < imgHeight)
    {
        j = 0;
        while(j < imgWidth)
        {
            indexData = ( i * imgWidth + j ) * objLen;
            indexOut  = k * objLen;

            l = -1;
            while(++l < objLen)out[indexOut + l] = data[indexData + l];

            j+= stepWidth;
            k++;
        }

       i+= stepHeight;
    }

    return out;
};


/*---------------------------------------------------------------------------------------------------------*/

PRImageDataUtil.Data = function(img,format)
{
    format = format || PRImageDataFormat.RGBAi;

    var data;

    switch(format)
    {
        case PRImageDataFormat.RGBAi:data = PRImageDataUtil.DataRGBAi(img);break;
        case PRImageDataFormat.RGBAf:data = PRImageDataUtil.DataRGBAf(img);break;
        case PRImageDataFormat.RGBi :data = PRImageDataUtil.DataRGBi(img);break;
        case PRImageDataFormat.RGBf :data = PRImageDataUtil.DataRGBf(img);break;
        case PRImageDataFormat.KAi  :data = PRImageDataUtil.DataKAi(img);break;
        case PRImageDataFormat.KAf  :data = PRImageDataUtil.DataKAf(img);break;
        case PRImageDataFormat.Ki   :data = PRImageDataUtil.DataKi(img);break;
        case PRImageDataFormat.Kf   :data = PRImageDataUtil.DataKf(img);break;
        case PRImageDataFormat.Ai   :data = PRImageDataUtil.DataAi(img);break;
        case PRImageDataFormat.Af   :data = PRImageDataUtil.DataAf(img);break;
    }

    return data;
};

/*---------------------------------------------------------------------------------------------------------*/

PRImageDataUtil.DataRGBAi = function(img)
{
    var canvas        = document.createElement('canvas');
        canvas.width  = img.width;
        canvas.height = img.height;

    var context = canvas.getContext('2d');
        context.drawImage(img,0,0,img.width,img.height);

    return context.getImageData(0,0,img.width,img.height).data;
};

PRImageDataUtil.DataRGBi = function(img)
{
    var data = PRImageDataUtil.DataRGBAi(img);
    var out  = new Uint16Array(data.length / 4 * 3);

    var dataLen4 = data.length / 4;
    var i,i3,i4;

    i = -1;
    while(++i < dataLen4)
    {
        i3 = i * 3;
        i4 = i * 4;

        out[i3  ] = data[i4  ];
        out[i3+1] = data[i4+1];
        out[i3+2] = data[i4+2];
    }

    return out;

};

PRImageDataUtil.DataKAi = function(img)
{
    var data = PRImageDataUtil.DataRGBAi(img);
    var out  = new Uint16Array(data.length / 4 * 2);

    var dataLen4 = data.length / 4;
    var i,i2,i4;

    i = -1;
    while(++i < dataLen4)
    {
        i2 = i * 2;
        i4 = i * 4;
        out[i2  ] = Math.floor((data[i4]+data[i4+1]+data[i4+2]) / 3);
        out[i2+1] = data[i4 + 3];
    }

    return out;
};

PRImageDataUtil.DataKi = function(img)
{
    var data = PRImageDataUtil.DataRGBAi(img);
    var out  = new Uint16Array(data.length / 4);

    var dataLen4 = data.length / 4;
    var i,i4;

    i = -1;
    while(++i < dataLen4)
    {
        i4 = i * 4;
        out[i] = Math.floor((data[i4]+data[i4+1]+data[i4+2]) / 3);
    }

    return out;
};

PRImageDataUtil.DataAi = function(img)
{
    var data = PRImageDataUtil.DataRGBAi(img);
    var out  = new Uint16Array(data.length / 4);

    var dataLen4 = data.length / 4;
    var i = -1;

    while(++i < dataLen4)
    {
        out[i] = data[i * 4 + 3];
    }

    return out;
};

/*---------------------------------------------------------------------------------------------------------*/

PRImageDataUtil.DataRGBAf = function(img)
{
    var data = new Float32Array(PRImageDataUtil.DataRGBAi(img));
    var i255 = 1.0 / 255;
    var i = -1;while(++i < data.length){data[i]*=i255;}
    return data;
};

PRImageDataUtil.DataRGBf = function(img)
{
    var data = PRImageDataUtil.DataRGBAi(img);
    var out  = new Float32Array(data.length / 4 * 3);

    var dataLen4 = data.length / 4;
    var i,i3,i4;
    var i255 = 1.0 / 255;

    i = -1;
    while(++i < dataLen4)
    {
        i3 = i * 3;
        i4 = i * 4;

        out[i3  ] = data[i4  ] * i255;
        out[i3+1] = data[i4+1] * i255;
        out[i3+2] = data[i4+2] * i255;
    }

    return out;
};

PRImageDataUtil.DataKAf = function(img)
{
    var data = PRImageDataUtil.DataRGBAi(img);
    var out  = new Float32Array(data.length / 4 * 2);

    var dataLen4 = data.length / 4;
    var i,i2,i4;
    var i255 = 1.0 / 255,
        i3   = 1.0 / 3.0;

    i = -1;
    while(++i < dataLen4)
    {
        i2 = i * 2;
        i4 = i * 4;
        out[i2  ] = (data[i4]+data[i4+1]+data[i4+2]) * i3 * i255 ;
        out[i2+1] = data[i4 + 3] * i255;
    }

    return out;
};

PRImageDataUtil.DataKf = function(img)
{
    var data = PRImageDataUtil.DataRGBAi(img);
    var out  = new Float32Array(data.length / 4);

    var dataLen4 = data.length / 4;
    var i,i4;
    var i255 = 1.0 / 255,
        i3   = 1.0 / 3.0;

    i = -1;
    while(++i < dataLen4)
    {
        i4 = i * 4;
        out[i] = (data[i4] + data[i4+1] + data[i4+2]) * i3 * i255;
    }

    return out;
};

PRImageDataUtil.DataAf = function(img)
{
    var data = PRImageDataUtil.DataRGBAi(img);
    var out  = new Float32Array(data.length / 4);

    var dataLen4 = data.length / 4;
    var i = -1;
    var i255 = 1.0 / 255.0;

    while(++i < dataLen4)
    {
        out[i] = data[i * 4 + 3] * i255;
    }

    return out;
};


/*---------------------------------------------------------------------------------------------------------*/

PRImageDataUtil.floor = function(data)
{
    var i = -1;while(++i<data.length)data[i]|=0;
    return data;
};

