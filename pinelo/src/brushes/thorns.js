/*
 *   Black faded-out thorns with hints of fuchsia.
 *   Author: Alex Michael
 */
palette.extend({
	thorns: {
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
                    ctx.beginPath();
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(x, y);
                    ctx.lineTo(dx, dy);
                    ctx.stroke();
                }
            }
        }
});