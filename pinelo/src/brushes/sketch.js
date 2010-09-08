/*
 *   Sketchy brush.
 *   Author: Alex Michael
 */

palette.extend({
	
	sketch: {
        points: [],
        stroke: function(x, y) {
            ctx.strokeStyle = 'rgba(22,22,22,0.1)'
            if (this.points[0]) {
                var p_l = this.points.length;
                var prev = this.points[p_l - 1];
                Util.draw.line(prev.x, x, prev.y, y);
                for (var i = p_l; i--;) {
                    var p = this.points[i];
                    var d = Util.math.d(x, p.x, y, p.y);
                    if (d < 20 && rnd() > 0.4) {
                        ctx.strokeStyle = 'rgba(22,22,22,0.07)';
    					Util.draw.line(
    						x - 0.01 + (p.x - x) * rnd() * 0.7,
    						p.x - (p.x - x) * 0.5,
    						y - 0.01 + (p.y - y) * rnd() * 0.7,
    						p.y - (p.y - y) * 0.5
    					);
                    }
                }
            }
            this.points.push({
                x: x,
                y: y
            });
        },
        
        unload: function(){
    		this._super.unload();
    		this.points = [];
    	},
    
    	onMouseUp: function(){
    		this.points = [];
    	}   
    }
});