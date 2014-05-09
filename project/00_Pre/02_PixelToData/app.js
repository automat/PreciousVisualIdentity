(function()
{
    var image0,
        imagesLen = 1,
        imagesLoaded = 0;

    var app;

    /*---------------------------------------------------------------------------------------------------------*/

    function App()
    {

        this._imageDataWidth  = 128;
        this._imageDataHeight = 76;
        this._imageDataWidth1  = 64;
        this._imageDataHeight1 = 38;
        this._imageDataWidth2  = 32;
        this._imageDataHeight2 = 19;

        this._imageData = PRImageDataUtil.floor(PRImageDataUtil.DataSliced(image0,this._imageDataWidth,this._imageDataHeight,PRImageDataFormat.Kf));
        this._imageData1 =PRImageDataUtil.floor(PRImageDataUtil.DataSliced(image0,this._imageDataWidth1,this._imageDataHeight1,PRImageDataFormat.Kf));
        this._imageData2 =PRImageDataUtil.floor(PRImageDataUtil.DataSliced(image0,this._imageDataWidth2,this._imageDataHeight2,PRImageDataFormat.Kf));

        console.log(GLKit.Util.toArray(this._imageData));
    }


    /*---------------------------------------------------------------------------------------------------------*/

    window.addEventListener('load',function()
    {
        image0 = new Image();
        image0.addEventListener('load',onImageLoad);
        image0.src = '../../assets/130903_precious_id_logotype_inverted_512x152.jpg';
    });

    function onImageLoad()
    {
        imagesLoaded++;
        if(imagesLoaded == imagesLen)app = new App(document.getElementById('canvasGLContainer'));
    }

    /*---------------------------------------------------------------------------------------------------------*/
})();