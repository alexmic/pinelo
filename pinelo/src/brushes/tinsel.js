/*
 *   Black faded-out tinsel with hints of fuchsia.
 *   Author: Alex Michael
 */

palette.createBrush(Brush.extend({
	name: 'tinsel',
    stroke: function(layer, x, y) {
        for (var i = 0; i < 360; i += 5) {
            var r = 60 * rnd(),
                dx = x + r * cos(i * 0.0174),
                dy = y + r * sin(i * 0.0174),
            	grad = layer.ctx.createLinearGradient(x, y, dx, dy);
            grad.addColorStop(0, (rnd() > 0.9)?'#E50D9B':'#000000');
            grad.addColorStop(1, '#FAF2D4');
            layer.ctx.strokeStyle = grad;
            layer.ctx.lineWidth = 0.5;
            layer.line(x, dx, y, dy);
  	  	}
    }
}));
