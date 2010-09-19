var Brush = Class.extend({
	name: "unnamed",
	settings: null, /* hash of Setting objects */
	_onloadCallbacks: null,
	
	init: function(){
		this._onloadCallbacks = [];
	
		/* default brush settings */
		this.settings = {
			opacity : new Range('Opacity',1,100).value(100),
			thickness : new Range('Thickness',0.5,5).step(0.5).value(1.5),
		};
	},
	
	load: function(){
		$(this._onloadCallbacks).each(function(i, callback){
			callback();
		})
	},
	
	doStroke: function(s,x,y){
		this.stroke(s,x,y);
		this.previous = {x:x,y:y};
	},	
	stroke: function(s,x,y){}, /* overridden by subclass */
	unload: function(){},
	
	onMouseUp: function(e) {
		this.painting = false;
		this.previous = null;
	},
    onMouseDown: function(e) {
    	this.painting = true;
	},
	
	/* this function (more of an API method) is ONLY used to register per-brush callbacks!! */
	/* not to be confused with load(), which is garunteed to be called for every brush load */
	onload: function(callback){
		this._onloadCallbacks.push(callback);
	},
    
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
		this._super();
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
		this._super(e);
	}
});



var DefaultBrush = Brush.extend({
	name: "simple",
	stroke: function(layer,x,y){
		if (this.previous){
			var p = this.previous;
			layer.line(p.x,x,p.y,y);
		}
	}
});

var Eraser = Brush.extend({
	
	init: function(){
		this._super();
		this.settings.thickness.value(5);
	},
	
	stroke: function(layer,x,y){
		var h = this.settings.thickness.value()*12;
		layer.ctx.clearRect(x-h, y-h, 2*h, 2*h);
	}
});
