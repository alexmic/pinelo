/*
 *   Cocentric circles.
 *   Author: Alex Michael
 */
 
palette.createBrush(Brush.extend({
    name: 'cocentric',
    stroke: function(layer, x, y) {
        for (var i = 0; i < 3; i++) {
            layer.ctx.lineWidth = 10 * rnd();
            var col = (rnd() > 0.9) ? '175,107,107' : '33,33,33';
            layer.ctx.strokeStyle = 'rgba(' + col + ',0.1)'; 
            layer.circle(x, y, rnd() * 50, false);
        }
    }
})); 
 
 
