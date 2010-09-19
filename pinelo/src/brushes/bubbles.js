/*
 *   Bubbles with variant size depending on speed of mouse move.
 *   Author: Ben Van Enckevort
 */
palette.createBrush(Brush.extend({
	name: 'bubbles',
	init: function(){
		this._super();
		this.settings.thickness.value(3.5);
		this.settings.fillalpha = new Range("Fill Alpha", 0,100).value(95);
	},
	stroke: function(layer,x, y) {
		var ctx = layer.ctx;
	    ctx.strokeStyle = "rgba(0,0,0,0.8)";
	    ctx.fillStyle = 'rgba(60,60,60,'+ this.settings.fillalpha.value()/100 +')';//quick dirty hack. Need to generalise for this kind of thing
	    var p = this.previous;
	    if (p) {
	        var dx = (p.x - x) / 2,
	            dy = (p.y - y) / 2,
	            dr = Math.sqrt(dx * dx + dy * dy);
            layer.circle(x + dx, y + dy, dr, true);
            layer.circle(x + dx, y + dy, dr, false);
	    }
	}
}));
