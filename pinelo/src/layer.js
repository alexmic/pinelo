var Layer = Class.extend({
    parent: {},
    canvas: {},
    ctx: {},
    control: {},
    name: "",

    init: function (layerset) {
        this.parent = layerset;
        this.canvas = $("<canvas/>")[0];
        this.canvas.width = "100%";
        this.canvas.height = "100%";
        this.control = this.createControl();
        this.ctx = this.canvas.getContext("2d");
        this.setName("Layer " + layerset.layers.length);

        return this;
    },

    createControl: function () {
        var layer = this;
        return $("<div/>").addClass('layer').click(function () {
            layer.select();
        });
    },

    setOpacity: function (alpha) {
        this.ctx.globalAlpha = alpha;
    },

    setLineWidth: function (value) {
        this.ctx.lineWidth = value;
    },

    line: function (x1, x2, y1, y2) {
        var c = this.ctx;
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x2, y2);
        c.stroke();
    },

    circle: function (x, y, r, fill) {
        var c = this.ctx;
        c.beginPath();
        c.arc(x, y, r, 0, Math.PI * 2, true);
        c.closePath();
        c[(fill) ? 'fill' : 'stroke']();
    },

    getControl: function () {
        return this.control;
    },


    select: function () {
        this.parent.setPaintSurface(this);
        this.control.addClass('selected');
    },

    deselect: function () {
        this.control.removeClass('selected');
    },

    setName: function (name) {
        this.name = name;
        this.control.empty().append(name);
    },

    save: function () {
        this.ctx.save();
    },
    restore: function () {
        this.ctx.restore();
    },
});

var LayerSet = Class.extend({
    layers: [],
    surface: null,
    frame: null,

    init: function (frame) {
        this.frame = frame;
    },

    createNew: function () {
        var l = new Layer(this);
        l.select();       l
        this.layers.push(l);
        this.frame.append(l.canvas);
        this.resize(l);
        return l;
    },

    setPaintSurface: function (layer) {
        if (this.surface) {
            this.surface.deselect();
        }
        this.surface = layer;
    },

    resize: function (layer) {
        var w = this.frame.width();
        var h = this.frame.height();
        layer.canvas.width = w;
        layer.canvas.height = h;
		/*
        for (var i = this.layers.length; i--;) {
            var layer = this.layers[i];
            var data = layer.ctx.getImageData(0, 0, w, h);
            layer.canvas.width = w;
            layer.canvas.height = h;
            layer.ctx.putImageData(data, 0, 0);
        }
        */
    },

    removeAll: function () {
        while (this.layers.length) {
            var l = this.layers.pop();
            $(l.canvas).remove();
        }
    }

});
