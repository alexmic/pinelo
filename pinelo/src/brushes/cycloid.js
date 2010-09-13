/*
 *   Cycloid brush - draws at a point fixed on a circle which rotates at a constant speed on mouse movement.
 *   Author: Alex Michael
 */

palette.extend({
	
	cycloid: {
        prev: null,
        angle: 0,
        stroke: function(x, y) {
            ctx.lineWidth = 5 * rnd();
            ctx.strokeStyle = "rgba(0,0,0,0.8)";
            var p = this.prev;
            if (p) {
                this.angle = (this.angle + 0.40) % (2 * M.PI);
                var r  = 15;
                x += r * cos(this.angle);
                y += r * sin(this.angle);
                Util.draw.line(p.x, x, p.y, y);
            }

            this.prev = {
                x: x,
                y: y
            };
        },

        onMouseUp: function(e) {
            this.prev = null;
        },
        
        unload: function(e){
        	this._super.unload();
        	this.prev = null;
        	this.angle = 0;
        }
	}
	
});