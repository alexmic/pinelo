/*
 *   Flowers.
 *   Author: Alex Michael
 */
 
palette.createBrush(Brush.extend({
	name: 'flowers',
    stroke: function(layer, x, y) {
        var ctx = layer.ctx;
        
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.fillStyle = "rgb(0,0,0)";
        
        var p = this.previous;
        if (p) {
            var d = M.sqrt(M.pow(x - p.x, 2),
                           M.pow(y - p.y, 2));
            if (rnd() > Math.min((0.65 + 1 / d), 0.97)){
                var xx = -400,
                    anticlockwise = true;
                    startAngle = 0,
                    stopAngle  = -0.5,
                    xxx = -47,
                    yyy = -190;
                if (rnd() > 0.5){
                    xx = 400;
                    anticlockwise = false;
                    startAngle = M.PI;
                    stopAngle  = M.PI + 0.5;
                    xxx = 47;
                }
                
                ctx.beginPath();
                ctx.arc(x + xx, y, 400, 
                        startAngle, 
                        stopAngle, 
                        anticlockwise);
                ctx.stroke();
                ctx.beginPath();
                var nx = x + xxx,
                    ny = y + yyy;
                ctx.arc(nx, ny, 7, 0, M.PI * 2, true);
                ctx.fill();
                ctx.fillStyle = "rgb(255,0,255)";
                for (var i = 0; i < 5; i++){
                    ctx.beginPath();
                    var a  = i * ((72 * 2 * M.PI) / 360); 
                    var dx = 11 * cos(a);
                    var dy = 11 * sin(a);
                    ctx.arc(nx + dx, 
                            ny + dy, 8, 0, M.PI * 2, true);
                    ctx.fill();  
                }
            }
        }

    }
}));
