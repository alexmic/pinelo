/*
 *   Black faded-out tinsel with hints of fuchsia.
 *   Author: Alex Michael
 */

palette.createBrush(Brush.extend({
	name: 'tinsel',
	
	init: function(){
		this._super();
		/* seriously. Opacity doesn't play niceley with this one.
		 * Slows it right down to a grinding halt.
		 * Will look into this later.
		 */
		this.settings.opacity.disable();
		this.settings.thickness.value(0.5);
		this.settings.radius = new Range("Radius",20,150).step(10).value(60);
		this.settings.pinkness = new Range("Pinkness",1,10).value(1);
		
	},
    stroke: function(layer, x, y) {
    	var rad = this.settings.radius.value();
        for (var i = 0; i < 360; i += 5) {
            var r = rad * rnd(),
                dx = x + r * cos(i * 0.0174),
                dy = y + r * sin(i * 0.0174),
            	grad = layer.ctx.createLinearGradient(x, y, dx, dy);
        	
            grad.addColorStop(0, (rnd() > 1 - (this.settings.pinkness.value() / 10))?'#E50D9B':'#000000');
            grad.addColorStop(1, '#FAF2D4');
            layer.ctx.strokeStyle = grad;
            layer.line(x, dx, y, dy);
  	  	}
    }
}));
