var Foam = require('/Users/automat/WebstormProjects/Foam/src/foam/foam'),
    PRLogoVectorData = require('../../../src/data/PRLogoVectorData');

function App()
{
    Foam.Application.apply(this,arguments);


    this.setTargetFPS(60);
    this.setSize(1280,700);
}

App.prototype = Object.create(Foam.Application.prototype);

App.prototype.setup = function()
{
    var fgl = this.fgl;

    this._zoom = 8;


    var light0 = this._light0 = new Foam.Light(fgl.LIGHT_0);
    light0.setAmbient3f(0,0,0);
    light0.setDiffuse3f(0.8,0.8,0.8);
    light0.setSpecular3f(1,1,1);
    light0.setPosition3f(1,1,1);

    var material = this._material0 = new Foam.Material();
    material.setDiffuse3f(0.15,0.15,0.15);
    material.setAmbient3f(0.15,0.15,0.15);
    material.setSpecular3f(1,1,1);

    material.shininess = 100.0;


    this.worldDrawGrid     = false;
    this.worldDrawColorBg  = [7,10,13];
    this.worldZoom         = 8;
    this.worldZoomRange    = [-20,20];
    this.worldDrawSphereBg = true;
    this.worldRotateSphere = true;


    this.worldTimeEnabled = true;
    this.worldTimeMult = 1;
    this.worldTimeMultRange = [-5,5];

    this.trail0SegNum = 10;
    this.trail1SegNum = 10;

    this.dataSetsString  = ['LOW','MEDIUM','HIGH'];
    this.dataSets        = [PRLogoVectorData.Lx1,PRLogoVectorData.Mx1,PRLogoVectorData.MHx1];

    var temp = PRLogoVectorData.Mx1.slice();
    var ti = -1, tl = temp.length;
    while(++ti < tl)
    {
        //temp[ti] = Foam.Polygon2dUtil.makeVertexCountFitted(temp[ti],100);
        //temp[ti] = Foam.Polygon2dUtil.makeOptHeading(temp[ti]);//Foam.Polygon2dUtil.makeOptHeading(temp[ti]);
    }

    this.trail0Data      = temp;
    this.trail0DataOffset = 1;
    this.trail1Data      = temp;//this.dataSets[1];
    this.trail1DataOffset = 1;

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
            function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return Foam.Math.rect(Math.sin(bufferPointIndex/bufferPointsNum - t))*(1+Foam.Math.randomFloat(0.01,0.65));},
            function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return Math.abs(Math.sin(bufferIndex/buffersNum*Math.PI*10+t*2));},
            function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return Foam.Math.rect(Math.sin(bufferPointIndex/bufferPointsNum * Math.PI * 2 - t))*bufferPointIndex/bufferPointsNum*2;},
            function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return Foam.Math.rect(Math.sin(bufferPointIndex/bufferPointsNum * Math.PI * 3 - t));},
            function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return Foam.Math.rect(Math.sin(bufferPointIndex/bufferPointsNum * Math.PI + t));},
            function(bufferIndex,buffersNum,bufferPointIndex,bufferPointsNum,t){return Foam.Math.rect(Math.sin(bufferPointIndex/bufferPointsNum * Math.PI * 2 + t * 2));}

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

    this.trail0DrawTrianglesEnabled      = false;
    this.trail0DrawMaterialLightEnabled  = false;

    this.trail0DrawMaterialInterpolate = false;

    this.trail0DrawMaterial0ColorAmbient  = [0,0,0];
    this.trail0DrawMaterial0ColorDiffuse  = [0,0,0];
    this.trail0DrawMaterial0ColorSpecular = [255,255,255];
    this.trail0DrawMaterial0Shininess     = 100.0;

    this.trail0DrawMaterial1ColorAmbient  = [0,0,0];
    this.trail0DrawMaterial1ColorDiffuse  = [0,0,0];
    this.trail0DrawMaterial1ColorSpecular = [255,255,255];
    this.trail0DrawMaterial1Shininess     = 100.0;

    this.trail0DrawLinesEnabled          = false;
    this.trail0DrawPointsEnabled         = true;
    this.trail0DrawPointsWeightedEnabled = false;

    this.trail0DrawLinesSize = 1;
    this.trail0DrawPointsSize0 = 2;
    this.trail0DrawPointsSize1 = 0;

    this.trail0PointVertexScaleMin    = 0.0125;
    this.trail0PointVertexScaleMax    = 0.025;

    this.trail0PointVertexTransfFunc  = this.trailPointVertexTransfFuncs[3];
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
    this.trail1PointVertexScaleMax    = 0.028;

    this.trail1PointVertexTransfFunc  = this.trailPointVertexTransfFuncs[4];
    this.trail1PointVertexScaleFunc   = this.trailPointVertexScaleFuncs[1];

    this.trail1DrawPointsColor0 = [255,255,255];
    this.trail1DrawPointsColor1 = [255,255,255];
    this.trail1DrawLinesColor   = [64,64,64];

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


    this._camRotX = 0;
    this._camRotY = 0;

};

