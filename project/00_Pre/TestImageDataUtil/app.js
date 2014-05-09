(function()
{
    var app;

    var imagesLen    = 3,
        imagesLoaded = 0;
    var image0,
        image1,
        image2;

    /*---------------------------------------------------------------------------------------------------------*/

    function App()
    {

        console.log('Image Data RGBAi\n');

        console.log(PRImageDataUtil.Data(image0,PRImageDataFormat.RGBAi));
        console.log(PRImageDataUtil.Data(image1,PRImageDataFormat.RGBAi));
        console.log(PRImageDataUtil.Data(image2,PRImageDataFormat.RGBAi));

        console.log('Image Data RGBi\n');

        console.log(PRImageDataUtil.Data(image0,PRImageDataFormat.RGBi));
        console.log(PRImageDataUtil.Data(image1,PRImageDataFormat.RGBi));
        console.log(PRImageDataUtil.Data(image2,PRImageDataFormat.RGBi));

        console.log('Image Data KAi\n');

        console.log(PRImageDataUtil.Data(image0,PRImageDataFormat.KAi));
        console.log(PRImageDataUtil.Data(image1,PRImageDataFormat.KAi));
        console.log(PRImageDataUtil.Data(image2,PRImageDataFormat.KAi));

        console.log('Image Data Ki\n');

        console.log(PRImageDataUtil.Data(image0,PRImageDataFormat.Ki));
        console.log(PRImageDataUtil.Data(image1,PRImageDataFormat.Ki));
        console.log(PRImageDataUtil.Data(image2,PRImageDataFormat.Ki));

        console.log('Image Data Ai\n');

        console.log(PRImageDataUtil.Data(image0,PRImageDataFormat.Ai));
        console.log(PRImageDataUtil.Data(image1,PRImageDataFormat.Ai));
        console.log(PRImageDataUtil.Data(image2,PRImageDataFormat.Ai));


        console.log('Image Data RGBAf\n');

        console.log(PRImageDataUtil.Data(image0,PRImageDataFormat.RGBAf));
        console.log(PRImageDataUtil.Data(image1,PRImageDataFormat.RGBAf));
        console.log(PRImageDataUtil.Data(image2,PRImageDataFormat.RGBAf));

        console.log('Image Data RGBf\n');

        console.log(PRImageDataUtil.Data(image0,PRImageDataFormat.RGBf));
        console.log(PRImageDataUtil.Data(image1,PRImageDataFormat.RGBf));
        console.log(PRImageDataUtil.Data(image2,PRImageDataFormat.RGBf));

        console.log('Image Data KAf\n');

        console.log(PRImageDataUtil.Data(image0,PRImageDataFormat.KAf));
        console.log(PRImageDataUtil.Data(image1,PRImageDataFormat.KAf));
        console.log(PRImageDataUtil.Data(image2,PRImageDataFormat.KAf));

        console.log('Image Data Kf\n');

        console.log(PRImageDataUtil.Data(image0,PRImageDataFormat.Kf));
        console.log(PRImageDataUtil.Data(image1,PRImageDataFormat.Kf));
        console.log(PRImageDataUtil.Data(image2,PRImageDataFormat.Kf));

        console.log('Image Data Af\n');

        console.log(PRImageDataUtil.Data(image0,PRImageDataFormat.Af));
        console.log(PRImageDataUtil.Data(image1,PRImageDataFormat.Af));
        console.log(PRImageDataUtil.Data(image2,PRImageDataFormat.Af));





    }


    /*---------------------------------------------------------------------------------------------------------*/

    window.addEventListener('load',function()
    {
        image0 = new Image();
        image0.addEventListener('load',onImageLoad);
        image0.src = '../../assets/ImgData_Black_8x8.jpg';

        image1 = new Image();
        image1.addEventListener('load',onImageLoad);
        image1.src = '../../assets/ImgData_White_8x8.jpg';

        image2 = new Image();
        image2.addEventListener('load',onImageLoad);
        image2.src = '../../assets/ImgData_WhiteBlack_8x8.jpg';
    });

    function onImageLoad()
    {
        imagesLoaded++;
        if(imagesLoaded == imagesLen)app = new App();
    }

    /*---------------------------------------------------------------------------------------------------------*/
})();