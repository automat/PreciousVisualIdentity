(function()
{
    /*---------------------------------------------------------------------------------------------------------*/

    function App(element)
    {
        GLKit.Application.apply(this,arguments);

        this.setSize(window.innerWidth,window.innerHeight);
        this.setTargetFPS(60);

        this._zoom = 2;

        var light0 = this._light0 = new GLKit.Light(this.gl.LIGHT_0);
        light0.setAmbient3f(0,0,0);
        light0.setDiffuse3f(0.8,0.8,0.8);
        light0.setSpecular3f(1,1,1);
        light0.setPosition3f(1,1,1);

        var material = this._material0 = new GLKit.Material();
        material.setDiffuse3f(0.7,0.7,0.7);
        material.setAmbient3f(0.7,0.7,0.7);
        material.setSpecular3f(1,1,1);
        material.shininess = 20.0;

        /*---------------------------------------------------------------------------------------------------------*/

        var vectorData2d     = PRLogoVectorData.Mx1,
            vectorDataOffset = 2;

        var numObjs              = vectorData2d.length - vectorDataOffset,
            charsDataOffset      = this._charsDataOffset       = new Array(numObjs),
            charsDataOffsetClean = this._charsDataOffsetClean  = new Array(numObjs),
            charsDataOffsetInsideRemoved = this._charsDataOffsetInsideRem = new Array(numObjs),
            charsData            = this._charsData             = new Array(numObjs),
            charsDataOffsetPerimeter = this._charsDataOffsetPerimeter = new Array(numObjs);

        var splines = this._splines = new Array(numObjs);

        var i = -1;
        var j;
        var k = vectorDataOffset - 1;
        var n = 1 / 500;
        var temp0,temp1,temp2,temp3,temp4,temp5;


        while(++i < charsDataOffset.length)
        {
            temp3 = PRPolygonUtil.makeOptEdgeLength(vectorData2d[++k],1);
            temp2 = temp3.slice();//PRPolygonUtil.makeOptHeading(temp3);
            temp0 = PRPolygonUtil.makeInset(temp2.slice(), (i == 1 || i == 3 || i == 8) ? -5 : 20);
            temp1 = charsDataOffset[i] = new Float32Array(temp0.length * 0.5 * 3);
          //  temp4 = PRPolygonUtil.makeOptPointsInside(temp3);





            j = -1;
            while(++j < temp0.length * 0.5)
            {
                temp1[j * 3    ] = temp0[j * 2] * n;
                temp1[j * 3 + 1] = 0.0;
                temp1[j * 3 + 2] = temp0[j * 2 + 1] * n;
            }

            j = -1;
            temp1 = charsData[i] = new Float32Array(temp2.length * 0.5 * 3);
            while(++j < temp2.length * 0.5)
            {
                temp1[j * 3    ] = temp2[j * 2] * n;
                temp1[j * 3 + 1] = 0.0;
                temp1[j * 3 + 2] = temp2[j * 2 + 1] * n;
            }

            /*
            j = -1;
            temp5 = this._charsDataOffsetInsideRem[i] = new Float32Array(temp4.length * 0.5 * 3);
            while(++j < temp4.length * 0.5)
            {
                temp5[j * 3    ] = temp4[j * 2] * n;
                temp5[j * 3 + 1] = 0.0;
                temp5[j * 3 + 2] = temp4[j * 2 + 1] * n;

            }
            */

            temp3 = new Array();
            temp5 = PRPolygonUtil.makePerimeter(PRPolygonUtil.makeOptHeading(temp0),temp3);
            temp1 = charsDataOffsetPerimeter[i] = new Float32Array(temp3.length * 0.5 * 3);

            j = -1;
            while(++j < temp3.length * 0.5)
            {
                temp1[j * 3    ] = temp3[j * 2] * n;
                temp1[j * 3 + 1] = 0.0;
                temp1[j * 3 + 2] = temp3[j * 2 + 1] * n;

            }





            /*

             temp3 = splines[i] = new GLKit.Spline();
             temp3.setDetail(4);
             temp3.setPoints(charsDataOffset[i]);
             temp3.update();

             */
        }


        /*---------------------------------------------------------------------------------------------------------*/

        this._tempArrCircle = new Float32Array(9 * 3);
        this._tempArr0 = [];

        /*---------------------------------------------------------------------------------------------------------*/



    }

    App.prototype = Object.create(GLKit.Application.prototype);

    App.prototype.onWindowResize = function(){this.setSize(window.innerWidth,window.innerHeight);};

    App.prototype.update = function()
    {
        var gl        = this.gl,
            cam       = this.camera,
            time      = this.getSecondsElapsed(),
            timeDelta = this.getTimeDelta();

        var light0 = this._light0;

        var zoom = this._zoom = GLKit.Math.lerp(this._zoom, 2 + this.getMouseWheelDelta() * 0.25, timeDelta * 0.0025);


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
            camRotX = time * 0.25;

            cam.setPosition3f(0,
                              zoom,
                              0.001);

        }

        cam.setTarget3f(0,0,0);
        cam.updateMatrices();

        gl.drawMode(gl.LINE_LOOP);

        this.drawSystem();

        /*---------------------------------------------------------------------------------------------------------*/

        var charsDataOffset          = this._charsDataOffset,
            charsDataOffsetClean     = this._charsDataOffsetClean,
            charsDataOffsetInsideRem = this._charsDataOffsetInsideRem,
            charsData                = this._charsData,
            charsDataOffsetPerimeter = this._charsDataOffsetPerimeter





       var objLen = charsData.length;



        var i,j;


        gl.pushMatrix();
        gl.scale1f(3);

        gl.color3f(1,0,0);



        gl.translate3f(-0.5,0,-0.25 * 0.5 );

        var i = -1;
        while(++i < objLen)
        {

           // if(i == 1 || i == 3 || i == 8)continue;


            gl.color1f(1);
            gl.pointSize(4);



            gl.drawMode(gl.POINTS);
            gl.pointSize(4);
            //   gl.points(charsDataOffsetClean[i]);

            gl.lineWidth(2);
            gl.drawMode(gl.LINE_LOOP);
            gl.color1f(1);
            gl.linev(charsDataOffsetPerimeter[i]);
            gl.color1f(1);
            gl.lineWidth(1);
            // gl.linev(charsDataOffsetInsideRem[index]);
            gl.color1f(0.45);
            gl.points(charsDataOffset[i]);
            gl.linev(charsData[i]);
            gl.drawMode(gl.POINTS);
            gl.pointSize(4);

            gl.points(charsDataOffset[i]);
            gl.pointSize(10);
            gl.color3f(1,0,0);
            gl.point3f(charsDataOffset[i][0],0,charsDataOffset[i][2]);
            gl.color3f(0,0,1);
            gl.point3f(charsDataOffset[i][charsDataOffset[i].length-3],0,charsDataOffset[i][charsDataOffset[i].length-1]);
            gl.pointSize(4);

            gl.drawMode(gl.LINES);
            gl.color3f(1,0,0);

            var tempArr0 = this._tempArr0;
            while(tempArr0.length > 0)tempArr0.pop();
            j = -1;
            while(++j < charsDataOffset[i].length / 3)
            {
                tempArr0.push(charsDataOffset[i][j*3],0,charsDataOffset[i][j*3+2],charsData[i][j*3],0,charsData[i][j*3+2]);
            }

            gl.linev(new Float32Array(tempArr0));

        }









        gl.popMatrix();


        //STUFF goes here



        /*---------------------------------------------------------------------------------------------------------*/
    };

    App.prototype.circle2d = function(x,y,radius)
    {
        var l = 9,
            s = Math.PI * 2 / l;

        var a = this._tempArrCircle;


        var i = -1;
        while(++i < l){a[i*3] = x + Math.cos(s * i) * radius;a[i*3+1] = 0.0;a[i*3+2] = y + Math.sin(s * i) * radius;}
        this.gl.linev(a);

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

        gl.color1f(1);

        gl.pushMatrix();
        {
            gl.translate(this._light0.position);
            GLKit.GLUtil.octahedron(gl,0.075);
        }
        gl.popMatrix();
    };

    /*---------------------------------------------------------------------------------------------------------*/

    window.addEventListener('load',function()
    {
        var app = new App(document.getElementById('canvasGLContainer'));
    });

    /*---------------------------------------------------------------------------------------------------------*/
})();