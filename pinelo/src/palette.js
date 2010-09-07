/*
 //////////////////////////////////////////
 // Pinelo - Painter and procedural art. //
 // Version 1.0                          //
 //////////////////////////////////////////
*/


/*
 * Palette.js 
 *
 * The palette. Includes the brush collection, and methods to extend it. Contains hooks for mouse events.
 *
 */

var Palette = function() {

    // ---------------------------------
    
    // Generic Brush prototype.
    var Brush = function() {

        this.stroke = function(x, y) {

        };

        this.unload = function() {

        };

        this.onMouseUp = function(e) {

        };

        this.onMouseDown = function(e) {

        };

        this.onMouseMove = function(e) {

        };

    };
    
    // ---------------------------------

    var brushPrototype = new Brush();

	// Brush list. Ant new brushes should be included in this list to get loaded.
	var BRUSH_LIST = ["web", "circles", "bubbles", "cocentric", "thorns"];

    // The brush collection. Contains the default and the eraser on init.
    var brushes = {
        
        // The default brush.
        def: make(brushPrototype, {
            prevX: null,
            prevY: null,

            stroke: function(x, y) {
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(0,0,0,0.5)";

                if (this.prevX === null && this.prevY === null) {
                    this.prevX = x;
                    this.prevY = y;
                }
                else {
                    ctx.beginPath();
                    ctx.moveTo(this.prevX, this.prevY);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    this.prevX = x;
                    this.prevY = y;
                }
            },

            onMouseUp: function(e) {
                this.prevX = null;
                this.prevY = null;
            }
        }),

        // Eraser.
        eraser: make(brushPrototype, {
        	prevX: null,
            prevY: null,
            
            stroke: function(x, y) {
                ctx.lineWidth = 30;
                ctx.strokeStyle = "rgba(236,235,212,1)";

                if (this.prevX === null && this.prevY === null) {
                    this.prevX = x;
                    this.prevY = y;
                }
                else {
                    ctx.beginPath();
                    ctx.moveTo(this.prevX, this.prevY);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    this.prevX = x;
                    this.prevY = y;
                }
            },
            
            onMouseUp: function(e){
                this.prevX = null;
                this.prevY = null;
            }
        })
    };
    
    //Initialize to default brush.
    var _brush = brushes.def;
	
	//////////////////
	/// PUBLIC API ///
	//////////////////
	
	//Init method. Loads available brushes.
	this.init = function(){
		for (var b in BRUSH_LIST){
			if (BRUSH_LIST.hasOwnProperty(b)){
				$("body").append($("<script>").attr("src", "src/brushes/" + BRUSH_LIST[b] + ".js").attr("type", "text/javascript"));
			}
		}
		return this;
	};
	
    // Extends the brush collection.
    this.extend = function(newBrushes) {
        for (var brush in newBrushes) {
            if (newBrushes.hasOwnProperty(brush) && !brushes[brush]) {
                brushes[brush] = make(brushPrototype, newBrushes[brush]);
            }
        }
        return this;
    };

    // Set brush by name.
    this.setBrush = function(brushName) {
        if (brushes[brushName]) {
            _brush.unload();
            _brush = brushes[brushName];
        }
    };

    // Set default, generic brush.
    this.setDefaultBrush = function() {
        _brush = brushes.def;
    };

    // Brush delegator methods.
    this.stroke = function(x, y) {
        _brush.stroke(x, y);
    };

    this.onMouseUp = function(e) {
        _brush.onMouseUp(e);
    };

    this.onMouseDown = function(e) {
        _brush.onMouseDown(e);
    };

    this.onMouseMove = function(e) {
        _brush.onMouseMove(e);
    };

    this.setEraser = function(e) {
        _brush = brushes.eraser;
    };

};
