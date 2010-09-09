/*
 *   Cocentric circles.
 *   Author: Alex Michael
 */
 
palette.extend({
    
    cocentric: {
        stroke: function(x, y) {

            for (var i = 0; i < 3; i++) {
                ctx.lineWidth = 10 * rnd();
                if (rnd() > 0.9){
                	ctx.strokeStyle = 'rgba(175,107,107,0.1)';
                }
                else{
                	ctx.strokeStyle = 'rgba(33,33,33,0.1)';
                }
                Util.draw.circle(x, y, rnd() * 50, false);
            }
        }
    }

}); 
 
 