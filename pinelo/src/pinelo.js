var c = document.getElementById("c"),
    $c = $(c),
    wHeight = $(window).height(),
    wWidth = $(window).width(),
    M = Math,
    rnd = M.random,
    sin = M.sin,
    cos = M.cos;

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
        e.stopPropagation();
    });

    $c.mouseup(function(e) {
        palette.onMouseUp();
        PEN_DOWN = false;
        e.stopPropagation();
    });

    $c.mousemove(function(e) {
        if (PEN_DOWN) {
            palette.onMouseMove();
            palette.stroke(e.pageX, e.pageY);
            e.stopPropagation();
        }
    });
    
    //Temporary solution to switch brushes until the menu is built.
    $(window).keyup(function(e) {
        if (e.keyCode === 48) {
            palette.setEraser();
        }
        else if (e.keyCode === 49) {
            palette.setDefaultBrush();
        }
        else if (e.keyCode === 50) {
            palette.setBrush("thorns");
        }
        else if (e.keyCode === 51) {
            palette.setBrush("circles");
        }
        else if (e.keyCode === 52) {
            palette.setBrush("cocentric");
        }
        else if (e.keyCode === 53) {
            palette.setBrush("web");
        }
        else if (e.keyCode === 54) {
            palette.setBrush("bubbles");
        }
    });

    palette.init();
}());