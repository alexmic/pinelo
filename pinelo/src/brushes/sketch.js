/*
 *   Sketchy brush.
 *   Author: Alex Michael
 */

palette.createBrush(MemoryBrush.extend({
	name: 'sketch',	
	init: function(){
		this._super();
		this.settings.opacity.value(20);
		this.settings.thickness.value(1);
	},
 	stroke: function(layer, x, y) {
        layer.ctx.strokeStyle = 'rgba(22,22,22,1)'
        if (this.previous) {
            var p = this.previous;
            layer.line(p.x, x, p.y, y);
            for (var i = this.points.length; i--;) {
                p = this.points[i];
                var d = Util.math.d(x, p.x, y, p.y);
                if (d < 20 && rnd() > 0.4) {
                    layer.ctx.strokeStyle = 'rgba(22,22,22,0.7)';
					layer.line(
						x - 0.01 + (p.x - x) * rnd() * 0.7,
						(p.x + x)/2,
						y - 0.01 + (p.y - y) * rnd() * 0.7,
						(p.y + y)/2
					);
                }
            }
        }    
    }
}));
