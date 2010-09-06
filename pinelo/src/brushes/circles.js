/*
 *   Circles with variant opacity and size depending on speed of mouse movement.
 *   Author: Alex Michael
 */

palette.extend({
    circles: {
            prevX: null,
            prevY: null,
            stroke: function(x, y) {

                if (this.prevX === null && this.prevY === null) {
                    this.prevX = x;
                    this.prevY = y;
                }
                else {
                    var dx = x - this.prevX;
                    var dy = y - this.prevY;
                    var r = M.min(
                    M.floor(
                    M.sqrt(
                    M.pow(dx, 2) + M.pow(dy, 2))), 50);
                    var alpha = (r * 5) / 50;
                    ctx.fillStyle = 'rgba(145,66,88,' + alpha + ')';
                    ctx.beginPath();
                    ctx.arc(this.prevX, this.prevY, r * 2, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fill();
                    this.prevX = x;
                    this.prevY = y;
                }
            },
            onMouseUp: function(e) {
                this.prevX = null;
                this.prevY = null;
            }
        }   
});