App.prototype.update = function()
{
    var fgl        = this.fgl,
        cam       = this.camera,
        time      = this.getSecondsElapsed() * this.worldTimeEnabled * this.worldTimeMult,
        timeDelta = this.getTimeDelta();


   // var zoom = this._zoom = Foam.Math.lerp(this._zoom, this.worldZoom, timeDelta * 0.025);

    var zoom = this._zoom = Foam.Math.lerp(this._zoom, 8 + this.getMouseWheelDelta() * 0.25, timeDelta * 0.0025);

    var worldDrawColorBg = this.worldDrawColorBg;



    fgl.clear3f(worldDrawColorBg[0]/255,worldDrawColorBg[1]/255,worldDrawColorBg[2]/255);
    fgl.loadIdentity();

    fgl.drawMode(fgl.LINES);


    if(this.isMouseDown())
    {
        this._camRotX = ( -1 + this.mouse.getX() / this.getWidth() * 2.0 ) * Math.PI;
        this._camRotY = ( -1 + this.mouse.getY() / this.getHeight() * 2.0) * Math.PI * 0.5;

    }
    Foam.Vec3.lerp3f(cam.position,
        Math.cos(this._camRotX) * zoom,
        Math.sin(this._camRotY) * zoom,
        Math.sin(this._camRotX) * zoom,
        timeDelta * 0.25);

    /*
    else
    {
        cam.setPosition3f(0.001,
                          zoom,
                          Math.sin(Math.PI*0.25));

    }
    */

    cam.setTarget3f(0,0,0);
    cam.updateMatrices();

    fgl.drawMode(fgl.LINE_LOOP);

    if(this.worldDrawGrid)this.drawSystem();

    /*---------------------------------------------------------------------------------------------------------*/
    /*---------------------------------------------------------------------------------------------------------*/

    var material = this._material0;
    var light0 = this._light0;




    if(this.worldDrawSphereBg)
    {
        //fgl.materialMode(fgl.MATERIAL_MODE_COLOR);
        fgl.pointSize(1);

        fgl.drawMode(fgl.POINTS);
        fgl.color1f(0.75);
        fgl.pointSize(1);
        fgl.pushMatrix();
        if(this.worldRotateSphere)
            fgl.rotate3f(Math.sin(time * 0.0125) * Math.PI,
                Math.sin(time * 0.025)  * Math.PI,
                Math.sin(time * 0.0125) * Math.PI);

        fgl.points(this._sphereVertices);
        fgl.popMatrix();

    }

    fgl.materialMode(fgl.MATERIAL_MODE_PHONG);

    fgl.useMaterial(true);
    fgl.useLighting(true);
    fgl.light(light0);


    fgl.pushMatrix();
    fgl.scale1f(8);
    fgl.translate3f(-0.5,0,-0.15);

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
                    fgl.useLighting(false);
                    fgl.useMaterial(false);
                    fgl.color3f(material.diffuse[0],material.diffuse[1],material.diffuse[2]);
                }
                else
                {
                    fgl.material(material);
                }

                fgl.drawMode(fgl.TRIANGLES);
                fgl.drawGeometry(buffer);

            }

            fgl.useMaterial(false);
            fgl.useLighting(false);


            if(this.trail0DrawPointsEnabled)
            {
                fgl.drawMode(fgl.POINTS);

                fgl.color3f(drawPointsColor0[0]/255.0,
                    drawPointsColor0[1]/255.0,
                    drawPointsColor0[2]/255.0);

                fgl.pointSize(drawPointsSize0);

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

                    if(drawPointsSize0 > 0)fgl.points(new Float32Array(tempArr0));
                    if(drawPointsSize1 > 0)
                    {
                        fgl.color3f(drawPointsColor1[0]/255.0,
                            drawPointsColor1[1]/255.0,
                            drawPointsColor1[2]/255.0);

                        fgl.pointSize(drawPointsSize1);
                        fgl.points(new Float32Array(tempArr1));

                    }
                }
                else
                {
                    if(drawPointsSize0>0)fgl.points(buffer.vertices);
                }
            }

            if(this.trail0DrawLinesEnabled)
            {
                fgl.drawMode(fgl.LINES);
                fgl.lineWidth(drawLinesSize);
                fgl.color3f(drawLinesColor[0]/255.0,
                            drawLinesColor[1]/255.0,
                            drawLinesColor[2]/255.0);

                fgl.linev(buffer.vertices);

            }

            fgl.useMaterial(true);
            fgl.useLighting(true);
        }


    }

    fgl.useMaterial(false);
    fgl.useLighting(false);

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

        fgl.materialMode(fgl.MATERIAL_MODE_PHONG);

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
                    fgl.useLighting(false);
                    fgl.useMaterial(false);
                    fgl.color3f(material.diffuse[0],material.diffuse[1],material.diffuse[2]);
                }
                else
                {
                    fgl.material(material);
                }

                fgl.drawMode(fgl.TRIANGLES);
                fgl.drawGeometry(buffer);

            }

            fgl.useMaterial(false);
            fgl.useLighting(false);
            fgl.materialMode(fgl.MATERIAL_MODE_COLOR);

            if(drawPointsEnabled)
            {
                fgl.drawMode(fgl.POINTS);

                fgl.color3f(drawPointsColor0[0]/255.0,
                    drawPointsColor0[1]/255.0,
                    drawPointsColor0[2]/255.0);

                fgl.pointSize(drawPointsSize0);

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

                    if(drawPointsSize0 > 0)fgl.points(new Float32Array(tempArr0));
                    if(drawPointsSize1 > 0)
                    {
                        fgl.color3f(drawPointsColor1[0]/255.0,
                            drawPointsColor1[1]/255.0,
                            drawPointsColor1[2]/255.0);

                        fgl.pointSize(drawPointsSize1);
                        fgl.points(new Float32Array(tempArr1));

                    }
                }
                else
                {
                    if(drawPointsSize0>0)fgl.points(buffer.vertices);
                }
            }



            if(drawLinesEnabled)
            {
                fgl.drawMode(fgl.LINES);
                fgl.lineWidth(drawLinesSize);
                fgl.color3f(drawLinesColor[0]/255.0,
                    drawLinesColor[1]/255.0,
                    drawLinesColor[2]/255.0);

                fgl.linev(buffer.vertices);

            }
            fgl.materialMode(fgl.MATERIAL_MODE_PHONG);
            fgl.useMaterial(true);
            fgl.useLighting(true);
        }

    }

    fgl.popMatrix();

    fgl.pointSize(1);
    fgl.lineWidth(1);

    fgl.useMaterial(false);
    fgl.useLighting(false);
};

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

        buffer = new Foam.LineBuffer3d(dataNumPoints,buffersSegNum,0.01);
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

App.prototype.drawSystem =  function()
{
    var fgl = this.fgl;

    fgl.color1f(0.25);
    Foam.fGLUtil.drawGrid(fgl,48,1);
    fgl.color1f(0.15);
    Foam.fGLUtil.drawGridCube(fgl,48,1);
    Foam.fGLUtil.drawAxes(fgl,12);
};

var app = new App();
