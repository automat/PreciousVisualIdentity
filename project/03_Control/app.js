var Foam      = require('/Users/automat/WebstormProjects/Foam/src/foam/foam'),
    SKControl = require('../../src/control/Control');



function App()
{
    Foam.Application.apply(this,arguments);

    this.setFullWindowFrame(true);

    this.setTargetFPS(60);
    this.setSize(1024,768);
}

App.prototype = Object.create(Foam.Application.prototype);

App.prototype.setup = function()
{
    var skControl = this._skControl = new SKControl(this.getWidth(),this.getHeight());
    this.fgl.bindTextureImage(skControl);

    this.fgl.materialMode(this.fgl.MATERIAL_MODE_COLOR);

};

App.prototype.update = function()
{
    var fgl = this.fgl;
    var cam = this.camera;

    var time      = this.getSecondsElapsed(),
        timeDelta = this.getTimeDelta(),
        zoom      = 6 + Math.sin(time) * 5;

    fgl.clear3f(0.1,0.1,0.1);
    fgl.loadIdentity();

    var camRotX, camRotY;

    if(this.isMouseDown())
    {
        camRotX = (-1 + this.mouse.getX() / this.getWidth()  * 2.0) * Math.PI;
        camRotY = (-1 + this.mouse.getY() / this.getHeight() * 2.0) * Math.PI ;

        Foam.Vec3.lerp3f(cam.position,
                         Math.cos(camRotX) * zoom,
                         Math.sin(camRotY) * zoom,
                         Math.sin(camRotX) * zoom,
                         timeDelta * 0.25);
    }
    else
    {

        cam.setPosition3f(0,
                          20,
                          0.0001);
    }

    cam.setTarget3f(0,0,0);
    cam.updateMatrices();


    var skControl = this._skControl;

    this.drawSystem();

    fgl.drawMode(fgl.TRIANGLE_FAN);
    fgl.setAlphaBlending(true,true);
    fgl.useTexture(true);
    fgl.texture(skControl);






    fgl.drawMode(fgl.TRIANGLE_FAN);


    fgl.pushMatrix();
    fgl.rectMode(fgl.RECT_MODE_CENTER);
    fgl.rotate3f(Math.sin(time)*Math.PI,
                 Math.sin(Math.PI * 0.25 + time)*Math.PI,
                 Math.sin(Math.PI * 0.5  + time)*Math.PI);
    fgl.rect(5);
    fgl.popMatrix();

    fgl.rectMode(fgl.RECT_MODE_CORNER);
    fgl.useTexture(false);

    fgl.useImageViewport(true);
    fgl.bindDefaultVBO();
    skControl.update();

    fgl.image(skControl,0,0);
    fgl.useImageViewport(false);
    fgl.setAlphaBlending(false);


};

App.prototype.drawSystem =  function()
{
    var fgl = this.fgl;

    fgl.color1f(0.15);
    Foam.fGLUtil.drawGrid(fgl,48,1);
   // Foam.fGLUtil.drawGridCube(fgl,48,1);
   // Foam.fGLUtil.drawAxes(fgl,12);
};

var app = new App();
