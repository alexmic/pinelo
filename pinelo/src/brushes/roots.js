/*
 *   Roots grow from the line drawn.
 *   Author: Alex Michael
 */

palette.createBrush(Brush.extend({
	name: 'roots', 
    timerID: -1,
    points: [],
    stroke: function(layer, x, y) {
		var growing = this.points; 
		function grow() {
			var g_l = growing.length;
		   	var grown = 0; 
		   	for (var i = 0; i < g_l; i++) {
				var root = growing[i];
				if (!root.hasGrown()) {
					root.grow();
				}
				else{
					grown++;
				}
			}
			if (g_l > grown){
				window.setTimeout(grow, 100);
			}
		}
		
		var p = this.previous;
		if (p){
		    layer.ctx.lineWidth = 1.5;
		    layer.line(p.x, x, p.y, y);
		    this.points.push({
		        x: x,
		        y: y,
		        age: (20 * rnd()) >> 0,
		        hasGrown: function() {
		            return this.age < 0;
		        },
		        grow: function() {
		            var dx = ((rnd() > 0.5) ? -1 : 1) * 3 * rnd();
		            var dy = rnd() * 7;
		            layer.ctx.lineWidth = max(this.age,0) / 15 + 0.1; 
		            layer.line(this.x, this.x + dx, this.y, this.y + dy);
		            this.x += dx;
		            this.y += dy;
		            this.age--;
		        }

		    });
		    this.timerID = window.setTimeout(grow, 90);
		}
	},
    
    unload: function() {
    	this._super();
  	    window.clearTimeout(this.timerID);
        this.timerID = -1;
        this.points  = [];
    }

}));
