/*
 *   Spiderweb-like brush.
 *   Author: Ben Van Enckevort
 */
 
palette.extend({
	web: {
            prevs: [],
            max: 30,
            stroke: function(x, y) {
                ctx.strokeStyle = "rgba(0,0,0,0.5)";
                var p = this.prevs;
                if (p[0]) {
                    for (i = p.length, ctx.lineWidth = 0.5; i--;) {
                        var point = p[i];
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(point.x, point.y);
                        ctx.stroke();
                        ctx.lineWidth = 0.1;
                    }
                }

                if (p[this.max]) p.shift();
                p.push({
                    x: x,
                    y: y
                });
            },

            onMouseUp: function(e) {
                this.prevs = [];
            }
      	}
});