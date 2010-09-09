/*
 * Util.js 
 *
 * Utility methods.
 *
 */

// Useful shortcuts.
var M    = Math,
    rnd  = M.random,
    sin  = M.sin,
    cos  = M.cos,
    pow  = M.pow,
    max  = M.max;

// Util class.
var Util = {
	
	context: {
	
		reset : function(){
			ctx.lineWidth = 1;
			ctx.globalAlpha = 1;
			// For now until the menu is created.
			ctx.strokeStyle = "rgba(0,0,0,0.7)";
		}
	
	},
	
	math: {
	
		d: function(x1, x2, y1, y2){
			var dx = x1 - x2;
			var dy = y1 - y2;
			return M.sqrt(pow(dx, 2) + pow(dy, 2));
		}
	
	},
	
	draw: {
	
		line: function(x1, x2, y1, y2){
			ctx.beginPath();
       		ctx.moveTo(x1, y1);
        	ctx.lineTo(x2, y2);
        	ctx.stroke();
		},
		
		circle: function(x, y, r, fill){
			ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, true);
            ctx.closePath();
            if (fill){ ctx.fill(); } else { ctx.stroke(); }
		}
	}


}