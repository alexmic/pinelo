/*
 *  Spiderweb-like brush.
 *  Author: Ben Van Enckevort
 *
 *	For this brush, size is treated as 1/10th
 *
 */
 
palette.createBrush(ShortTermMemoryBrush.extend({
	name: 'web',
    max: 7,
    init: function(){
    	var me = this;
    	this._super();
    	this.settings.opacity.value(50);
    	this.settings.thickness.value(1.5);
    	this.settings.guide = new Range('Path intensity',0,10).value(5);
    	this.settings.strands = new Range('Strands',2,20).value(this.max).onchange(function(v){
    		me.max = v-1;
    	});
    },
    stroke: function(layer, x, y) {
        //layer.setOpacity(0.3);
        if (this.previous) {
        	var size = this.settings.thickness.value()/10;
            for (i = this.points.length, layer.ctx.lineWidth = size+(this.settings.guide.value()/10); i--;) {
                var p = this.points[i];
                layer.line(x, p.x, y, p.y);
                layer.ctx.lineWidth = size;
            }
        }
    }
}));
