/*
 *   Web-like brush, with points connected to each other when too close.
 *   Author: Alex Michael
 */

palette.createBrush(MemoryBrush.extend({
	name: "arc",
	stroke: function(surface,x,y) {
		var ctx = surface.ctx;
		ctx.lineWidth = 0.5;
        ctx.strokeStyle = 'rgba(0,0,0,0.7)';
        
        if (this.previous) {
        	var p_l = this.points.length;
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.lineWidth = 0.1;
            
            for (var i = p_l ; i--;) {
            	
            	var p = this.points[i];
                var d = Util.math.d(x, p.x, y, p.y);
                if (d < 35) {
                	surface.line(x, p.x, y, p.y);
                }
            }
        }
    }
}));
