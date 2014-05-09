(function()
{
    /*---------------------------------------------------------------------------------------------------------*/

    function App(element)
    {
        GLKit.Application.apply(this,arguments);


        this._zoom = 0.5;

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
            vectorDataOffset = 2,
            charData       = this._charsData = new Array(vectorData2d.length - vectorDataOffset);

        var i = -1;
        var j;
        var k = vectorDataOffset - 1;
        var n = 1 / 500;
        var temp0,temp1,temp3;

        var x0,z0,x1,z1;


        while(++i < charData.length)
        {
            temp0 = vectorData2d[++k];
            temp1 = charData[i] = new Float32Array(temp0.length * 0.5 * 3);
            j = -1;
            while(++j < temp0.length * 0.5)
            {
                temp1[j * 3    ] = temp0[j * 2] * n;
                temp1[j * 3 + 1] = 0.0;
                temp1[j * 3 + 2] = temp0[j * 2 + 1] * n;

            }
        }

        /*---------------------------------------------------------------------------------------------------------*/

        var charTangents = this._charsTangents = new Array(charData.length);

        i = -1;

        while(++i < charData.length)
        {
            temp1 = charData[i];
            temp0 = charTangents[i] = new Array(temp1.length / 3);

            x1 = temp1[temp1.length - 3];
            z1 = temp1[temp1.length - 1];

            x0 = temp1[0];
            z0 = temp1[2];

            temp0[0] = Math.atan2(z1 - z0,
                                  x1 - x0);

            j = 0;
            while(++j < temp0.length - 1)
            {
                x1 = temp1[j*3  ];
                z1 = temp1[j*3+2];

                x0 = temp1[(j-1)*3  ];
                z0 = temp1[(j-1)*3+2];

                temp0[j] = Math.atan2(z1 - z0,
                                      x1 - x0);


            }

            x0 = temp1[temp1.length - 3];
            z0 = temp1[temp1.length - 1];

            x1 = temp1[0];
            z1 = temp1[2];

            temp0[temp0.length - 1] = Math.atan2(z1 - z0,
                                                 x1 - x0);

        }

        this._tempArrCircle = new Float32Array(9 * 3);
        this._tempArr0 = [];

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

        var light0 = this._light0;

        var zoom = this._zoom = GLKit.Math.lerp(this._zoom, 0.5 + this.getMouseWheelDelta() * 0.25, timeDelta * 0.0025);


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

            cam.setPosition3f(Math.cos(camRotX) * zoom,
                              zoom,
                              Math.sin(camRotX) * zoom);

        }

        cam.setTarget3f(0,0,0);
        cam.updateMatrices();

        gl.drawMode(gl.LINE_LOOP);

        this.drawSystem();

        /*---------------------------------------------------------------------------------------------------------*/

        var charsData     = this._charsDataOffset,
            charsTangents = this._charsTangents;

        var charPointCharge = 0.0125;

        var tempArr0 = this._tempArr0;

        var temp;
        var x, y, z, t, d;



        var i,j;


        gl.pushMatrix();
        gl.scale1f(3);
        gl.translate3f(-0.125,0,-0.125);



        gl.color1f(1);


        i = -1;
        while(++i < charsData.length)
        {
            gl.linev(charsData[i]);
        }


        /*
        gl.color3f(1,0,0);
        i = -1;
        while(++i < charsData.length)
        {
            j = -1;
            while(++j< charsData[i].length/3)this.circle2d(charsData[i][j*3],charsData[i][j*3+2],charPointCharge);

        }
          */
        gl.color1f(1.0);
        //gl.linev(charsData[0]);



        d = 0.025;
        gl.drawMode(gl.POINTS);
        gl.pointSize(2);
        i = -1;
        j = -1;
        while(++i < charsTangents.length)
        {
            while(tempArr0.length > 0)tempArr0.pop();

            j = -1;
            while(++j < charsTangents[i].length)
            {
                x = charsData[i][j*3  ];
                y = charsData[i][j*3+1];
                z = charsData[i][j*3+2];
                t = charsTangents[i][j] - Math.PI * 0.5;

                charPointCharge = 0.005 + Math.abs(Math.sin(i/charsTangents.length * Math.PI * 4 + time)) * 0.005 + Math.abs(Math.sin(j/charsTangents[i].length*Math.PI*4 + time * 4) * 0.005);

                tempArr0.push(x,y,z,
                    x+Math.cos(t) * charPointCharge,y,z + Math.sin(t) * charPointCharge);

                gl.drawMode(gl.LINE_STRIP);
                gl.color3f(1,0,0);
                this.circle2d(x,z,charPointCharge);


            }


            gl.color3f(1,1,1);
            temp = new Float32Array(tempArr0);
            gl.drawMode(gl.POINTS);
            gl.points(temp);
            gl.drawMode(gl.LINES);
            gl.linev(temp);


        }

        gl.pointSize(1);





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