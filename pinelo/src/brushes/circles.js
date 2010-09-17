/*
 *   Circles with variant opacity and size depending on speed of mouse movement.
 *   Author: Alex Michael
 */

palette.createBrush(Brush.extend({
	name: 'circles',
    stroke: function(layer, x, y) {
    	var p = this.previous;
    	if (p){
			var r = M.min(M.floor(Util.math.d(x, p.x, y, p.y)), 50);
		    var alpha = (r * 1.5) / 50;
		    layer.ctx.fillStyle = 'rgba(22,22,22,' + alpha + ')';
		    layer.circle(p.x, p.y, r, true);
    	}
    }    
}));
