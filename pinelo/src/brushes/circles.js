/*
 *   Circles with variant opacity and size depending on speed of mouse movement.
 *   Author: Alex Michael
 */

palette.extend({
   
    circles: {
            prevX: null,
            prevY: null,
            stroke: function(x, y) {

                if (this.prevX === null && this.prevY === null) {
                    this.prevX = x;
                    this.prevY = y;
                }
                else {
                    var r = M.min(M.floor(Util.math.d(x, this.prevX, y, this.prevY)), 50);
                    var alpha = (r * 1.5) / 50;
                    ctx.fillStyle = 'rgba(22,22,22,' + alpha + ')';
                    Util.draw.circle(this.prevX, this.prevY, r, true);
                    this.prevX = x;
                    this.prevY = y;
                }
            },
            
            onMouseUp: function(e) {
                this.prevX = null;
                this.prevY = null;
            },
            
            unload: function(){
            	this._super.unload();
            	this.prevX = null;
            	this.prevY = null;
            }
        }   

});
