/* File: Patrol.js 
 *
 * Creates and initializes the Patrol
 * overrides the update function of GameObject to define
 * simple patrol behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, vec2: false, GameObject: false, SpriteRenderable: false ShakePosition: false, Math: false,
 SpriteAnimateRenderable: false, BoundingBox: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Patrol(spriteTexture, xPos, yPos) {
    this.kCycles = 120;
    this.kRate = 0.05;
    this.mMinionInt1 = new InterpolateVec2(vec2.fromValues(xPos + 10, yPos + 6), this.kCycles, this.kRate);
    this.mMinionInt2 = new InterpolateVec2(vec2.fromValues(xPos + 10, yPos - 6), this.kCycles, this.kRate);

    // create the head
    this.mHead = new SpriteRenderable(spriteTexture);
    this.mHead.setColor([1, 1, 1, 0]);
    this.mHead.getXform().setPosition(xPos, yPos);
    this.mHead.getXform().setSize(7.5, 7.5);
    this.mHead.setElementPixelPositions(147, 290, 0, (512 - 335));
    this.kHead = new GameObject(this.mHead);
    this.kHead.setCurrentFrontDir(vec2.fromValues((Math.random() * 2) - 1, (Math.random() * 2) - 1));
    this.kHead.setSpeed((Math.random() / 10) + 0.2);
    
    
    // now create the two wings
    this.mMinion1 = new SpriteAnimateRenderable(spriteTexture);
    this.mMinion1.setColor([1, 1, 1, 0]);
    this.mMinion1.getXform().setPosition(xPos + 10, yPos + 6);
    this.mMinion1.getXform().setSize(12, 9.6);
    this.mMinion1.setSpriteSequence(512, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    204, 164,   // widthxheight in pixels
                                    5,          // number of elements in this sequence
                                    0);         // horizontal padding in between
    this.mMinion1.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mMinion1.setAnimationSpeed(30);
                                // show each element for mAnimSpeed updates

    this.kMinion1 = new GameObject(this.mMinion1);
    
    this.mMinion2 = new SpriteAnimateRenderable(spriteTexture);
    this.mMinion2.setColor([1, 1, 1, 0]);
    this.mMinion2.getXform().setPosition(xPos + 10, yPos - 6);
    this.mMinion2.getXform().setSize(12, 9.6);
    this.mMinion2.setSpriteSequence(512, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    204, 164,   // widthxheight in pixels
                                    5,          // number of elements in this sequence
                                    0);         // horizontal padding in between
    this.mMinion2.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mMinion2.setAnimationSpeed(30);
                                // show each element for mAnimSpeed updates

    this.kMinion2 = new GameObject(this.mMinion2);
}

Patrol.prototype.update = function () {
    
    
    // set the minions to interpolate towards the head
    var xDest = this.kHead.getXform().getXPos();
    var yDest = this.kHead.getXform().getYPos();
    this.mMinionInt1.setFinalValue(vec2.fromValues(xDest + 10, yDest + 6));
    this.mMinionInt2.setFinalValue(vec2.fromValues(xDest + 10, yDest - 6));
    
    // move them on that path
    this.mMinionInt1.updateInterpolation();
    this.mMinionInt2.updateInterpolation();
    
    // update their positions
    var newPos1 = this.mMinionInt1.getValue();
    var newPos2 = this.mMinionInt2.getValue();
    this.kMinion1.getXform().setPosition(newPos1[0], newPos1[1]);
    this.kMinion2.getXform().setPosition(newPos2[0], newPos2[1]);
    
    // update their animation
    this.mMinion1.updateAnimation();
    this.mMinion2.updateAnimation(); 
    this.kHead.update();
    
    // now, if the brain hits an edge, reflect its direction
};

Patrol.prototype.draw = function (aCamera) {
    this.kHead.draw(aCamera);
    this.kMinion1.draw(aCamera);
    this.kMinion2.draw(aCamera);
};

Patrol.prototype.isInBBox = function (otherBound) {
    var BBwidth = 17.5;
    var BBheight = (9.6 + 7.5) * 1.5;
    var BRX = this.kMinion2.getXform().getXPos() + 6;
    var BRY = this.kMinion2.getXform().getYPos() - 4.8;
    var BBox = new BoundingBox(this.kHead.getXform().getPosition(), BBwidth, BBheight);
    return BBox.intersectsBound(otherBound);
};

Patrol.prototype.getBBox = function () {
    
};

Patrol.prototype.reverseHead = function (status) {
    
};

Patrol.prototype.checkCollisions = function (b) {
    
};