/*
 *   Spiderweb-like brush.
 *   Author: Ben Van Enckevort
 */
 
palette.createBrush(ShortTermMemoryBrush.extend({
	name: 'web',
    max: 6,
    stroke: function(layer, x, y) {
        layer.ctx.strokeStyle = "rgba(0,0,0,0.3)";
        if (this.previous) {
            for (i = this.points.length, layer.ctx.lineWidth = 0.3; i--;) {
                var p = this.points[i];
                layer.line(x, p.x, y, p.y);
                layer.ctx.lineWidth = 0.1;
            }
        }
    }
}));
