
// Style canvas to fit viewport.
var c            = document.getElementById("c");
var $c        = $(c);
var wHeight   = $(window).height();
var wWidth    = $(window).width();
$c.css({cursor: "crosshair"});

// Get context.
c.width  = wWidth;
c.height = wHeight;
var ctx  = c.getContext("2d");

// Is it drawing?
var PEN_DOWN = false;

    
// make() creates brushes from a prototype brush.
// Methods and properties of the prototype can be overriden using the addedProperties parameter.
var make = function(o, addedProperties) {
    function F() {}
    F.prototype = o;
    var newObj = new F();
    if (addedProperties) {
        for (var prop in addedProperties) {
            if (addedProperties.hasOwnProperty(prop)) {
                newObj[prop] = addedProperties[prop];
            }
        }
    }
    return newObj;
};

// Init stuff.
(function i() {

    //Initialize context.
    ctx.fillStyle = 'rgba(236,235,212,1)';
    ctx.fillRect(0, 0, wWidth, wHeight);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    
    //Initialize palette.
    palette = new Palette();
  
    // Initialize listeners.
    $c.mousedown(function(e) {
        palette.onMouseDown();
        PEN_DOWN = true;
    });

    $c.mouseup(function(e) {
        palette.onMouseUp();
        PEN_DOWN = false;
    });

    $c.mousemove(function(e) {
        if (PEN_DOWN) {
            palette.onMouseMove();
            palette.stroke(e.pageX, e.pageY);
        }
    });
    
    $("#controls").hover(
        function(e){
            $(this).animate({bottom: 0}, "fast");
        },
        function(e){
             $(this).animate({bottom: -15}, "fast");
        }
    );
    
}());