/*
 *   Cocentric circles.
 *   Author: Alex Michael
 */
 
palette.createBrush(Brush.extend({
    name: 'cocentric',
    init: function(){
    	this._super();
    	this.settings.opacity.value(10);
    	this.settings.radius = new Range('Radius',10,80).step(10).value(50);
    	this.settings.colourness = new Range('%Colour',0,100).value(10);
    },
    stroke: function(layer, x, y) {
        for (var i = 0; i < 3; i++) {
            layer.ctx.lineWidth = 5* this.settings.thickness.value() * rnd();
            var col = (rnd() < this.settings.colourness.value()/100)
            	? '175,107,107' : '33,33,33';
            layer.ctx.strokeStyle = 'rgb(' + col + ')'; 
            layer.circle(x, y, rnd() * this.settings.radius.value(), false);
        }
    }
})); 
 
 
