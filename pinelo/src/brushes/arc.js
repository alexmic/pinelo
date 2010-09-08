/*
 *   Web-like brush, with points connected to each other when too close.
 *   Author: Alex Michael
 */
 
palette.extend({

    arc: {
         points: [],
         stroke: function(x, y) {
             ctx.lineWidth = 0.5;
             ctx.strokeStyle = 'rgba(0,0,0,0.7)';
             if (this.points[0]) {
                 var p_l = this.points.length;
                 var prev = this.points[p_l - 1];
                 ctx.strokeStyle = 'rgba(0,0,0,0.3)';
                 ctx.lineWidth = 0.1;
                 for (var i = p_l - 1 ; i--;) {
                     var p = this.points[i];
                     var d = M.sqrt(M.pow((x - p.x), 2) + M.pow((y - p.y), 2));
                     if (d < 30) {
                         Util.draw.line(x, p.x, y, p.y);
                     }
                 }
             }
             this.points.push({
                 x: x,
                 y: y
             });
         },
         
         unload: function() {
             this._super.unload();
             this.points = [];
         }
    }

});
