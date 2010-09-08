/*
 *   Black faded-out tinsel with hints of fuchsia.
 *   Author: Alex Michael
 */
palette.extend({
	
	tinsel: {
            stroke: function(x, y) {
                for (var i = 0; i < 360; i += 5) {
                    var r = 60 * rnd(),
                        dx = x + r * cos(i * 0.0174),
                        dy = y + r * sin(i * 0.0174),
                        grad = ctx.createLinearGradient(x, y, dx, dy);
                    if (rnd() > 0.9) {
                        grad.addColorStop(0, '#E50D9B');
                    }
                    else {
                        grad.addColorStop(0, '#000000');
                    }
                    grad.addColorStop(1, '#FAF2D4');
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 0.5;
                    Util.draw.line(x, dx, y, dy);
          	  	}
            },
            
            unload: function(){
            	this._super.unload();
            }
        }

});