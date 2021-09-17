/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, ShakePosition: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DyePack(spriteTexture, xPos, yPos) {
    this.kRefWidth = 2;
    this.kRefHeight = 3.25;
    this.kSpeed = 2;
    this.kLifeSpan = 0;
    this.kHit = false;
    this.kShake = null;

    this.mDyePack = new SpriteRenderable(spriteTexture);
    this.mDyePack.setColor([1, 1, 1, 0]);
    this.mDyePack.getXform().setPosition(xPos, yPos);
    this.mDyePack.getXform().setSize(this.kRefWidth, this.kRefHeight);
    this.mDyePack.setElementPixelPositions(510, 595, 23, 153);
    GameObject.call(this, this.mDyePack);
}
gEngine.Core.inheritPrototype(DyePack, GameObject);

DyePack.prototype.update = function () {
    var xform = this.getXform();
    if (!this.kHit) {
        xform.setPosition(xform.getXPos() + this.kSpeed, xform.getYPos());
    } else {
        var c = this.kShake.getShakeResults();
        xform.setPosition(xform.getXPos() + c[0], xform.getYPos() + c[1]);
    }
    this.kLifeSpan++;
};

DyePack.prototype.getLifeSpan = function () { return this.kLifeSpan; };
DyePack.prototype.getSpeed = function () { return this.kSpeed; };
DyePack.prototype.addDSpeed = function (s) { this.kSpeed += s; };
DyePack.prototype.getHitStatus = function () { return this.kHit; };
DyePack.prototype.triggerHit = function () {
    if (this.kHit === false) {
        this.kHit = true;
        this.kShake = new ShakePosition(4, 0.2, 20, 300);
    }
};