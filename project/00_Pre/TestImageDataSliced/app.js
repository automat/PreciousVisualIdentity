(function()
{
    var app;

    var imagesLen    = 2,
        imagesLoaded = 0;
    var image0,
        image1;

    /*---------------------------------------------------------------------------------------------------------*/

    function App()
    {
        console.log(PRImageDataUtil.DataSliced(image0,4,2,PRImageDataFormat.Kf));
        console.log(PRImageDataUtil.DataSliced(image1,4,2,PRImageDataFormat.RGBi));
    }

    /*---------------------------------------------------------------------------------------------------------*/

    window.addEventListener('load',function()
    {
        image0 = new Image();
        image0.addEventListener('load',onImageLoad);
        image0.src = '../../assets/ImgData_WhiteBlack_8x8.jpg';

        image1 = new Image();
        image1.addEventListener('load',onImageLoad);
        image1.src = '../../assets/ImgData_WhiteBlack_16x8.jpg';

    });

    function onImageLoad()
    {
        imagesLoaded++;
        if(imagesLoaded == imagesLen)app = new App();
    }

    /*---------------------------------------------------------------------------------------------------------*/
})();