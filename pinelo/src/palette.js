/*
 * palette.js 
 * The palette. Includes the brush collection, and methods to extend it. Contains hooks for mouse events.
 */

var Palette = Class.extend({
	brushset: {},
	layerset: null,
	brush: null,
	frame: null,
	
	foreground: '#000000',
	background: '#FFFFFF',
	
	init: function(frame){
		this.frame = frame;
		
		this.layerset = new LayerSet(frame);
		var backgroundLayer = this.layerset.createNew();
		backgroundLayer.setName("Background");

	    this.createLayerControls();

		var simpleBrush = this.createBrush(DefaultBrush);
		this.brushset.simple = simpleBrush; 
		this.brushset.eraser = new Eraser();
		this.loadAvailableBrushes();
		
		this.setBrush(simpleBrush);
		
		
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
				me.brush.doStroke(me.surface(), e.clientX-offsetx,e.clientY-offsety);
			}
		});
	},
	
	/* Loads available brushes from brush_includes.js */
	loadAvailableBrushes: function(){
		for (var b in BRUSH_INCLUDES){
			if (b > 0 && BRUSH_INCLUDES.hasOwnProperty(b)){
				$.getScript("src/brushes/" + BRUSH_INCLUDES[b] + ".js");
			}
		}
	},
	
	createBrush: function(brushClass){
		var brush = new brushClass();
		this.brushset[brush.name] = brush;
		var me = this;
		
		/* hook up brush control callbacks */
		var setOpacity = function(){
			var v = brush.settings.opacity.value();
			me.surface().setOpacity(v/100);
		};
		var setLineWidth = function(){
			var v = brush.settings.thickness.value();
			me.surface().setLineWidth(v);
		};
		
		brush.onload(setOpacity);
		brush.onload(setLineWidth);
		brush.settings.opacity.onchange(setOpacity);
		brush.settings.thickness.onchange(setLineWidth);
		
		console.log('created brush',brush.name);
		return brush;
	},
	
	setBrush: function(b){
		
		// Keep the state-stack persistent at depth 1
		this.surface().restore(); 
		this.surface().save();
		// I know it looks odd :)
		
		if (this.brush) this.brush.unload();
		if (!b) return;
		console.log('setting brush to',b.name);
		this.brush = b;
		this.brush.load();
		this.createBrushControls();
	},
	
	setBrushByName: function(name){
		this.setBrush(this.brushset[name]);
	},
	
	createBrushControls: function(){
		$('#options').empty();
		for (var s in this.brush.settings) {
			this.brush.settings[s].renderInto($('#options'));
		}
	},
	
  createLayerControls: function(){
    var layerset = this.layerset;	

	var addLayer = function(layer){
		$('#layers').prepend(layer.getControl());
	};

	//add background layer
	addLayer(layerset.layers[0]);
	
    $('#newLayer').click( function(){
		addLayer(layerset.createNew());
	  });
    
  },
	/* returns the current drawing surface (layer) */
	surface: function(){
		return this.layerset.surface;
	},
	
	reset: function(){
		this.layerset.removeAll();
		this.layerset.createNew().select();
		this.layerset.resize();
		
		this.brush.load();
	}
	
});
