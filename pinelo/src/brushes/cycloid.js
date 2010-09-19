/*
 *  Cycloid brush - draws at a point fixed on a circle which rotates at a constant speed on mouse movement.
 *  Author: Alex Michael
 *
 *	Suggestion: Use arc method to draw cycloid? Now that there's a speed setting, the code
 *	below pretty much approximates what .arc(...) should do
 */

palette.createBrush(Brush.extend({
	name: 'cycloid',	
    angle: 0,
    init: function(){
    	this._super();
    	this.settings.thickness.value(2);
    	this.settings.speed = new Range('Speed',1,10).value(4);
    	this.settings.radius = new Range('Radius',5,50).step(5).value(25);
    },
    stroke: function(layer, x, y) {
        layer.setLineWidth(2 * this.settings.thickness.value() * rnd());
        layer.ctx.strokeStyle = "rgba(0,0,0,0.8)";
        var p = this.previous;
        if (p) {
        	var r  = this.settings.radius.value();
        	var speed = this.settings.speed.value();
        	var dx = (x-p.x)/speed,
        		dy = (y-p.y)/speed,
    			a = this.angle;
    			
        	for (var i = 1; i <= speed; i++){
        		
		    	var pc = r * cos(a), ps = r * sin(a);
		        a = (a + 0.1) % (2 * M.PI);
		        var c = r * cos(a), s = r * sin(a);
		        
		        layer.line(
		        	p.x+pc,
		        	p.x+dx+c,
		        	p.y+ps,
		        	p.y+dy+s
	        	);
	        	
	        	p.x += dx;
	        	p.y += dy;
        	}
        	this.angle = a;
        }
    },

    unload: function(e){
    	this._super();
    	this.angle = 0;
    }
}));
