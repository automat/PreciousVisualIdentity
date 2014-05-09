(function()
{
    /*---------------------------------------------------------------------------------------------------------*/

    function App(element)
    {
        GLKit.Application.apply(this,arguments);

        this._zoom = 0.125;

        /*---------------------------------------------------------------------------------------------------------*/

        var charsDataVector     = PRLogoVectorData.Mx1,
            charsDataVectorLen  = charsDataVector.length,
            charsDataVectorNorm = 1 / 500;

        var charsDataVectorCurr;

        var charsData                     = this._charsData                     = new Array(charsDataVectorLen),
            charsDataOffset               = this._charsDataOffset               = new Array(charsDataVectorLen),
            charsDataOffsetPerimeter      = this._charsDataOffsetPerimeter      = new Array(charsDataVectorLen),
            charsDataOffsetPerimeterInner = this._charsDataOffsetPerimeterInner = new Array(charsDataVectorLen),
            charsDataOffsetPerimeterClose = this._charsDataOffsetPerimeterClose = new Array(charsDataVectorLen);

        var inset;
        var temp0,temp1,temp2;

        var i = -1;
        while(++i < charsDataVectorLen)
        {

            charsDataVectorCurr         = charsDataVector[i];//PRPolygonUtil.makeOptEdgeLength(charsDataVector[i],0);//PRPolygonUtil.makeOptEdgeLength(charsDataVector[i],5);
            charsDataVectorCurr         = PRPolygonUtil.makeSmoothedLinear(charsDataVectorCurr,10);//PRPolygonUtil.makeOptEdgeLength(charsDataVector[i],0);
            charsDataVectorCurr         = PRPolygonUtil.makeOptEdgeLength(charsDataVectorCurr,2);
            charsData[i]                = PRPolygonUtil.makePolygon3dFloat32(charsDataVectorCurr,charsDataVectorNorm);

            //is char data a punze ?
            inset = (i==1 || i == 3 || i == 5 || i == 10) ? 0 : 30;
            temp0 = PRPolygonUtil.makeInset(charsDataVectorCurr.slice(),inset);
            charsDataOffset[i]          = PRPolygonUtil.makePolygon3dFloat32(temp0,charsDataVectorNorm);

            PRPolygonUtil.makePerimeter(temp0,temp1 = []);
            charsDataOffsetPerimeter[i] = PRPolygonUtil.makePolygon3dFloat32(temp1,charsDataVectorNorm);

            inset = (i==1 || i == 3 || i == 5 || i == 10) ? 0 : 12;
            temp0 = PRPolygonUtil.makeInset(charsDataVectorCurr.slice(),inset);
            PRPolygonUtil.makePerimeter(temp0,temp2 = []);
            charsDataOffsetPerimeterInner[i] = PRPolygonUtil.makePolygon3dFloat32(temp2,charsDataVectorNorm);

            inset = (i==1 || i == 3 || i == 5 || i == 10) ? 0 : 3;
            temp0 = PRPolygonUtil.makeInset(charsDataVectorCurr.slice(),inset);
            PRPolygonUtil.makePerimeter(temp0,temp2 = []);
            charsDataOffsetPerimeterClose[i] = PRPolygonUtil.makePolygon3dFloat32(temp2,charsDataVectorNorm);



        }



        /*---------------------------------------------------------------------------------------------------------*/

        this.setSize(window.innerWidth,window.innerHeight);
        this.setTargetFPS(60);


    }

    App.prototype = Object.create(GLKit.Application.prototype);

    App.prototype.onWindowResize = function(){this.setSize(window.innerWidth,window.innerHeight);};

    App.prototype.update = function()
    {
        var gl        = this.gl,
            cam       = this.camera,
            time      = this.getSecondsElapsed(),
            timeDelta = this.getTimeDelta();

        var zoom = this._zoom = GLKit.Math.lerp(this._zoom, 0.125 + this.getMouseWheelDelta() * 0.25, timeDelta * 0.0025);

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

            cam.setPosition3f(0,
                              zoom,
                              0.001);

        }

        cam.setTarget3f(0,0,0);
        cam.updateMatrices();

        gl.drawMode(gl.LINE_LOOP);

        this.drawSystem();

        /*---------------------------------------------------------------------------------------------------------*/

        gl.pushMatrix();

        gl.translate3f(-0.5,0,-0.15);

        var charsData                     = this._charsData,
            charsDataOffset               = this._charsDataOffset,
            charsDataOffsetPerimeter      = this._charsDataOffsetPerimeter,
            charsDataOffsetPerimeterInner = this._charsDataOffsetPerimeterInner,
            charsDataOffsetPerimeterClose = this._charsDataOffsetPerimeterClose;

        var len = charsData.length;
        var i = 1;
        var j,l;
        var tempArr = [];

        while(++i < len)
        {
            gl.pushMatrix();

            gl.drawMode(gl.POINTS);

            gl.translate3f(0,0,0);

            gl.pointSize(2);
            gl.color3f(1,0,0);
            gl.point3f(charsData[i][0],
                       charsData[i][1],
                       charsData[i][2]);

            gl.color3f(0,0,1);
            gl.point3f(charsData[i][charsData[i].length-3],
                       charsData[i][charsData[i].length-2],
                       charsData[i][charsData[i].length-1]);


            gl.drawMode(gl.LINE_LOOP);
            gl.color1f(0.25);
            gl.lineWidth(1);
            gl.linev(charsData[i]);

            gl.translate3f(0,0.001,0);

            gl.color3f(0.5,0,0);

            j = -1;
            l = charsDataOffset[i].length / 3;

            while(tempArr.length > 0)tempArr.pop();
            while(++j < l)
            {
                tempArr.push(charsData[i][j*3],      charsData[i][j*3+1],      charsData[i][j*3+2],
                             charsDataOffset[i][j*3],charsDataOffset[i][j*3+1],charsDataOffset[i][j*3+2]);

            }
            gl.linev(tempArr);

            /*
            gl.drawMode(gl.POINTS);
            gl.pointSize(20);
            gl.color3f(1,0,0);
            gl.point3f(charsDataOffset[i][0],
                       charsDataOffset[i][1],
                       charsDataOffset[i][2]);

            gl.color3f(0,0,1);
            gl.point3f(charsDataOffset[i][charsDataOffset[i].length-3],
                       charsDataOffset[i][charsDataOffset[i].length-2],
                       charsDataOffset[i][charsDataOffset[i].length-1]);
                       */

            gl.translate3f(0,0.01,0);

            gl.drawMode(gl.LINE_LOOP);

            gl.lineWidth(1);
            gl.color1f(0.5);
            gl.linev(charsDataOffset[i]);

            gl.translate3f(0,0.01,0);

            gl.lineWidth(3);
            gl.color1f(1);
            gl.linev(charsDataOffsetPerimeter[i]);

            gl.translate3f(0,0.01,0);

            gl.lineWidth(4);
            gl.color3f(1,0,1);
            gl.linev(charsDataOffsetPerimeterInner[i]);

            gl.translate3f(0,0.01,0);

            gl.lineWidth(4);
            gl.color3f(1,1,0);
            gl.linev(charsDataOffsetPerimeterClose[i]);

            gl.popMatrix();
        }

        gl.lineWidth(1);

        gl.popMatrix();

        /*---------------------------------------------------------------------------------------------------------*/
    };


    /*---------------------------------------------------------------------------------------------------------*/

    App.prototype.drawSystem = function()
    {
        var gl = this.gl;

        gl.color1f(0.15);
        GLKit.GLUtil.drawGridCube(gl,8,1);

        gl.color1f(0.25);
        gl.pushMatrix();
        {
            gl.translate3f(0,-0.01,0);
            GLKit.GLUtil.drawGrid(gl,8,1);
        }
        gl.popMatrix();

        GLKit.GLUtil.drawAxes(gl,4);
    };

    /*---------------------------------------------------------------------------------------------------------*/

    window.addEventListener('load',function()
    {
        var app = new App(document.getElementById('canvasGLContainer'));
    });

    /*---------------------------------------------------------------------------------------------------------*/
})();