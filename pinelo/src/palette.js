/*
 * palette.js 
 * The palette. Includes the brush collection, and methods to extend it. Contains hooks for mouse events.
 */

var Palette = Class.extend({
	brushset: {},
	layerset: {},
	brush: {},
	frame: {},
	
	init: function(frame){
		this.frame = frame;
		
		this.layerset = new LayerSet(frame);
		this.layerset.createNew().select();
		this.layerset.resize();
		
		this.brushset.default = new DefaultBrush();
		this.brushset.eraser = new Eraser();
		this.loadAvailableBrushes();
		
		this.brush = this.brushset.default;
		this.brush.load();
		
		/* wire up handlers */
		var me = this;
		var proxy = $(document);
		proxy.mousedown(function(e){
			me.brush.onMouseDown(e);
		});
		proxy.mouseup(function(e){
			me.brush.onMouseUp(e);
		});
		var offsetx = frame.offset().left;
		var offsety = frame.offset().top;
		proxy.mousemove(function(e){
			if (me.brush.painting){
				me.brush.doStroke(me.layerset.surface, e.clientX-offsetx,e.clientY-offsety);
			}
		});
	},
	
	/* Loads available brushes from brush_includes.js */
	loadAvailableBrushes: function(){
		for (var b in BRUSH_INCLUDES){
			if (BRUSH_INCLUDES.hasOwnProperty(b)){
				$.getScript("src/brushes/" + BRUSH_INCLUDES[b] + ".js");
			}
		}
	},
	
	createBrush: function(brushClass){
		var brush = new brushClass();
		console.log('created brush',brush.name);
		this.brushset[brush.name] = brush;
	},
	
	setBrush: function(b){
		console.log('setting brush to',b.name)
		this.brush.unload();
		this.brush = b;
		this.brush.load();
	},
	
	setBrushByName: function(name){
		this.setBrush(this.brushset[name]);
	},
	
	reset: function(){
		this.layerset.removeAll();
		this.layerset.createNew().select();
		this.layerset.resize();
	}
	
});
