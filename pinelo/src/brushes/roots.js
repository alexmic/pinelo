/*
 *   Roots grow from the line drawn.
 *   Author: Alex Michael
 */

palette.extend({ 

	roots: {
	    prev: null,
	    timerID: -1,
	    points: [],
	    stroke: function(x, y) {
	      
	      var growing = this.points; 

	      function grow() {
	           var g_l = growing.length;
	           var grown = 0; 
	           for (var i = 0; i < g_l; i++) {
	                var root = growing[i];
	                if (!root.hasGrown()) {
	                    root.grow();
	                }
	                else{
	                    grown++;
	                }
	            }
	            if (g_l > grown){
	                window.setTimeout(grow, 100);
	            }
	        }
	            
	        if (this.prev === null) {
	            this.prev = {
	                x: x,
	                y: y
	            };
	        }
	        else {
	            ctx.lineWidth = 1.5;
	            Util.draw.line(this.prev.x, x, this.prev.y, y);
	            this.points.push({
	                x: x,
	                y: y,
	                age: (20 * rnd()) >> 0,
	                hasGrown: function() {
	                    return this.age < 0;
	                },
	                grow: function() {
	                    var dx = ((rnd() > 0.5) ? -1 : 1) * 3 * rnd();
	                    var dy = rnd() * 7;
	                    ctx.lineWidth = max(this.age,0) / 15 + 0.1; 
	                    Util.draw.line(this.x, this.x + dx, this.y, this.y + dy);
	                    this.x += dx;
	                    this.y += dy;
	                    this.age--;
	                }
	
	            });
	            this.prev.x = x;
	            this.prev.y = y;
	            this.timerID = window.setTimeout(grow, 90);
	        }
	    },
	    
	    onMouseUp: function(e) {
	        this.prev = null;
	    },
	
	    unload: function() {
	    	this._super.unload();
	  	    window.clearTimeout(this.timerID);
	        this.timerID = -1;
	        this.points  = [];
	    	this.prev    = null;
	    }
	}

});