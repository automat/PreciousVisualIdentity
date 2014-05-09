(function()
{
    /*---------------------------------------------------------------------------------------------------------*/

    function App(element)
    {
        GLKit.Application.apply(this,arguments);


        this._zoom = 8;

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


        /*---------------------------------------------------------------------------------------------------------*/

        //ControlKit

        /*---------------------------------------------------------------------------------------------------------*/

        this.worldDrawGrid     = false;
        this.worldDrawColorBg  = [7,10,13];
        this.worldZoom         = 8;
        this.worldZoomRange    = [-20,20];
        this.worldDrawSphereBg = true;
        this.worldRotateSphere = true;


        this.worldTimeEnabled = true;
        this.worldTimeMult = 1;
        this.worldTimeMultRange = [-5,5];





        //Trail setup overall

        this.trail0SegNum = 4;
        this.trail1SegNum = 2;

        this.dataSetsString  = ['LOW','MEDIUM','HIGH'];
        this.dataSets        = [PRLogoVectorData.Lx1,PRLogoVectorData.Mx1,PRLogoVectorData.MHx1];

        this.trail0Data      = this.dataSets[2];
        this.trail0DataOffset = 1;
        this.trail1Data      = this.dataSets[2];
        this.trail1DataOffset = 1;


        //trail specs

        this.trailPointVertexTransfFuncsStrings =

            [
                'Static',
                'Random Hide',
                'Blobby Scale',
                'Scale Walk',
                '3 Segment Walk',
                '1 Segment Walk'

            ];

        this.trailPointVertexTransfFuncs =

            [
                function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return 1;},
                function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return GLKit.Math.rect(Math.sin(bufferPointIndex/bufferPointsNum - t))*(1+GLKit.Math.randomFloat(0.01,0.65));},
                function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return Math.abs(Math.sin(bufferIndex/buffersNum*Math.PI*10+t*2));},
                function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return GLKit.Math.rect(Math.sin(bufferPointIndex/bufferPointsNum * Math.PI * 2 - t))*bufferPointIndex/bufferPointsNum*2;},
                function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return GLKit.Math.rect(Math.sin(bufferPointIndex/bufferPointsNum * Math.PI * 3 - t));},
                function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return GLKit.Math.rect(Math.sin(bufferPointIndex/bufferPointsNum * Math.PI + t));},
                function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return GLKit.Math.rect(Math.sin(bufferPointIndex/bufferPointsNum * Math.PI * 2 + t * 2));}

            ];

        this.trailPointVertexScaleFuncsString =

            [
                'Static',
                'Blobby Scale'
            ];

        this.trailPointVertexScaleFuncs =

            [
                function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return 1;},
                function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return Math.abs(Math.sin(bufferIndex/buffersNum*Math.PI*4+t))}

            ];

        this.trailDrawLinesSizeRange = [0,10];
        this.trailDrawPointsSizeRange = [0,10];
        this.trailPointVertexScaleRange  = [0,0.5];


        //TRAIL 0

        this.trail0Enabled = true;

        this.trail0DrawTrianglesEnabled      = true;
        this.trail0DrawMaterialLightEnabled  = true;

        this.trail0DrawMaterialInterpolate = false;

        this.trail0DrawMaterial0ColorAmbient  = [0,0,0];
        this.trail0DrawMaterial0ColorDiffuse  = [0,0,0];
        this.trail0DrawMaterial0ColorSpecular = [255,255,255];
        this.trail0DrawMaterial0Shininess     = 100.0;

        this.trail0DrawMaterial1ColorAmbient  = [0,0,0];
        this.trail0DrawMaterial1ColorDiffuse  = [0,0,0];
        this.trail0DrawMaterial1ColorSpecular = [255,255,255];
        this.trail0DrawMaterial1Shininess     = 100.0;

        this.trail0DrawLinesEnabled          = true;
        this.trail0DrawPointsEnabled         = true;
        this.trail0DrawPointsWeightedEnabled = true;

        this.trail0DrawLinesSize = 1;
        this.trail0DrawPointsSize0 = 2;
        this.trail0DrawPointsSize1 = 0;

        this.trail0PointVertexScaleMin    = 0.0125;
        this.trail0PointVertexScaleMax    = 0.0125;

        this.trail0PointVertexTransfFunc  = this.trailPointVertexTransfFuncs[5];
        this.trail0PointVertexScaleFunc   = this.trailPointVertexScaleFuncs[1];

        this.trail0DrawPointsColor0 = [255,255,255];
        this.trail0DrawPointsColor1 = [255,255,255];
        this.trail0DrawLinesColor   = [64,64,64];

        /*---------------------------------------------------------------------------------------------------------*/

        //TRAIL 1

        this.trail1Enabled = true;

        this.trail1DrawTrianglesEnabled      = true;
        this.trail1DrawMaterialLightEnabled  = false;

        this.trail1DrawMaterialInterpolate = true;

        this.trail1DrawMaterial0ColorAmbient  = [0,0,0];
        this.trail1DrawMaterial0ColorDiffuse  = [255,210,10];
        this.trail1DrawMaterial0ColorSpecular = [255,255,255];
        this.trail1DrawMaterial0Shininess     = 100.0;

        this.trail1DrawMaterial1ColorAmbient  = [0,0,0];
        this.trail1DrawMaterial1ColorDiffuse  = [255,1,150];
        this.trail1DrawMaterial1ColorSpecular = [255,255,255];
        this.trail1DrawMaterial1Shininess     = 100.0;

        this.trail1DrawLinesEnabled          = false;
        this.trail1DrawPointsEnabled         = false;
        this.trail1DrawPointsWeightedEnabled = false;

        this.trail1DrawLinesSize   = 1;
        this.trail1DrawPointsSize0 = 2;
        this.trail1DrawPointsSize1 = 0;

        this.trail1PointVertexScaleMin    = 0.0025;
        this.trail1PointVertexScaleMax    = 0.0028;

        this.trail1PointVertexTransfFunc  = this.trailPointVertexTransfFuncs[4];
        this.trail1PointVertexScaleFunc   = this.trailPointVertexScaleFuncs[1];

        this.trail1DrawPointsColor0 = [255,255,255];
        this.trail1DrawPointsColor1 = [255,255,255];
        this.trail1DrawLinesColor   = [64,64,64];



        /*---------------------------------------------------------------------------------------------------------*/

        /*---------------------------------------------------------------------------------------------------------*/

        this._lineBuffers0 = [];
        this._lineBuffers1 = [];

        this._initBuffer(this.trail0Data,this.trail0DataOffset,this.trail0SegNum,this._lineBuffers0);
        this._initBuffer(this.trail1Data,this.trail1DataOffset,this.trail1SegNum,this._lineBuffers1);


        var sphereXLen   = 19,
            sphereYLen   = 15,
            sphereRadius = 20;

        var theta,gamma;

        var sphereVertices = this._sphereVertices = [];

        i = -1;
        while(++i < sphereXLen)
        {
            theta = i / sphereXLen * Math.PI * 2;
            j = -1;
            while(++j < sphereYLen)
            {
                gamma = j / sphereYLen * Math.PI;
                sphereVertices.push(sphereRadius * Math.cos(theta) * Math.sin(gamma),
                                    sphereRadius * Math.sin(theta) * Math.sin(gamma),
                                    sphereRadius * Math.cos(gamma));

            }
        }

        this._sphereVertices = new Float32Array(this._sphereVertices);

        this._tempArr0 = [];
        this._tempArr1 = [];

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
            time      = this.getSecondsElapsed() * this.worldTimeEnabled * this.worldTimeMult,
            timeDelta = this.getTimeDelta();


        var zoom = this._zoom = GLKit.Math.lerp(this._zoom, this.worldZoom, timeDelta * 0.025);
        var worldDrawColorBg = this.worldDrawColorBg;



        gl.clear3f(worldDrawColorBg[0]/255,worldDrawColorBg[1]/255,worldDrawColorBg[2]/255);
        gl.loadIdentity();

        gl.drawMode(gl.LINES);

        var camRotX,camRotY;

        if(this.isKeyDown() && this.isMouseDown())
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

        if(this.worldDrawGrid)this.drawSystem();

        /*---------------------------------------------------------------------------------------------------------*/
        /*---------------------------------------------------------------------------------------------------------*/

        var material = this._material0;
        var light0 = this._light0;




        if(this.worldDrawSphereBg)
        {
            gl.drawMode(gl.POINTS);
            gl.color1f(0.75);
            gl.pointSize(1);
            gl.pushMatrix();
            if(this.worldRotateSphere)
            gl.rotate3f(Math.sin(time * 0.0125) * Math.PI,
                        Math.sin(time * 0.025)  * Math.PI,
                        Math.sin(time * 0.0125) * Math.PI);

            gl.points(this._sphereVertices);
            gl.popMatrix();

        }


        gl.useMaterial(true);
        gl.useLighting(true);
        gl.light(light0);


        gl.pushMatrix();
        gl.scale1f(8);
        gl.translate3f(-0.5,0,-0.15);

        var i, j, k, l, m;

        var buffers,buffer,buffersLen,bufferSegNum;
        var bufferPointVertexTransfFunc,
            bufferPointVertexScaleFunc,
            bufferPointVertexScaleMin,
            bufferPointVertexScaleMax;

        var numBufferPoints;
        var pointNormed,
            pointNormedInv;

        var drawTrianglesEnabled,
            drawPointsEnabled,
            drawPointsWeightedEnabled,
            drawLinesEnabled;

        var drawMaterialInterpolate,
            drawMaterialLightEnabled;

        var drawMaterial0ColorAmbient,
            drawMaterial0ColorDiffuse,
            drawMaterial0ColorSpecular,
            drawMaterial0ColorShininess,
            drawMaterial1ColorAmbient,
            drawMaterial1ColorDiffuse,
            drawMaterial1ColorSpecular,
            drawMaterial1ColorShininess;

        var drawPointsColor0,
            drawPointsColor1,
            drawLinesColor;



        var drawPointsSize0,
            drawPointsSize1,
            drawLinesSize;

        var tempArr0 = this._tempArr0,
            tempArr1 = this._tempArr1;

        var x, y, z;



        if(this.trail0Enabled)
        {

            buffers      = this._lineBuffers0;
            buffersLen   = buffers.length;

            material.setDiffuse3f(0,0,0);

            drawPointsColor0 = this.trail0DrawPointsColor0;
            drawPointsColor1 = this.trail0DrawPointsColor1;
            drawLinesColor   = this.trail0DrawLinesColor;

            drawPointsSize0 = this.trail0DrawPointsSize0;
            drawPointsSize1 = this.trail0DrawPointsSize1;
            drawLinesSize   = this.trail0DrawLinesSize;

            bufferPointVertexTransfFunc = this.trail0PointVertexTransfFunc;
            bufferPointVertexScaleFunc  = this.trail0PointVertexScaleFunc;
            bufferPointVertexScaleMin   = this.trail0PointVertexScaleMin;
            bufferPointVertexScaleMax   = this.trail0PointVertexScaleMax;

            drawMaterialInterpolate     = this.trail0DrawMaterialInterpolate;
            drawMaterialLightEnabled    = this.trail0DrawMaterialLightEnabled;
            drawMaterial0ColorAmbient   = this.trail0DrawMaterial0ColorAmbient;
            drawMaterial0ColorDiffuse   = this.trail0DrawMaterial0ColorDiffuse;
            drawMaterial0ColorSpecular  = this.trail0DrawMaterial0ColorSpecular;
            drawMaterial0ColorShininess = this.trail0DrawMaterial0Shininess;
            drawMaterial1ColorAmbient   = this.trail0DrawMaterial1ColorAmbient;
            drawMaterial1ColorDiffuse   = this.trail0DrawMaterial1ColorDiffuse;
            drawMaterial1ColorSpecular  = this.trail0DrawMaterial1ColorSpecular;
            drawMaterial1ColorShininess = this.trail0DrawMaterial1Shininess;


            i = -1;
            while(++i < buffersLen)
            {
                buffer          = buffers[i];
                numBufferPoints = buffer.getNumPoints();
                pointNormed     = i / buffersLen;
                pointNormedInv  = 1 - pointNormed;

                j = -1;
                while(++j < numBufferPoints)
                {
                    buffer.setDiameter(j,bufferPointVertexTransfFunc(i,buffersLen,j,numBufferPoints,time) *
                                         (bufferPointVertexScaleMin +
                                          bufferPointVertexScaleFunc(i,buffersLen,j,numBufferPoints,time) *
                                          bufferPointVertexScaleMax));
                }

                buffer.update();

                if(this.trail0DrawTrianglesEnabled)
                {
                    buffer.updateVertexNormals();


                    if(!drawMaterialInterpolate)
                    {
                        material.setAmbient3f(drawMaterial0ColorAmbient[0]/255.0,
                                              drawMaterial0ColorAmbient[1]/255.0,
                                              drawMaterial0ColorAmbient[2]/255.0);

                        material.setDiffuse3f(drawMaterial0ColorDiffuse[0]/255.0,
                                              drawMaterial0ColorDiffuse[1]/255.0,
                                              drawMaterial0ColorDiffuse[2]/255.0);

                        material.setSpecular3f(drawMaterial0ColorSpecular[0]/255.0,
                                               drawMaterial0ColorSpecular[1]/255.0,
                                               drawMaterial0ColorSpecular[2]/255.0);

                        material.shininess = drawMaterial0ColorShininess;



                    }
                    else
                    {
                        material.setAmbient3f((drawMaterial0ColorAmbient[0] * pointNormedInv + drawMaterial1ColorAmbient[0] * pointNormed)/255.0,
                                              (drawMaterial0ColorAmbient[1] * pointNormedInv + drawMaterial1ColorAmbient[1] * pointNormed)/255.0,
                                              (drawMaterial0ColorAmbient[2] * pointNormedInv + drawMaterial1ColorAmbient[2] * pointNormed)/255.0);

                        material.setDiffuse3f((drawMaterial0ColorDiffuse[0] * pointNormedInv + drawMaterial1ColorDiffuse[0] * pointNormed)/255.0,
                                              (drawMaterial0ColorDiffuse[1] * pointNormedInv + drawMaterial1ColorDiffuse[1] * pointNormed)/255.0,
                                              (drawMaterial0ColorDiffuse[2] * pointNormedInv + drawMaterial1ColorDiffuse[2] * pointNormed)/255.0);

                        material.setSpecular3f((drawMaterial0ColorSpecular[0] * pointNormedInv + drawMaterial1ColorSpecular[0] * pointNormed)/255.0,
                                               (drawMaterial0ColorSpecular[1] * pointNormedInv + drawMaterial1ColorSpecular[1] * pointNormed)/255.0,
                                               (drawMaterial0ColorSpecular[2] * pointNormedInv + drawMaterial1ColorSpecular[2] * pointNormed)/255.0);

                        material.shininess = drawMaterial0ColorShininess * pointNormedInv + drawMaterial1ColorShininess * pointNormed;
                    }

                    if(!drawMaterialLightEnabled)
                    {
                        gl.useLighting(false);
                        gl.useMaterial(false);
                        gl.color3f(material.diffuse[0],material.diffuse[1],material.diffuse[2]);
                    }
                    else
                    {
                        gl.material(material);
                    }

                    gl.drawMode(gl.TRIANGLES);
                    gl.drawGeometry(buffer);

                }

                gl.useMaterial(false);
                gl.useLighting(false);


                if(this.trail0DrawPointsEnabled)
                {
                    gl.drawMode(gl.POINTS);

                    gl.color3f(drawPointsColor0[0]/255.0,
                               drawPointsColor0[1]/255.0,
                               drawPointsColor0[2]/255.0);

                    gl.pointSize(drawPointsSize0);

                    bufferSegNum = buffer.getNumSegments();

                    if(this.trail0DrawPointsWeightedEnabled)
                    {
                        while(tempArr0.length > 0)tempArr0.pop();
                        while(tempArr1.length > 0)tempArr1.pop();

                        j = -1;
                        while(++j < numBufferPoints)
                        {
                            k = -1;
                            while(++k < bufferSegNum)
                            {
                                l = (j * bufferSegNum + k) * 3;

                                x = buffer.vertices[l  ];
                                y = buffer.vertices[l+1];
                                z = buffer.vertices[l+2];

                                if((x!=0)&&(y!=0)&&(z!=0))tempArr0.push(x,y,z);else tempArr1.push(x,y,z);
                            }
                        }

                        if(drawPointsSize0 > 0)gl.points(new Float32Array(tempArr0));
                        if(drawPointsSize1 > 0)
                        {
                            gl.color3f(drawPointsColor1[0]/255.0,
                                       drawPointsColor1[1]/255.0,
                                       drawPointsColor1[2]/255.0);

                            gl.pointSize(drawPointsSize1);
                            gl.points(new Float32Array(tempArr1));

                        }
                    }
                    else
                    {
                        if(drawPointsSize0>0)gl.points(buffer.vertices);
                    }
                }

                if(this.trail0DrawLinesEnabled)
                {
                    gl.drawMode(gl.LINES);
                    gl.lineWidth(drawLinesSize);
                    gl.color3f(drawLinesColor[0]/255.0,
                               drawLinesColor[1]/255.0,
                               drawLinesColor[2]/255.0);

                    gl.linev(buffer.vertices);

                }

                gl.useMaterial(true);
                gl.useLighting(true);
            }


        }

        gl.useMaterial(false);
        gl.useLighting(false);

        if(this.trail1Enabled)
        {
            buffers      = this._lineBuffers1;
            buffersLen   = buffers.length;

            material.setDiffuse3f(0,0,0);

            drawPointsColor0 = this.trail1DrawPointsColor0;
            drawPointsColor1 = this.trail1DrawPointsColor1;
            drawLinesColor   = this.trail1DrawLinesColor;

            drawPointsSize0 = this.trail1DrawPointsSize0;
            drawPointsSize1 = this.trail1DrawPointsSize1;
            drawLinesSize   = this.trail1DrawLinesSize;

            bufferPointVertexTransfFunc = this.trail1PointVertexTransfFunc;
            bufferPointVertexScaleFunc  = this.trail1PointVertexScaleFunc;
            bufferPointVertexScaleMin   = this.trail1PointVertexScaleMin;
            bufferPointVertexScaleMax   = this.trail1PointVertexScaleMax;

            drawMaterialInterpolate     = this.trail1DrawMaterialInterpolate;
            drawMaterialLightEnabled    = this.trail1DrawMaterialLightEnabled;
            drawMaterial0ColorAmbient   = this.trail1DrawMaterial0ColorAmbient;
            drawMaterial0ColorDiffuse   = this.trail1DrawMaterial0ColorDiffuse;
            drawMaterial0ColorSpecular  = this.trail1DrawMaterial0ColorSpecular;
            drawMaterial0ColorShininess = this.trail1DrawMaterial0Shininess;
            drawMaterial1ColorAmbient   = this.trail1DrawMaterial1ColorAmbient;
            drawMaterial1ColorDiffuse   = this.trail1DrawMaterial1ColorDiffuse;
            drawMaterial1ColorSpecular  = this.trail1DrawMaterial1ColorSpecular;
            drawMaterial1ColorShininess = this.trail1DrawMaterial1Shininess;

            drawTrianglesEnabled = this.trail1DrawTrianglesEnabled;
            drawPointsEnabled    = this.trail1DrawPointsEnabled;
            drawPointsWeightedEnabled = this.trail1DrawPointsWeightedEnabled;
            drawLinesEnabled          = this.trail1DrawLinesEnabled;


            i = -1;
            while(++i < buffersLen)
            {
                buffer          = buffers[i];
                numBufferPoints = buffer.getNumPoints();
                pointNormed     = i / buffersLen;
                pointNormedInv  = 1 - pointNormed;

                j = -1;
                while(++j < numBufferPoints)
                {
                    buffer.setDiameter(j,bufferPointVertexTransfFunc(i,buffersLen,j,numBufferPoints,time) *
                                         (bufferPointVertexScaleMin +
                                          bufferPointVertexScaleFunc(i,buffersLen,j,numBufferPoints,time) *
                                          bufferPointVertexScaleMax));
                }

                buffer.update();

                if(drawTrianglesEnabled)
                {
                    buffer.updateVertexNormals();


                    if(!drawMaterialInterpolate)
                    {
                        material.setAmbient3f(drawMaterial0ColorAmbient[0]/255.0,
                                              drawMaterial0ColorAmbient[1]/255.0,
                                              drawMaterial0ColorAmbient[2]/255.0);

                        material.setDiffuse3f(drawMaterial0ColorDiffuse[0]/255.0,
                                              drawMaterial0ColorDiffuse[1]/255.0,
                                              drawMaterial0ColorDiffuse[2]/255.0);

                        material.setSpecular3f(drawMaterial0ColorSpecular[0]/255.0,
                                               drawMaterial0ColorSpecular[1]/255.0,
                                               drawMaterial0ColorSpecular[2]/255.0);

                        material.shininess = drawMaterial0ColorShininess;



                    }
                    else
                    {
                        material.setAmbient3f((drawMaterial0ColorAmbient[0] * pointNormedInv + drawMaterial1ColorAmbient[0] * pointNormed)/255.0,
                                              (drawMaterial0ColorAmbient[1] * pointNormedInv + drawMaterial1ColorAmbient[1] * pointNormed)/255.0,
                                              (drawMaterial0ColorAmbient[2] * pointNormedInv + drawMaterial1ColorAmbient[2] * pointNormed)/255.0);

                        material.setDiffuse3f((drawMaterial0ColorDiffuse[0] * pointNormedInv + drawMaterial1ColorDiffuse[0] * pointNormed)/255.0,
                                              (drawMaterial0ColorDiffuse[1] * pointNormedInv + drawMaterial1ColorDiffuse[1] * pointNormed)/255.0,
                                              (drawMaterial0ColorDiffuse[2] * pointNormedInv + drawMaterial1ColorDiffuse[2] * pointNormed)/255.0);

                        material.setSpecular3f((drawMaterial0ColorSpecular[0] * pointNormedInv + drawMaterial1ColorSpecular[0] * pointNormed)/255.0,
                                               (drawMaterial0ColorSpecular[1] * pointNormedInv + drawMaterial1ColorSpecular[1] * pointNormed)/255.0,
                                               (drawMaterial0ColorSpecular[2] * pointNormedInv + drawMaterial1ColorSpecular[2] * pointNormed)/255.0);

                        material.shininess = drawMaterial0ColorShininess * pointNormedInv + drawMaterial1ColorShininess * pointNormed;
                    }

                    if(!drawMaterialLightEnabled)
                    {
                        gl.useLighting(false);
                        gl.useMaterial(false);
                        gl.color3f(material.diffuse[0],material.diffuse[1],material.diffuse[2]);
                    }
                    else
                    {
                        gl.material(material);
                    }

                    gl.drawMode(gl.TRIANGLES);
                    gl.drawGeometry(buffer);

                }

                gl.useMaterial(false);
                gl.useLighting(false);


                if(drawPointsEnabled)
                {
                    gl.drawMode(gl.POINTS);

                    gl.color3f(drawPointsColor0[0]/255.0,
                        drawPointsColor0[1]/255.0,
                        drawPointsColor0[2]/255.0);

                    gl.pointSize(drawPointsSize0);

                    bufferSegNum = buffer.getNumSegments();

                    if(drawPointsWeightedEnabled)
                    {
                        while(tempArr0.length > 0)tempArr0.pop();
                        while(tempArr1.length > 0)tempArr1.pop();

                        j = -1;
                        while(++j < numBufferPoints)
                        {
                            k = -1;
                            while(++k < bufferSegNum)
                            {
                                l = (j * bufferSegNum + k) * 3;

                                x = buffer.vertices[l  ];
                                y = buffer.vertices[l+1];
                                z = buffer.vertices[l+2];

                                if((x!=0)&&(y!=0)&&(z!=0))tempArr0.push(x,y,z);else tempArr1.push(x,y,z);
                            }
                        }

                        if(drawPointsSize0 > 0)gl.points(new Float32Array(tempArr0));
                        if(drawPointsSize1 > 0)
                        {
                            gl.color3f(drawPointsColor1[0]/255.0,
                                drawPointsColor1[1]/255.0,
                                drawPointsColor1[2]/255.0);

                            gl.pointSize(drawPointsSize1);
                            gl.points(new Float32Array(tempArr1));

                        }
                    }
                    else
                    {
                        if(drawPointsSize0>0)gl.points(buffer.vertices);
                    }
                }

                if(drawLinesEnabled)
                {
                    gl.drawMode(gl.LINES);
                    gl.lineWidth(drawLinesSize);
                    gl.color3f(drawLinesColor[0]/255.0,
                               drawLinesColor[1]/255.0,
                               drawLinesColor[2]/255.0);

                    gl.linev(buffer.vertices);

                }

                gl.useMaterial(true);
                gl.useLighting(true);
            }

        }

        gl.popMatrix();

        gl.pointSize(1);
        gl.lineWidth(1);

        gl.useMaterial(false);
        gl.useLighting(false);




        /*---------------------------------------------------------------------------------------------------------*/
    };

    /*---------------------------------------------------------------------------------------------------------*/

    App.prototype.drawSystem = function()
    {
        var gl = this.gl;

        gl.color1f(0.05);
        GLKit.GLUtil.drawGridCube(gl,8,1);

        gl.color1f(0.08);
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

    /*---------------------------------------------------------------------------------------------------------
     *
     *
     *
     *
     *---------------------------------------------------------------------------------------------------------*/




    App.prototype._initBuffer = function(vectorData,vectorDataOffset,buffersSegNum,targetBuffers)
    {
        targetBuffers.length = 0;

        var vectorDataNorm = 1.0 / 500.0;
        var i, j;

        var vectorDataSub;
        var data,dataNumPoints;

        var buffer;

        i = vectorDataOffset;
        while(++i < vectorData.length)
        {
            vectorDataSub = vectorData[i];
            dataNumPoints = vectorDataSub.length * 0.5;
            data          = new Array(dataNumPoints * 3);

            //converert sub data to 3d
            j = -1;
            while(++j < dataNumPoints)
            {
                data[j*3  ] = vectorDataSub[j*2  ] * vectorDataNorm;
                data[j*3+1] = 0.0;
                data[j*3+2] = vectorDataSub[j*2+1] * vectorDataNorm;
            }

            data[data.length - 3] = data[0];
            data[data.length - 2] = data[1];
            data[data.length - 1] = data[2];

            buffer = new GLKit.LineBuffer3d(dataNumPoints,buffersSegNum,0.01);
            buffer.setPoints(data);
            buffer.update();
            buffer.updateVertexNormals();

            targetBuffers.push(buffer);
         }
    };

    App.prototype.onTrail0DataChange = function()
    {
        this.trail0SegNum     = Math.max(2,Math.min(this.trail0SegNum,100));
        this.trail0DataOffset = Math.max(0,Math.min(this.trail0DataOffset,this.trail0Data.length-1));
        this._initBuffer(this.trail0Data,this.trail0DataOffset,this.trail0SegNum,this._lineBuffers0);

    };

    App.prototype.onTrail1DataChange = function()
    {
        this.trail1SegNum     = Math.max(2,Math.min(this.trail1SegNum,100));
        this.trail1DataOffset = Math.max(0,Math.min(this.trail1DataOffset,this.trail1Data.length-1));
        this._initBuffer(this.trail1Data,this.trail1DataOffset,this.trail1SegNum,this._lineBuffers1);
    };



    /*---------------------------------------------------------------------------------------------------------
     *
     *
     *
     *
     *---------------------------------------------------------------------------------------------------------*/

    window.addEventListener('load',function()
    {
        var app = new App(document.getElementById('canvasGLContainer'));

        /*---------------------------------------------------------------------------------------------------------*/

        var onAppTrail0DataChange = app.onTrail0DataChange.bind(app),
            onAppTrail1DataChange = app.onTrail1DataChange.bind(app);


        var controlKit = new ControlKit.Kit();

        app.setKeyListenerTarget(document);
        app.setMouseListenerTarget(document);


        var geomPanel  = controlKit.addPanel({width:300,align:'right',label:'Geom Settings',opacity:0.85});
        var group      = geomPanel.addGroup({label:'Data',enable:false});
            group.addSubGroup({label:'Trail 1'})
                 .addCheckbox(app,'trail0Enabled',{label:'Enabled'})
                 .addSelect(app,'dataSetsString',{label:'Data Res',onChange:function(index){console.log(index);app.trail0Data =  app.dataSets[index];onAppTrail0DataChange();}})
                 .addNumberInput(app,'trail0DataOffset',{label:'Data Offset',onChange:onAppTrail0DataChange})
                 .addNumberInput(app,'trail0SegNum',{label:'Segments',onChange:onAppTrail0DataChange});
            group.addSubGroup({label:'Trail 2'})
                 .addCheckbox(app,'trail1Enabled',{label:'Enabled'})
                 .addSelect(app,'dataSetsString',{label:'Data Res',onChange:function(index){app.trail1Data =  app.dataSets[index];onAppTrail1DataChange();}})
                 .addNumberInput(app,'trail1DataOffset',{label:'Data Offset',onChange:onAppTrail1DataChange})
                 .addNumberInput(app,'trail1SegNum',{label:'Segments',onChange:onAppTrail1DataChange});

            group = geomPanel.addGroup({label:'Visuals Trail 1'});
            group.addSubGroup({label:'Segments'})
                 .addSelect(app,'trailPointVertexTransfFuncsStrings',{label:'Segment Func',onChange:function(index){app.trail0PointVertexTransfFunc = app.trailPointVertexTransfFuncs[index];}})
                 .addSelect(app,'trailPointVertexScaleFuncsString',{label:'Segment Func',onChange:function(index){app.trail0PointVertexScaleFunc = app.trailPointVertexScaleFuncs[index];}})
            group.addSubGroup({label:'Material'})
                 .addCheckbox(app,'trail0DrawTrianglesEnabled',{label:'Enable'})
                 .addCheckbox(app,'trail0DrawMaterialLightEnabled',{label:'Lighting'})
                 .addCheckbox(app,'trail0DrawMaterialInterpolate',{label:'Interpolate'})
                 .addColor(   app,'trail0DrawMaterial0ColorAmbient',{colorMode:'rgb',label:'Mat0 Amb'})
                 .addColor(   app,'trail0DrawMaterial0ColorDiffuse',{colorMode:'rgb',label:'Mat0 Dif'})
                 .addColor(   app,'trail0DrawMaterial0ColorSpecular',{colorMode:'rgb',label:'Mat0 Spe'})
                 .addNumberInput(app,'trail0DrawMaterial0Shininess',{label:'Mat0 Shininess'})
                 .addColor(   app,'trail0DrawMaterial1ColorAmbient',{colorMode:'rgb',label:'Mat1 Amb'})
                 .addColor(   app,'trail0DrawMaterial1ColorDiffuse',{colorMode:'rgb',label:'Mat1 Dif'})
                 .addColor(   app,'trail0DrawMaterial1ColorSpecular',{colorMode:'rgb',label:'Mat1 Spe'})
                 .addNumberInput(app,'trail0DrawMaterial1Shininess',{label:'Mat1 Shininess'})
            group.addSubGroup({label:'Lines'})
                 .addCheckbox(app,'trail0DrawLinesEnabled',{label:'Enable'})
                 .addSlider(app,'trail0DrawLinesSize','trailDrawLinesSizeRange',{label:' '})
                 .addColor(app,'trail0DrawLinesColor',{colorMode:'rgb',label:' '})
            group.addSubGroup({label:'Points'})
                 .addCheckbox(app,'trail0DrawPointsEnabled',{label:'Enable'})
                 .addCheckbox(app,'trail0DrawPointsWeightedEnabled',{label:'Weighted'})
                 .addSlider(app,'trail0DrawPointsSize0','trailDrawPointsSizeRange',{label:' '})
                 .addColor(app,'trail0DrawPointsColor0',{colorMode:'rgb',label:' > 0'})
                 .addSlider(app,'trail0DrawPointsSize1','trailDrawPointsSizeRange',{label:' '})
                 .addColor(app,'trail0DrawPointsColor1',{colorMode:'rgb',label:' < 0'});
            group.addSubGroup({label:'Segment Vertex Transformation'})
                 .addSlider(app,'trail0PointVertexScaleMin','trailPointVertexScaleRange',{label:'Scale MIN'})
                 .addSlider(app,'trail0PointVertexScaleMax','trailPointVertexScaleRange',{label:'Scale MAX'});

        group = geomPanel.addGroup({label:'Visuals Trail 2'});
        group.addSubGroup({label:'Segments'})
            .addSelect(app,'trailPointVertexTransfFuncsStrings',{label:'Segment Func',onChange:function(index){app.trail1PointVertexTransfFunc = app.trailPointVertexTransfFuncs[index];}})
            .addSelect(app,'trailPointVertexScaleFuncsString',{label:'Segment Func',onChange:function(index){app.trail1PointVertexScaleFunc = app.trailPointVertexScaleFuncs[index];}})
        group.addSubGroup({label:'Material'})
            .addCheckbox(app,'trail1DrawTrianglesEnabled',{label:'Enable'})
            .addCheckbox(app,'trail1DrawMaterialLightEnabled',{label:'Lighting'})
            .addCheckbox(app,'trail1DrawMaterialInterpolate',{label:'Interpolate'})
            .addColor(   app,'trail1DrawMaterial0ColorAmbient',{colorMode:'rgb',label:'Mat0 Amb'})
            .addColor(   app,'trail1DrawMaterial0ColorDiffuse',{colorMode:'rgb',label:'Mat0 Dif'})
            .addColor(   app,'trail1DrawMaterial0ColorSpecular',{colorMode:'rgb',label:'Mat0 Spe'})
            .addNumberInput(app,'trail1DrawMaterial0Shininess',{label:'Mat0 Shininess'})
            .addColor(   app,'trail1DrawMaterial1ColorAmbient',{colorMode:'rgb',label:'Mat1 Amb'})
            .addColor(   app,'trail1DrawMaterial1ColorDiffuse',{colorMode:'rgb',label:'Mat1 Dif'})
            .addColor(   app,'trail1DrawMaterial1ColorSpecular',{colorMode:'rgb',label:'Mat1 Spe'})
            .addNumberInput(app,'trail1DrawMaterial1Shininess',{label:'Mat1 Shininess'})
        group.addSubGroup({label:'Lines'})
            .addCheckbox(app,'trail1DrawLinesEnabled',{label:'Enable'})
            .addSlider(app,'trail1DrawLinesSize','trailDrawLinesSizeRange',{label:' '})
            .addColor(app,'trail1DrawLinesColor',{colorMode:'rgb',label:' '})
        group.addSubGroup({label:'Points'})
            .addCheckbox(app,'trail1DrawPointsEnabled',{label:'Enable'})
            .addCheckbox(app,'trail1DrawPointsWeightedEnabled',{label:'Weighted'})
            .addSlider(app,'trail1DrawPointsSize0','trailDrawPointsSizeRange',{label:' '})
            .addColor(app,'trail1DrawPointsColor0',{colorMode:'rgb',label:' > 0'})
            .addSlider(app,'trail1DrawPointsSize1','trailDrawPointsSizeRange',{label:' '})
            .addColor(app,'trail1DrawPointsColor1',{colorMode:'rgb',label:' < 0'});
        group.addSubGroup({label:'Segment Vertex Transformation'})
            .addSlider(app,'trail1PointVertexScaleMin','trailPointVertexScaleRange',{label:'Scale MIN'})
            .addSlider(app,'trail1PointVertexScaleMax','trailPointVertexScaleRange',{label:'Scale MAX'});

        var worldPanel = controlKit.addPanel({width:220,align:'left',label:'General Settings',opacity:0.85});
            group = worldPanel.addGroup();
            group.addSubGroup({label:'World'})
                 .addCheckbox(app,'worldDrawGrid',{label:'Grid'})
                 .addColor(   app,'worldDrawColorBg',{colorMode:'rgb',label:'Color Bg'})
                 .addSlider(  app,'worldZoom','worldZoomRange',{label:'Zoom'})
                 .addCheckbox(app,'worldDrawSphereBg',{label:'Sphere Bg'});
            group.addSubGroup({label:'Process in Time'})
                 .addCheckbox(app,'worldTimeEnabled',{label:'Enable'})
                 .addSlider(app,'worldTimeMult','worldTimeMultRange',{label:'Acceleration'});




        /*---------------------------------------------------------------------------------------------------------*/


    });

    /*---------------------------------------------------------------------------------------------------------*/
})();