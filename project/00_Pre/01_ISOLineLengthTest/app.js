(function()
{

    var app;

    var imagesLen    = 1,
        imagesLoaded = 0;
    var image0;

    /*---------------------------------------------------------------------------------------------------------*/

    function App(element)
    {
        GLKit.Application.apply(this,arguments);

        this.setSize(window.innerWidth,window.innerHeight);
        this.setTargetFPS(60);

        this._zoom = 12;

        var ratio = image0.height / image0.width;

        this._imageDataWidth  = 128;
        this._imageDataHeight = 76;
        this._imageDataWidth1  = 64;
        this._imageDataHeight1 = 38;
        this._imageDataWidth2  = 32;
        this._imageDataHeight2 = 19;

        this._imageData = PRImageDataUtil.floor(PRImageDataUtil.DataSliced(image0,this._imageDataWidth,this._imageDataHeight,PRImageDataFormat.Kf));
        this._imageData1 =PRImageDataUtil.floor(PRImageDataUtil.DataSliced(image0,this._imageDataWidth1,this._imageDataHeight1,PRImageDataFormat.Kf));
        this._imageData2 =PRImageDataUtil.floor(PRImageDataUtil.DataSliced(image0,this._imageDataWidth2,this._imageDataHeight2,PRImageDataFormat.Kf));


        var isoBand0 = this._isoBand0 = new GLKit.ISOBand(this._imageDataWidth,this._imageDataHeight,6,6*ratio);
        isoBand0.setData(this._imageData,this._imageDataHeight,this._imageDataWidth);
        var isoBand1 = this._isoBand1 = new GLKit.ISOBand(this._imageDataWidth1,this._imageDataHeight1,6,6*ratio);
        isoBand1.setData(this._imageData1,this._imageDataHeight1,this._imageDataWidth1);
        var isoBand2 = this._isoBand2 = new GLKit.ISOBand(this._imageDataWidth2,this._imageDataHeight2,6,6*ratio);
        isoBand2.setData(this._imageData2,this._imageDataHeight2,this._imageDataWidth2);

        var func = function(x,y,time)
            {

                return Math.sin(x*y*100+time*10);
            };

        isoBand0.setFunction(func);
        isoBand1.setFunction(func);
        isoBand2.setFunction(func);



    }

    App.prototype = Object.create(GLKit.Application.prototype);

    App.prototype.onWindowResize = function(){this.setSize(window.innerWidth,window.innerHeight);};

    App.prototype.update = function()
    {
        var gl        = this.gl,
            cam       = this.camera,
            time      = this.getSecondsElapsed(),
            timeDelta = this.getTimeDelta();

        var zoom = this._zoom = GLKit.Math.lerp(this._zoom, 12 + this.getMouseWheelDelta() * 0.25, timeDelta * 0.0025);


        gl.clear3f(0.1,0.1,0.1);
        gl.loadIdentity();

        gl.drawMode(gl.LINES);

        var camRotX,camRotY;

        if(this.isMouseDown())
        {
            camRotX = ( -1 + this.mouse.getX() / this.glWindow.getWidth() * 2.0 ) * Math.PI;
            camRotY = ( -1 + this.mouse.getY() / this.glWindow.getHeight() * 2.0) * Math.PI * 0.5;

            GLKit.Vec3.lerp3f(cam.position,
                Math.cos(camRotX) * zoom,
                Math.sin(camRotY) * zoom,
                Math.sin(camRotX) * zoom,
                timeDelta * 0.25);
        }
        else
        {
            cam.setPosition3f(0,zoom,0.0001);
        }

        cam.setTarget3f(0,0,0);
        cam.updateMatrices();

        gl.drawMode(gl.LINE_LOOP);

        this.drawSystem();

        /*---------------------------------------------------------------------------------------------------------*/

        var isoBand0 = this._isoBand0,
            isoBand1 = this._isoBand1,
            isoBand2 = this._isoBand2;


        gl.drawMode(gl.LINES);
        gl.color3f(1,0,1);

        isoBand0.setData(this._imageData,this._imageDataHeight,this._imageDataWidth);
        isoBand0.applyFunctionMult(time);
        isoBand0.march();

        isoBand1.setData(this._imageData1,this._imageDataHeight1,this._imageDataWidth1);
        isoBand1.applyFunctionMult(time);
        isoBand1.march();

        isoBand2.setData(this._imageData2,this._imageDataHeight2,this._imageDataWidth2);
        isoBand2.applyFunctionMult(time);
        isoBand2.march();

        var vertices0 = isoBand0.getVertices(),
            edges0    = isoBand0.getEdges(),
            indices0  = isoBand0.getIndices();

        var vertices1 = isoBand1.getVertices(),
            edges1    = isoBand1.getEdges(),
            indices1  = isoBand1.getIndices();


        gl.drawMode(gl.POINTS);
        gl.pointSize(2);gl.color1f(1);

        gl.drawMode(gl.LINES);

        gl.color3f(1,0,1);
        gl.drawGeometry(isoBand1);
        gl.pushMatrix();


        gl.translate3f(0,0.25,0);
        gl.color1f(1);
        gl.drawGeometry(isoBand0);

        gl.popMatrix();

        /*---------------------------------------------------------------------------------------------------------*/
    };

    /*---------------------------------------------------------------------------------------------------------*/

    App.prototype.drawSystem = function()
    {
        var gl = this.gl;

        gl.color1f(0.15);
        GLKit.GLUtil.drawGridCube(gl,6,1);

        gl.color1f(0.15);
        gl.pushMatrix();
        {
            gl.translate3f(0,-0.01,0);
            GLKit.GLUtil.drawGrid(gl,6,1);
        }
        gl.popMatrix();


    };

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