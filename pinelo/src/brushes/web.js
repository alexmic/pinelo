/*
 *   Spiderweb-like brush.
 *   Author: Ben Van Enckevort
 */
 
palette.extend({
	
	web: {
            prevs: [],
            max: 30,
            stroke: function(x, y) {
                ctx.strokeStyle = "rgba(0,0,0,0.3)";
                var p = this.prevs;
                if (p[0]) {
                    for (i = p.length, ctx.lineWidth = 0.3; i--;) {
                        var point = p[i];
                        Util.draw.line(x, point.x, y, point.y);
                        ctx.lineWidth = 0.1;
                    }
                }

                if (p[this.max]) p.shift();
                p.push({
                    x: x,
                    y: y
                });
            },
            
   			unload: function(){
   				this._super.unload();
   				this.prevs = [];
   			},

            onMouseUp: function(e) {
                this.prevs = [];
            }
      	}

});