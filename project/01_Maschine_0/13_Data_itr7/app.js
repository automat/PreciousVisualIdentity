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
            light0.setAmbient3f(0,0,0);
            light0.setDiffuse3f(0.8,0.8,0.8);
            light0.setSpecular3f(1,1,1);
            light0.setPosition3f(1,1,1);


        var material = this._material0 = new GLKit.Material();
            material.setDiffuse3f(0.15,0.15,0.15);
            material.setAmbient3f(0.15,0.15,0.15);
            material.setSpecular3f(1,1,1);

            material.shininess = 100.0;

        var logoData = PRLogoVectorData.Mx1,
            dataNorm = 1.0 / 500.0;

        var data;
        var buffer;
        var buffers = this._lineBuffers0 = [];

        var j;
        var i = 1;
        var len;
        while(++i < logoData.length)
        {
            len = logoData[i].length / 2;
            data = new Array((len + 1) * 3);
            j = -1;
            while(++j < len)
            {
                data[j*3  ] = logoData[i][j*2  ] * dataNorm;
                data[j*3+1] = 0;
                data[j*3+2] = logoData[i][j*2+1] * dataNorm;
            }

            data[data.length-3] = data[0];
            data[data.length-2] = data[1];
            data[data.length-1] = data[2];

            buffer = new GLKit.LineBuffer3d((data.length - 6) / 3,4,0.01);
            buffer.setPoints(data);
            buffer.update();
            buffer.updateVertexNormals();

            buffers.push(buffer);
        }

        logoData = PRLogoVectorData.Mx1;
        buffers = this._lineBuffers1 = [];
        i = 1;
        while(++i < logoData.length)
        {
            len = logoData[i].length / 2;
            data = new Array((len + 1) * 3);
            j = -1;
            while(++j < len)
            {
                data[j*3  ] = logoData[i][j*2  ] * dataNorm;
                data[j*3+1] = 0;
                data[j*3+2] = logoData[i][j*2+1] * dataNorm;
            }

            data[data.length-3] = data[0];
            data[data.length-2] = data[1];
            data[data.length-1] = data[2];

            buffer = new GLKit.LineBuffer3d((data.length - 6) / 3,2,0.01);
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


        gl.clear3f(0,0,0);
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

        material.setAmbient3f(PRColor.LIGHT_BLUE[0],PRColor.LIGHT_BLUE[1],PRColor.LIGHT_BLUE[2]);
        //åmaterial.setDiffuse3f(PRColor.LIGHT_BLUE[0],PRColor.LIGHT_BLUE[1],PRColor.LIGHT_BLUE[2]);

        gl.useLighting(true);
        gl.useMaterial(true);
        gl.light(this._light0);
        gl.material(material);


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

        var buffer0,
            buffer1;
        var buffers0 = this._lineBuffers0,
            buffers1 = this._lineBuffers1;
        var i = -1;
        var j;
        var k;
        var l;
        var bn = buffers0.length;
        var pn0,pn1;
        var cd;
        var arr;
        var x, y,z;
        var cr,cg,cb;
        var pNormed;
        while(++i < bn)
        {
            buffer0 = buffers0[i];
            pn0 = buffer0.getNumPoints();

            pNormed = i/bn;


            j = -1;
            while(++j < pn0)
            {
                buffer0.setDiameter(j,GLKit.Math.rect(Math.sin(j/pn0*Math.PI+ time ))*(0.0125 + Math.abs(Math.sin(i/bn*Math.PI*4+time)*0.025)));
            }

            buffer0.update();
            buffer0.updateVertexNormals();

            buffer1 = buffers1[i];
            pn1 = buffer1.getNumPoints();

            j = -1;
            while(++j < pn1)
            {
                buffer1.setDiameter(j,GLKit.Math.rect(Math.sin(j/pn1*Math.PI + Math.PI*2+ time*2))*(0.0025 + Math.abs(Math.sin(i/bn*Math.PI*4+time)*0.0028)));
            }

            buffer1.update();
            buffer1.updateVertexNormals();


            gl.color3f(0.25,0.75,0.75);
            gl.drawMode(gl.TRIANGLES);
            material.setDiffuse3f(0,0,0);
            gl.material(material);
            gl.drawGeometry(buffer0);

            cr = 255 / 255 * (1 - pNormed) + 255 / 255 * pNormed;
            cg = 210 / 255 * (1 - pNormed) + 1 /  255 * pNormed;
            cb = 10 / 255 * (1 - pNormed) + 150 / 255 * pNormed;

            material.setDiffuse3f(cr,cg,cb);
            gl.color3f(cr,cg,cb);
            gl.useLighting(false);

            gl.material(material);
            gl.drawGeometry(buffer1);

            gl.useMaterial(false);
            gl.useLighting(false);



            gl.pointSize(2);
            gl.drawMode(gl.POINTS);
            gl.color1f(1);

            j = -1;
            arr = [];
            while(++j < pn0)
            {
                k = -1;
                while(++k < buffer0.getNumSegments())
                {

                    l = (j * buffer0.getNumSegments() + k) * 3;
                    x = buffer0.vertices[l];
                    y = buffer0.vertices[l+1];
                    z = buffer0.vertices[l+2];

                    if((x!=0)&&(y!=0)&&(z!=0))
                    {

                        gl.point3f(x,y,z);
                       // arr.push(buffer.vertices[l],buffer.vertices[l+1],buffer.vertices[l+2]);
                    }//gl.point3f(buffer.vertices[l],buffer.vertices[l+1],buffer.vertices[l+2]);//buffer.setDiameter(j,GLKit.Math.rect(Math.sin(j/pn*Math.PI+ time * 2))*(0.0125 + Math.abs(Math.sin(i/bn*Math.PI*4+time)*0.025)));



                }



            }


            //gl.points(buffer.vertices);

            gl.color1f(0.25);
            gl.drawMode(gl.LINES);
            gl.linev(buffer0.vertices);





            //gl.drawElements(buffer0.vertices,null,gl.fillColorBuffer(gl.getColorBuffer(),buffer0.colors),null,buffer0.indices,gl.LINES);
            //gl.drawElements(buffer1.vertices,null,gl.fillColorBuffer(gl.getColorBuffer(),buffer1.colors),null,buffer1.indices,gl.LINES);


            gl.useMaterial(true);
            gl.useLighting(true);


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