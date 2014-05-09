(function()
{   var app;


    /*---------------------------------------------------------------------------------------------------------*/

    function App(element)
    {
        GLKit.Application.apply(this,arguments);

        this.setSize(window.innerWidth,window.innerHeight);
        this.setTargetFPS(60);

        this._zoom = 12;

        var ratio = 152 / 512;

        this._imageDataWidth  = 128;
        this._imageDataHeight = 76;

        this._imageData = PRLogoTypeData.K128x76;



        var isoBand0 = this._isoBand0 = new GLKit.ISOBand(this._imageDataWidth,this._imageDataHeight,6,6*ratio);
        isoBand0.setData(this._imageData,this._imageDataHeight,this._imageDataWidth);

        var isoBand1 = this._isoBand1 = new GLKit.ISOBand(this._imageDataWidth,this._imageDataHeight,6,6*ratio);

        var func = function(x,y,time)
        {

            return Math.sin(x*y*300+time*10);
        };

        isoBand0.setFunction(func);
        isoBand1.setFunction(function(x,y,time){return Math.sin((y*(x-time)*10+time*0.025));});





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


        gl.clear3f(1,1,1);
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

        //this.drawSystem();

        /*---------------------------------------------------------------------------------------------------------*/

        var isoBand0 = this._isoBand0,
            isoBand1 = this._isoBand1;

        var edges0   = isoBand0.getEdges(),
            verts0   = isoBand0.getVertices(),
            indices0 = isoBand0.getIndices(),
            colors0  = new Float32Array(edges0.length/3*4);

        var edges1   = isoBand1.getEdges(),
            verts1   = isoBand1.getVertices(),
            indices1 = isoBand1.getIndices(),
            colors1  = new Float32Array(edges1.length/3*4);

        var sizeX0 = isoBand0.getVerticesSizeX(),
            sizeZ0 = isoBand0.getVerticesSizeZ();

        var sizeX1 = isoBand0.getVerticesSizeX(),
            sizeZ1 = isoBand0.getVerticesSizeZ();

        var i = 0;
        while(i < colors0.length)
        {

                colors0[i+0] = i/colors0.length;
                colors0[i+1] = 0.5;
                colors0[i+2] = 1;
                colors0[i+3] = 1;

              i+=4;
        }

        var index;

        var j;

        i = -1;
        while(++i < sizeZ0)
        {
            j = -1;
            while(++j < sizeX0)
            {
                index = (i * sizeX0 + j) * 4;


                //console.log(index);
                verts0[index+1] = Math.cos((-0.5+i/sizeZ0)*(-0.5+j/sizeX0)*Math.PI*20  + time*2)*0.0125*verts0[index+3];
                verts1[index+1] = Math.sin((-0.5+i/sizeZ0)*(-0.5+j/sizeX0)*Math.PI*20  + time*2)*0.0125*verts1[index+3];



            }

        }


        gl.drawMode(gl.LINES);
        gl.color3f(1,0,1);

        isoBand0.setData(this._imageData,this._imageDataHeight,this._imageDataWidth);
        isoBand0.applyFunctionMult(time);

        isoBand1.setData(this._imageData,this._imageDataHeight,this._imageDataWidth);
        isoBand1.applyFunctionMult(time);

        gl.lineWidth(1.8);
        gl.pushMatrix();

        gl.drawElements(edges0,null,colors0,null,indices0,gl.getDrawMode());

        gl.translate3f(0,0.1,0);

        gl.drawElements(edges1,null,gl.fillColorBuffer([1,0,0,1],colors1),null,indices1,gl.getDrawMode());

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
        app = new App(document.getElementById('canvasGLContainer'));
    });

    /*---------------------------------------------------------------------------------------------------------*/
})();