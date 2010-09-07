/*
 *   Cocentric circles.
 *   Author: Alex Michael
 */
 
palette.extend({
    cocentric: {
        stroke: function(x, y) {

            for (var i = 0; i < 3; i++) {
                ctx.lineWidth = rnd();
                if (rnd() > 0.9){
                	ctx.strokeStyle = 'rgba(175,107,107,0.3)';
                }
                else{
                	ctx.strokeStyle = 'rgba(33,33,33,0.3)';
                }
                ctx.beginPath();
                ctx.arc(x, y, rnd() * 50, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.stroke();

            }
        }
    }
}); 
 
 