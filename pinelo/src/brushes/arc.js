/*
 *   Web-like brush, with points connected to each other when too close.
 *   Author: Alex Michael
 */

palette.createBrush(MemoryBrush.extend({
	name: "arc",
	init: function(){
		this._super();
		this.settings.thickness.value(0.5);
		this.settings.dist = new Range('Agressiveness',10,100).step(5).value(30);
		this.settings.foobar = new Range('FooBar',1,10);
	},
	stroke: function(layer,x,y) {
		var ctx = layer.ctx;
		ctx.strokeStyle = 'rgba(0,0,0,0.7)';
        if (this.previous) {
        	var p_l = this.points.length;
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            layer.setLineWidth(this.settings.thickness.value()/5);
            
            for (var i = p_l ; i--;) {
            	
            	var p = this.points[i];
                var d = Util.math.d(x, p.x, y, p.y);
                if (d < this.settings.dist.value()) {
                	layer.line(x, p.x, y, p.y);
                }
            }
        }
    }
}));
