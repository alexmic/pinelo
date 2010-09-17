/*
 *   Bubbles with variant size depending on speed of mouse move.
 *   Author: Ben Van Enckevort
 */
palette.createBrush(Brush.extend({
	name: 'bubbles',
	stroke: function(layer,x, y) {
		var ctx = layer.ctx;
	    ctx.lineWidth = 1;
	    ctx.strokeStyle = "rgba(0,0,0,0.8)";
	    ctx.fillStyle = 'rgba(0,0,0,0.6)';
	    var p = this.previous;
	    if (p) {
	        var dx = (p.x - x) / 2,
	            dy = (p.y - y) / 2,
	            dr = Math.sqrt(dx * dx + dy * dy);
            layer.circle(x + dx, y + dy, dr, true);
            layer.circle(x + dx, y + dy, dr, false);
	    }
	},

	load: function(){
	    this._super();
	    
	}

}));
