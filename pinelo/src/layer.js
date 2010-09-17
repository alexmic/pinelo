var Layer = Class.extend({
        parent: {},
        canvas: {},
        ctx: {},
        name:"",

        init: function(layerset){
        	this.parent = layerset;
            this.canvas = $("<canvas/>")[0];
            this.ctx = this.canvas.getContext("2d");
            this.name = "Layer " + layerset.layers.length;

            return this;
        },
        
        line: function(x1, x2, y1, y2){
			var c = this.ctx;
			c.beginPath();
	   		c.moveTo(x1, y1);
	    	c.lineTo(x2, y2);
	    	c.stroke();
		},
	
		circle: function(x, y, r, fill){
			var c = this.ctx;
			c.beginPath();
	        c.arc(x, y, r, 0, Math.PI * 2, true);
	        c.closePath();
	        c[(fill) ? 'fill' : 'stroke'](); 
		},
		
        
        select: function(){
        	this.parent.setPaintSurface(this);
        }
});

var LayerSet = Class.extend({
	layers: [],
	surface: {},
	frame: {},
	
	init: function(frame){
		this.frame = frame;
	},
	
	createNew: function(){
		var l = new Layer(this);
		this.layers.push(l);
		this.frame.prepend(l.canvas);
		return l;
	},
	
	setPaintSurface: function(layer){
		this.surface = layer; 
	},
	
	resize: function(){
		var w = this.frame.width();
		var h = this.frame.height();
		for (var i=this.layers.length; i--;){
			this.layers[i].canvas.width = w;
			this.layers[i].canvas.height = h;
		}
	},
	
	removeAll: function(){
		while(this.layers.length){
			var l = this.layers.pop();
			$(l.canvas).remove();
		}
	}
	
});
