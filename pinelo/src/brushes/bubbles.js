/*
 *   Bubbles with variant size depending on speed of mouse move.
 *   Author: Ben Van Enckevort
 */
palette.extend({
    bubbles: {
            prev: null,
            max: 0,
            stroke: function(x, y) {
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(0,0,0,0.8)";
                var p = this.prev;
                if (p) {
                    var dx = (p.x - x) / 2,
                        dy = (p.y - y) / 2,
                        dr = Math.sqrt(dx * dx + dy * dy);

                    ctx.beginPath();
                    ctx.arc(x + dx, y + dy, dr, 0, 2 * Math.PI, true);
                    ctx.fill();
                    ctx.stroke();
                }

                this.prev = {
                    x: x,
                    y: y
                };
            },

            onMouseUp: function(e) {
                this.prev = {};
            }
        }
});