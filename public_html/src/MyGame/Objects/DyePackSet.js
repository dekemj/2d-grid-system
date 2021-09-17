/* File: DyePackSet.js 
 *
 * Support for working with a set of DyePacks
 */

/*jslint  node: true, vars: true */
/*global gEngine: false, GameObject: false, GameObjectSet: false, DyePack: false*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DyePackSet() {
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(DyePackSet, GameObjectSet);

DyePackSet.prototype.checkForTermination = function () {
    var i;
    for (i = 0; i < this.size(); i++) {
        var l = this.getObjectAt(i);
        var toRemove = false;
        if (l.getLifeSpan() >= 300) {
            toRemove = true;
        } else if (l.getSpeed() <= 0) {
            toRemove = true;
        }
        if (toRemove) {
            this.removeObjectAt(i);
            i--;
        }
    }
};