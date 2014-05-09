(function()
{
    /*---------------------------------------------------------------------------------------------------------*/

    function App(element)
    {
        GLKit.Application.apply(this,arguments);

        this.setSize(window.innerWidth,window.innerHeight);
        this.setTargetFPS(60);

        this._zoom = 6;

        var light0 = this._light0 = new GLKit.Light(this.gl.LIGHT_0);
            light0.setAmbient3f(0.25,0.25,0.25);
            light0.setDiffuse3f(1,1,1);
            light0.setSpecular3f(1,1,1);
            light0.setPosition3f(1,1,1);


        var material = this._material0 = new GLKit.Material();
            material.setDiffuse3f(0.15,0.15,0.15);
            material.setAmbient3f(0.15,0.15,0.15);
            material.setSpecular3f(1,1,1);

            material.shininess = 1000.0;

        var logoData = PRLogoVectorData.Mx1,
            dataNorm = 1.0 / 500.0;

        var data;
        var buffer;
        var buffers = this._lineBuffers = [];

        var j;
        var i = 1;
        var len;
        while(++i < logoData.length)
        {
            len = logoData[i].length / 2;
            data = new Array(len * 3);
            j = -1;
            while(++j < len)
            {
                data[j*3  ] = logoData[i][j*2  ] * dataNorm;
                data[j*3+1] = 0;
                data[j*3+2] = logoData[i][j*2+1] * dataNorm;
            }

            buffer = new GLKit.LineBuffer3d((data.length - 1) / 3,12,0.005);
            buffer.setPoints(data);
            buffer.update();
            buffer.updateVertexNormals();

            buffers.push(buffer);
        }

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

        var zoom = this._zoom = GLKit.Math.lerp(this._zoom, 6 + this.getMouseWheelDelta() * 0.25, timeDelta * 0.0025);


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
            cam.setPosition3f(0.001,
                              zoom,
                              Math.sin(Math.PI*0.25));

        }

        cam.setTarget3f(0,0,0);
        cam.updateMatrices();

        gl.drawMode(gl.LINE_LOOP);

       // this.drawSystem();

        /*---------------------------------------------------------------------------------------------------------*/

        var material = this._material0;

        //material.setAmbient3f(PRColor.LIGHT_BLUE[0],PRColor.LIGHT_BLUE[1],PRColor.LIGHT_BLUE[2]);
        //åmaterial.setDiffuse3f(PRColor.LIGHT_BLUE[0],PRColor.LIGHT_BLUE[1],PRColor.LIGHT_BLUE[2]);

        //gl.useLighting(true);
        gl.useMaterial(true);
        gl.light(this._light0);



        gl.pushMatrix();
        gl.scale1f(8);
        gl.translate3f(-0.5,0,-0.15);

        /*
        var spline;
        var splines = this._splines;
        var i = -1;
        while(++i < splines.length)
        {
            spline = splines[i];

            gl.drawMode(gl.LINE_LOOP);
            gl.color3f(0.75,0,0.75);
            gl.linev(spline.vertices);
            gl.drawMode(gl.POINTS);
            gl.pointSize(2);
            gl.color3f(0.25,0.75,0.75);
            gl.points(spline.vertices);
        }
        */

        var buffer;
        var buffers = this._lineBuffers;
        var i = -1;
        var j;
        var bn = buffers.length;
        var pn;
        var cd;
        var arr = new Array(3 * 3);
        var cr,cg,cb;
        var n;




        while(++i < bn)
        {
            buffer = buffers[i];
            pn = buffer.getNumPoints();

            n = i / bn;


            j = -1;
            while(++j < pn)
            {
                buffer.setDiameter(j,GLKit.Math.rect(Math.sin(j/pn*Math.PI*Math.abs(Math.sin(i/bn*Math.PI*2+time)*3)+ time * 2))*(0.005 + Math.abs(Math.sin(i/bn*Math.PI*4+time)*0.02)));
            }

            buffer.update();
            buffer.updateVertexNormals();

            cr = PRColor.LIGHT_BLUE[0] * (1-n) + 255/255 * n;
            cg = PRColor.LIGHT_BLUE[1] * (1-n) + 89/255  * n;
            cb = PRColor.LIGHT_BLUE[2] * (1-n) + 152/255 * n;




            material.setAmbient3f(cr,cg,cb);
            material.setDiffuse3f(cr,cg,cb);
            material.setSpecular3f(1,1,1);
            gl.material(material);



            gl.color3f(cr,cg,cb);
            gl.drawMode(gl.TRIANGLES);
            gl.drawGeometry(buffer);

            gl.useMaterial(false);
            gl.useLighting(false);


            j = -1;
            while(++j < pn)
            {


            }

            gl.pointSize(1.5);
            gl.drawMode(gl.POINTS);
            gl.color1f(1);
            gl.points(buffer.vertices);

            gl.color3f(cr,cg,cb);
            gl.drawMode(gl.LINE_STRIP);
            //gl.linev(buffer.vertices);
            gl.linev(buffer.points);


            gl.useMaterial(true);
            //gl.useLighting(true);


        }

        gl.useMaterial(false);
        gl.useLighting(false);




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