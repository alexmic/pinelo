/*
 *   Cocentric circles.
 *   Author: Alex Michael
 */
 
palette.extend({
    cocentric: {
            stroke: function(x, y) {

                for (var i = 0; i < 6; i++) {
                    ctx.lineWidth = rnd();
                    ctx.strokeStyle = 'rgba(33,33,33,0.3)';
                    ctx.beginPath();
                    ctx.arc(x, y, rnd() * 20, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.stroke();

                }
            }
        }
}); 
 
 