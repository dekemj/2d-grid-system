/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, vec2: false, GameObject: false, SpriteRenderable: false ShakePosition: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture) {
    this.kCycles = 120;
    this.kRate = 0.05;
    this.mPosition = new InterpolateVec2(vec2.fromValues(35, 50), this.kCycles, this.kRate);
    this.mShake = null;
    this.mWidth = 9;
    this.mHeight = 12;

    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(35, 50);
    this.mDye.getXform().setSize(9, 12);
    this.mDye.setElementPixelPositions(0, 120, 0, 180);
    GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {
    // interpolate towards destination
    var xform = this.getXform();
    this.mPosition.updateInterpolation();
    var pos = this.mPosition.getValue();
    xform.setPosition(pos[0], pos[1]);
    
    // if we're shaking, set size
    if (this.mShake !== null) {
        if (this.mShake.shakeDone()) {
            this.mShake = null;
        } else {
            var c = this.mShake.getOscillateResults();
            xform.setSize(this.mWidth + c[0], this.mHeight + c[1]);
        }
    }
};
Hero.prototype.isHit = function () { return this.mShake !== null; };

Hero.prototype.setDestination = function (p) { this.mPosition.setFinalValue(p); };

Hero.prototype.oscillate = function (xDelta, yDelta, freq, duration) {
    this.mShake = new ShakePosition(xDelta, yDelta, freq, duration);
};