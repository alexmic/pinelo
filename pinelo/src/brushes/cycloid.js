/*
 *   Cycloid brush - draws at a point fixed on a circle which rotates at a constant speed on mouse movement.
 *   Author: Alex Michael
 */

palette.createBrush(Brush.extend({
	name: 'cycloid',	
    angle: 0,
    stroke: function(layer, x, y) {
        layer.ctx.lineWidth = 5 * rnd();
        layer.ctx.strokeStyle = "rgba(0,0,0,0.8)";
        var p = this.previous;
        if (p) {
        	var r  = 25;
        	p.x += r * cos(this.angle);
        	p.y += r * sin(this.angle);
            this.angle = (this.angle + 0.40) % (2 * M.PI);
           	x += r * cos(this.angle);
            y += r * sin(this.angle);
            layer.line(p.x, x, p.y, y);
        }
    },

    unload: function(e){
    	this._super();
    	this.angle = 0;
    }
}));
