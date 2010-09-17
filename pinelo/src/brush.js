var Brush = Class.extend({
	name: "unnamed",
	brushSize: 1,
	
	init: function(){},
	
	load: function(){},
	doStroke: function(s,x,y){
		this.stroke(s,x,y);
		this.previous = {x:x,y:y};
	},	
	stroke: function(s,x,y){}, /* overridden by subclass */
	unload: function(){},
	
	onMouseUp: function(e) {
		this.painting = false;
		this.previous = null;
		console.log(this.name + " stopped painting");
	},
    onMouseDown: function(e) {
    	this.painting = true;
    	console.log(this.name + " started painting");
	}
    
});


/* MEMORY BRUSH
 * Remembers stroke history in order
 * to do cool stuff with it :)
*/
var MemoryBrush = Brush.extend({
	points: [],
	max: -1, //infinite
	
	init: function(){
		this.points = [];
	},

	doStroke: function(s,x,y){
		this._super(s,x,y);
		
		var p = this.points;
		if (~this.max && p[this.max]) p.shift();
		p.push(this.previous);
	}

});


/* SHORT TERM MEMORY BRUSH
 * forgets all previous points at the
 * end of each stroke.
 */
var ShortTermMemoryBrush = MemoryBrush.extend({
	onMouseUp: function(e){
		this.points = [];
		this.previous = null;
		this._super(e);
	}
});



var DefaultBrush = Brush.extend({
	name: "simple",
	stroke: function(surface,x,y){
		if (this.previous){
			var p = this.previous;
			surface.line(p.x,x,p.y,y);
		}
	}
});

var Eraser = Brush.extend({
	
	init: function(){
		this.brushSize = 20;
		this.max = 0;
	},
	
	stroke: function(surface,x,y){
		var h = this.brushSize>>1;
		surface.clearRect(x-h, y-h, x+h, y+h);
	}
});
